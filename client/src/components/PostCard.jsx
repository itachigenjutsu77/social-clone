import { useUser } from '../context/UserContext';
import API from '../api';

export default function PostCard({ post }) {
  const { user } = useUser();

  const toggleLike = () => {
    API.put(`/posts/like/${post._id}`).then(() => {
      // Optionally re-fetch or update state
    });
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-2">
        <img src={post.author.avatar || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full object-cover border" />
        <h2 className="font-bold text-lg text-blue-700">{post.author.username}</h2>
        <span className="ml-auto text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <img src={post.imageUrl || '/placeholder.png'} className="w-full mt-2 rounded-lg aspect-square object-cover border" />
      <p className="mt-2 text-gray-800">{post.caption}</p>
      <button
        onClick={toggleLike}
        className="mt-2 flex items-center gap-1 text-pink-600 hover:text-pink-700 font-semibold"
      >
        <span className="text-xl">❤️</span> {post.likes.length}
      </button>
      <div className="mt-3 bg-gray-50 rounded p-2">
        {post.comments.map(c => (
          <p key={c._id} className="text-sm text-gray-700 mb-1">
            <span className="font-semibold text-blue-600">{c.user.username}</span>: {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}
