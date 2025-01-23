import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { Loading, Form, Input, Button } from "../../components";

const FormEditPost = () => {
  const [postId, setpostId] = useState<number>(0);
  const [postContent, setPostContent] = useState<string>('');
  const [editedPost, setEditedPost] = useState<{ id: number, content: string } | null>(null);

  const url: string = `${import.meta.env.VITE_POSTS_URL}/${postId}`;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const post = location.state.post
    setpostId(Number(post.id))
    setPostContent(post.content)
  }, [location]);

  const [{ loading, reqSuccess }] = useFetchData(
    editedPost ? url : null,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedPost),
    }
  );

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formText = event.currentTarget.text.value;

    if (!formText) return;

    if (postId !== 0 || postContent !== '') {
      setEditedPost({
        id: postId,
        content: formText
      });
    }
  }

  useEffect(() => {
    if (editedPost && reqSuccess) navigate('/posts/' + postId, { replace: true });
  }, [editedPost, postId, reqSuccess, navigate]);

  return (
    <>
      <Form className='form-add-post' handler={onFormSubmit}>
        <div className='add-post-img'></div>

        <Input
          type="text"
          className='add-post-input'
          name='text'
          defaultValue={postContent}
        />

        <Button
          type='submit'
          className='add-post-btn'
          style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          Сохранить
        </Button>
      </Form>

      {loading && <Loading />}
    </>

  );
};

export default FormEditPost;