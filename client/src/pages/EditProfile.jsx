import { useState } from 'react';
import API from '../api';
import { useUser } from '../context/UserContext';

export default function EditProfile() {
  const { user, setUser } = useUser();
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.put(`/users/${user._id}`, { bio, avatar });
    setUser(res.data);
    setMsg('Profile updated!');
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-md mx-auto">
      <input value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" className="input mb-2" />
      <input value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Avatar URL" className="input mb-2" />
      <button className="btn">Save</button>
      {msg && <div className="text-green-500 mt-2">{msg}</div>}
    </form>
  );
}
