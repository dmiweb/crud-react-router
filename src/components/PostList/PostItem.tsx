import { Link } from "react-router-dom";
import withDateTimePretty from "../../hocs/withDateTimePretty";
import { TPost } from "../../models";
import PostAge from "./PostAge";

type PostItemProps = {
  post: TPost,
  isLink?: boolean
}

const PostItem = ({ post, isLink = true }: PostItemProps) => {
  const { id, content, created } = post;

  const SinceDatePost = withDateTimePretty(PostAge);

  return (
    <div id={String(id)} className="post">
      <div className='user-container'>
        <div className='avatar-container'>
          <img className='avatar-img' src="https://1avatara.ru/pic/3d/3D034.jpg" alt="user avatar" />
        </div>
        <div className='info-container'>
          <span className='user-name'>Ilnaz Gilyazov</span>
          <span className='user-role-faunder'>Основатель группы</span>
          <SinceDatePost date={created} />
        </div>
      </div>

      {
        isLink ?
          <Link to={`/posts/${id}`}><h1 className='post-title'>{content}</h1></Link> :
          <h1 className='post-title'>{content}</h1>
      }

      <div className='post-rating-container'>
        <button className='like-btn'>Нравится</button>
        <button className='comment-btn'>Комментировать</button>
      </div>
      <div className='form-add-comment'></div>
    </div>
  );
}

export default PostItem;