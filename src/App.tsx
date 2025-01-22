import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { PostListPage, PostPage, AddPostPage, EditPostPage} from './pages';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostListPage />} />
        <Route path="posts/new" element={<AddPostPage />} />
        <Route path="posts/:id" element={<PostPage />} />
        <Route path="posts/edit/:id" element={<EditPostPage />} />
      </Route>
    </Routes>
  )
}

export default App;
