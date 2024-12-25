import React, { useState } from "react";
import MyButton from "../UI/button/MyButton.tsx";
import MyModal from "../UI/myModal/MyModal.tsx";
import { notesAPI } from "../../services/NotesService.ts";
import { useAppSelector } from "../../hooks/redux.ts";
import { INote } from "../../store/redusers/notes/notes.state.ts";
import "./PostItem.scss";

const PostItem = ({ post, index }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editedPost, setEditedPost] = useState<INote>({ ...post });
  const userId = useAppSelector((state) => state.userReducer.uid);

  const [patchNote] = notesAPI.usePatchNoteMutation();
  const [deleteNote] = notesAPI.useDeleteNoteMutation();

  const handleSave = () => {
    patchNote({
      ...editedPost,
      userId,
    });
    setModalVisible(false);
  };

  const handleDelete = () => {
    deleteNote(editedPost);
    setModalVisible(false);
  };

  return (
      <div className="post">
        <div className="post__content">
          <strong>
            {index}. {post.title}
          </strong>
          <div>{post.description}</div>
        </div>
        <div className="post__button">
          <MyButton onClick={handleDelete}>Delete</MyButton>
          <MyButton onClick={() => setModalVisible(true)}>Edit</MyButton>
        </div>
        <MyModal visible={modalVisible} setVisible={setModalVisible}>
          <div className="modal">
            <h2>Edit Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={editedPost.title}
                onChange={(e) =>
                    setEditedPost({ ...editedPost, title: e.target.value })
                }
            />
            <textarea
                placeholder="Body"
                value={editedPost.description}
                onChange={(e) =>
                    setEditedPost({ ...editedPost, description: e.target.value })
                }
            ></textarea>
            <MyButton onClick={handleSave}>Save</MyButton>
          </div>
        </MyModal>
      </div>
  );
};

export default PostItem;
