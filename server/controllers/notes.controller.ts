import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';


const notesRouter = express.Router();

interface INotes extends Document {
    userId: string,
    title: string;
    description: number;
    createdAt: any;
}

const itemsSchema: Schema = new Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Notes = mongoose.model<INotes>('Notes', itemsSchema, 'notesDocument');


notesRouter.get('/notes', (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    Notes.find({ userId })
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json({ error: err.message }));
});

notesRouter.post('/notes', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const existingNotes = await Notes.findOne({ title: req.body.title });
        if (existingNotes) {
            return res.status(400).json({ message: 'Items with this name already exists' });
        }

        const notesData = new Notes({
            userId: req.body.note.userId,
            title: req.body.note.title,
            description: req.body.note.description,
            createdAt: new Date(),
        });
        console.log(notesData)

        const savedNotes = await notesData.save();
        res.status(201).json(savedNotes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


notesRouter.get('/notes/:id', (req: Request, res: Response) => {
    Notes.findById(req.params.id)
        .then(items => {
            if (!items) {
                return res.status(404).json({ message: 'Items not found' });
            }
            res.json(items);
        })
        .catch(err => res.status(500).json({ error: err.message }));
})

notesRouter.put('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const existingNote = await Notes.findById(id);

        if (existingNote) {
            existingNote.set({ title, description });
            const updatedNote = await existingNote.save();
            return res.status(200).json(updatedNote);
        }

        // Якщо запису не існує, створюємо новий
        const newNote = new Notes({ _id: id, title, description, createdAt: new Date() });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

notesRouter.patch('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Оновлюємо лише вказані поля
        const updatedNote = await Notes.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});;

notesRouter.delete('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await Notes.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default notesRouter ;
