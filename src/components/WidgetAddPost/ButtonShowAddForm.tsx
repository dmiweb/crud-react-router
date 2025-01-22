import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const ButtonShowAddForm = () => {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate('/posts/new');
  };

  return (
    <div className="right-align-wrapper">
      <Button type='button' className='show-form-add-post-btn' handler={handlerButton}>
        Создать пост
      </Button>
    </div>
  );
};

export default ButtonShowAddForm;