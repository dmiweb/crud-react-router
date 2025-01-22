import { TPost } from "../../models";
import PostItem from "./PostItem";

const PostList = ({ posts }: { posts: TPost[] }) => {
  return (
    <ul className='post-list'>
      {posts.map((post) =>
        <li key={post.id} id={String(post.id)} className='post-list-item'>
          <PostItem post={post} />
        </li>
      )}
    </ul>
  );
};

export default PostList;