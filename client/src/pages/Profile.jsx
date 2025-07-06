import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${username}`).then(res => setData(res.data));
  }, [username]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{data.user.username}</h2>
      <p>{data.user.bio}</p>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.posts.map(p => (
          <img key={p._id} src={p.imageUrl} alt="post" className="w-full" />
        ))}
      </div>
    </div>
  );
};

export default Profile;
