import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${username}`);
        setUser(res.data.user);
        setPosts(res.data.posts);
        // Check if current user is following (optional, needs auth context)
        // setFollowing(...)
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  const handleFollow = async () => {
    try {
      await api.put(`/users/follow/${user._id}`);
      setFollowing((f) => !f);
    } catch {}
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <img src={user.avatar || '/default-avatar.png'} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.bio}</p>
          <button
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            onClick={handleFollow}
          >
            {following ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <img
            key={post._id}
            src={post.imageUrl || '/placeholder.png'}
            alt={post.caption}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
