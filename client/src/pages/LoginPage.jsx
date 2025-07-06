import { useState } from 'react';
import API from '../api';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    navigate('/');
  };

  return (
    <form onSubmit={login} className="p-6 max-w-sm mx-auto">
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
      <button className="btn w-full mt-4">Login</button>
    </form>
  );
}
