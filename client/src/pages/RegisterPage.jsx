import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', { username, email, password });
    navigate('/login');
  };

  return (
    <form onSubmit={register} className="p-6 max-w-sm mx-auto">
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input" />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
      <button className="btn w-full mt-4">Register</button>
    </form>
  );
}
