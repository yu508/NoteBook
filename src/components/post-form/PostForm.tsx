import React from "react";
import MyInput from "../UI/input/MyInput.tsx";
import { useState } from "react";
import MyButton from "../UI/button/MyButton.tsx";
import {notesAPI} from "../../services/NotesService.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import "./PostForm.scss";

const PostForm = () => {
  const userId = useAppSelector(state => state.userReducer.uid)

  const [post, setPost] = useState<{title: string, description: string}>({ title: "", description: "" });
  const [addNote] = notesAPI.useAddNoteMutation()

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      note:{
      ...post,
        userId
      },
    };
    addNote(newPost);
    setPost({ title: "", description: "" });
  };

  return (
    <form action="" className="post-form">
      <MyInput
        type="text"
        placeholder="Title name"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        type="text"
        placeholder="Description"
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />
      {/* <input type="text" ref={bodyInputRef} /> */}
      {/* <MyInput type="text" ref={bodyInputRef} placeholder="Description" /> */}
      <MyButton onClick={addNewPost}>Add Post</MyButton>
    </form>
  );
};

export default PostForm;
