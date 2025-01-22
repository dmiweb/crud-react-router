import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import { Form, Input, Button } from "../../components";

const FormAddPost = () => {
  const [text, setText] = useState<string>('');
  const [savePost, setSavePost] = useState<string>('');
  const [newPost, setNewPost] = useState<{ id: number, content: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedValue = localStorage.getItem('save-form-add-post');
    if (storedValue) setSavePost(storedValue);
  }, []);

  useEffect(() => {
    if (text) localStorage.setItem('save-form-add-post', text);
  }, [text]);

  const [{ loading }] = useFetchData(
    newPost ? import.meta.env.VITE_POSTS_URL : null,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    }
  );

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value
    setText(inputValue)
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formText = event.currentTarget.text.value;

    if (!formText) return;

    setNewPost({
      id: 0,
      content: formText
    });

    localStorage.removeItem('save-form-add-post');
  }

  useEffect(() => {
    console.log('Отправилось')
    if (!loading && newPost) navigate('/', { replace: true });
    
  }, [loading, newPost, navigate]);

  return (
    <Form className='form-add-post' handler={onFormSubmit}>
      <div className='add-post-img'></div>

      <Input
        type="text"
        className='add-post-input'
        name='text'
        defaultValue={savePost}
        handler={onTextChange}
        placeholder='Начните ваш пост...'
      />

      <Button type='submit' className='add-post-btn'>
        Опубликовать
      </Button>
    </Form>
  );
};

export default FormAddPost;