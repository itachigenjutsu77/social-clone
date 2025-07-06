import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={
        <PrivateRoute>
          <CreatePost />
        </PrivateRoute>
      } />
    </Routes>
  );
}
