import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/posts/feed', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    };
    fetchFeed();
  }, []);

  return (
    <div className="p-4">
      {posts.map(post => (
        <div key={post._id} className="mb-4 border p-2">
          <p><strong>{post.author.username}</strong></p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" className="w-full" />}
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
