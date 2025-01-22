import { useState, useEffect } from "react";
import { TPost } from "../../models";
import { useFetchData } from "../../hooks/useFetchData";
import { Loading, ErrorMessage, WidgetAddPost, ButtonShowAddForm, PostList } from "../../components";
import { useLocation } from "react-router-dom";

const PostListPage = () => {
  const url = import.meta.env.VITE_POSTS_URL;
  const [request, setRequest] = useState<string | null>(null);
  // const [view, seView] = useState<boolean>(false);
  const { state } = useLocation();
  
  useEffect(() => {
    if(state) setRequest(state.send);
  });

  const [{ data: posts, loading, error }] = useFetchData(request && url);

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
      {postsData ? <PostList posts={postsData} /> : null}
    </>
  );
};

export default PostListPage;