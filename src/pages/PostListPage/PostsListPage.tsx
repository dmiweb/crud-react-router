import { useState, useEffect } from "react";
import { TPost } from "../../models";
import { useFetchData } from "../../hooks/useFetchData";
import { Loading, ErrorMessage, WidgetAddPost, ButtonShowAddForm, PostList } from "../../components";

const PostListPage = () => {
  const url = import.meta.env.VITE_POSTS_URL;
  const [fetchTrigget, setFetchTrigger] = useState<boolean>(false);

  const [{ data: posts, loading, error }] = useFetchData(url, {}, fetchTrigget);

  const postsData = posts as TPost[];

  useEffect(() => {
    if (!postsData.length) {
      setFetchTrigger(true)
    } else {
      setFetchTrigger(false)
    }
  }, [postsData]);

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