import { TPost } from "../../models";
import { useFetchData } from "../../hooks/useFetchData";
import {Loading, ErrorMessage, WidgetAddPost, ButtonShowAddForm, PostList} from "../../components";

const PostListPage = () => {
  const url = import.meta.env.VITE_POSTS_URL;
  
  const [{ data: posts, loading, error }] = useFetchData(url);

  const postsData: TPost[] = posts as TPost[];

  return (
    <>
      <WidgetAddPost>
        <ButtonShowAddForm />
      </WidgetAddPost>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {posts && <PostList posts={postsData} />}
    </>
  );
};

export default PostListPage;