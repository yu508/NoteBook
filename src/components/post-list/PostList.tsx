import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./PostList.scss";
import PostItem from "../post-item/PostItem.tsx";

const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h1 className="post-list__empty">Post has not found</h1>;
  }

  return (
      <div className="post-list__container">
        <h1 className="post-list__title">{title}</h1>
        <TransitionGroup>
          {posts.map((post, index) => (
              <CSSTransition timeout={500} classNames="post" key={post._id}>
                <PostItem post={post} index={index + 1} />
              </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
  );
};

export default PostList;
