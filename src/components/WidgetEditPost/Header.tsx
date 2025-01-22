import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const onEditCancel = () => {
    navigate(-1);
  }

  return (
    <div className="edit-post-header">
      <h2 className="edit-post-header-title">Редактировать публикацию</h2>
      <Button type='button' className='save-edit-btn' handler={onEditCancel}>&times;</Button>
    </div>
  );
};

export default Header;