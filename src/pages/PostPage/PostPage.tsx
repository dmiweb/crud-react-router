import { TPost } from "../../models";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import {Button, Loading, ErrorMessage, PostItem} from "../../components";

const PostPage = () => {
  const [remove, setRemove] = useState<string>('');

  const params = useParams();
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_POSTS_URL}/${params.id}`;

  const [{ data, loading, error }] = useFetchData(url);
  const post = data as TPost;

  const [{loading: load}] = useFetchData(
    remove ? url : null, 
    { method: 'DELETE' }
  );

  const onEdit = () => {
    navigate('/posts/edit/' + params.id, { state: post });
  }

  const onRemove = () => {
    setRemove('ok');
  }

    useEffect(() => {
      if (remove && !load) navigate('/', { replace: true });
    }, [load, remove, navigate]);

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {post && 
      <div id={String(post.id)} className='post-item'>
        <PostItem post={{ id: 0, content: "", created: "" }} {...post} isLink={false} />
      </div>}

      <div className="options-post">
        <Button type='button' className='edit-post-btn' handler={onEdit}>Изменить</Button>
        <Button type='button' className='remove-post-btn' handler={onRemove}>Удалить</Button>
      </div>

    </>
  );
};

export default PostPage;