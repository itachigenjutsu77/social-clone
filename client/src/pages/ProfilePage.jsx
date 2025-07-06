import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import { useUser } from '../context/UserContext';

export default function ProfilePage() {
  const { username } = useParams();
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    API.get(`/users/${username}`)
      .then(res => {
        setProfile(res.data.user);
        setPosts(res.data.posts);
        if (user && res.data.user.followers.includes(user._id)) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      })
      .catch(() => setError('User not found'))
      .finally(() => setLoading(false));
  }, [username, user]);

  const handleFollow = async () => {
    await API.put(`/users/follow/${profile._id}`);
    setFollowing(f => !f);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">{profile.username}</h2>
        <p className="text-gray-600">{profile.bio || 'No bio yet.'}</p>
        <div className="flex justify-center gap-6 mt-2 text-sm text-gray-700">
          <span>{profile.followers?.length || 0} followers</span>
          <span>{profile.following?.length || 0} following</span>
        </div>
        {user && user._id !== profile._id && (
          <button
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            onClick={handleFollow}
          >
            {following ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {posts.map(post => (
          <img
            key={post._id}
            src={post.imageUrl}
            alt="post"
            className="w-full h-48 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
