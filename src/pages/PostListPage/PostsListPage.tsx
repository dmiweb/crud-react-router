// import { useState, useEffect } from "react";
import { TPost } from "../../models";
import { useFetchData } from "../../hooks/useFetchData";
import { Loading, ErrorMessage, WidgetAddPost, ButtonShowAddForm, PostList } from "../../components";

const PostListPage = () => {
  const url = import.meta.env.VITE_POSTS_URL;
  // const [fetchTrigget, setFetchTrigger] = useState<number>(0);
  // const [view, seView] = useState<boolean>(false);


  const [{ data: posts, loading, error }] = useFetchData(url);

  const postsData = posts as TPost[];

  // useEffect(() => {
  //   if (posts === null || !postsData.length) {
  //     console.log('Нет длины')
  //     setFetchTrigger(prev => prev + 1)
  //   } 

  //   if (posts && postsData.length) {
  //     console.log('Есть длина')
  //     seView(true)
  //   } 
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [posts]);

  return (
    <>
      <WidgetAddPost>
        <ButtonShowAddForm />
      </WidgetAddPost>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !error ? <PostList posts={postsData} /> : null}
    </>
  );
};

export default PostListPage;