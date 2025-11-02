import HomePage from './pages/HomePage'
import PostsPage from './pages/PostsPage'
import VitePage from './pages/VitePage'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HeaderDefault from './components/HeaderDefault'
import FooterDefault from './components/FooterDefault'
import PostPage from './pages/PostPage'
import CreatePostPage from './pages/CreatePostPage';
import UpdatePostPage from './pages/UpdatePostPage';


function App() {
  return (
    <div>
      <HeaderDefault />
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<HomePage />} />

        {/* Route for the posts page */}
        <Route path="/posts" element={<PostsPage />} />

        {/* Route for the vite default page */}
        <Route path="/vite" element={<VitePage />} />

        {/* Route for post creation page */}
        <Route path="/posts/create" element={<CreatePostPage />} />

        {/* Route for the posts */}
        <Route path="/posts/:id" element={<PostPage />} />

        {/* Route for post updating page */}
        <Route path="/posts/update/:id" element={<UpdatePostPage />} />

      </Routes>
      <FooterDefault />
    </div>
  )
}

export default App
