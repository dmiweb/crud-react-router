import {WidgetAddPost, MenuFormAddPost, FormAddPost, Emoji} from "../../components";

const AddPostPage = (): JSX.Element => {
  return (
    <WidgetAddPost>
      <MenuFormAddPost />
      <FormAddPost />
      <Emoji />
    </WidgetAddPost>
  );
};

export default AddPostPage;