import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import notesRouter from "./controllers/notes.controller";

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(express.json())

mongoose.connect("mongodb+srv://rybchakyulya:uv7eAZpbTzOTRTGj@notebook.uo85y.mongodb.net/?retryWrites=true&w=majority&appName=notebook",)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/', notesRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
