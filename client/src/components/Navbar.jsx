import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">SocialConnect</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/create" className="text-blue-500">Create Post</Link>
            <Link to={`/profile/${user.username || ''}`} className="text-blue-500">Profile</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500">Login</Link>
            <Link to="/register" className="text-blue-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
