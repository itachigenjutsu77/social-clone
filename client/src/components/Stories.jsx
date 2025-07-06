import { useEffect, useState } from 'react';
import API from '../api';

export default function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    API.get('/stories').then(res => setStories(res.data));
  }, []);

  return (
    <div className="flex gap-4 overflow-x-auto p-4 bg-white rounded shadow mb-4">
      {stories.map(story => (
        <div key={story._id} className="flex flex-col items-center">
          <img src={story.avatar || '/default-avatar.png'} alt="avatar" className="w-16 h-16 rounded-full border-2 border-blue-500" />
          <span className="text-xs mt-1">{story.username}</span>
        </div>
      ))}
    </div>
  );
}
