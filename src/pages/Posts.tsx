import React, {useEffect, useMemo, useState} from "react";
import PostList from "../components/post-list/PostList.tsx";
import PostFilter from "../components/post-filter/PostFilter.tsx";
import Header from "../components/UI/header/Header.tsx";
import {notesAPI} from "../services/NotesService.ts";
import {useAppSelector} from "../hooks/redux.ts";
import PostForm from "../components/post-form/PostForm.tsx";
import MyButton from "../components/UI/button/MyButton.tsx";
import MyModal from "../components/UI/myModal/MyModal.tsx";
import Loader from "../components/UI/loader/MyLoader.tsx";
import useSortedPosts from "../hooks/useSortedPosts.ts";
import Pagination from "../components/UI/pagination/Pagination.tsx";

function Posts() {
  const userId = useAppSelector(state => state.userReducer.uid);
  const [filter, setFilter] = useState({sort: "", query: "", direction: "asc"});
  const [modal, setModal] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const {data: posts, isLoading} = notesAPI.useFetchAllNotesQuery(userId);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    return posts.filter(post =>
        post.title.toLowerCase().includes(filter.query.toLowerCase()) ||
        post.description.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [posts, filter.query]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const sortedPosts = useSortedPosts(currentPosts, filter);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredPosts.length / postsPerPage));
  }, [filteredPosts]);

  return (
      <div className="App">
        <Header/>

        <div className="create-post__container">
          <MyButton onClick={() => setModal(true)}>
            Створити пост
          </MyButton>
        </div>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm/>
        </MyModal>

        <hr style={{margin: "15px 0"}}/>

        <PostFilter filter={filter} setFilter={setFilter}/>

        {isLoading ? (
            <div style={{marginTop: 50, display: "flex", justifyContent: "center"}}>
              <Loader/>
            </div>
        ) : (
            <PostList posts={sortedPosts} title="Записи"/>
        )}
        <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
        />
      </div>
  );
}

export default Posts;
