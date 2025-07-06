import { useEffect, useState } from 'react';
import API from '../api';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts/feed').then(res => setPosts(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  );
}
