import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const MenuFormAddPost = () => {
  const navigate = useNavigate();

  const handleCancelBtn = () => {
    navigate('/', { replace: true });
  }

  return (
    <nav className='add-post-menu'>
      <NavLink to='#' className='add-post-menu-item'>Публикация</NavLink>
      <NavLink to='#' className='add-post-menu-item'>Фото.видео</NavLink>
      <NavLink to='#' className='add-post-menu-item'>Прямой эфир</NavLink>
      <NavLink to='#' className='add-post-menu-item'>Ещё</NavLink>
      <Button type='button' className='add-post-cancel-btn' handler={handleCancelBtn}>&times;</Button>
    </nav>
  );
};

export default MenuFormAddPost;