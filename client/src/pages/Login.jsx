import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="mb-2 p-2 w-full" />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="mb-2 p-2 w-full" />
      <button className="bg-blue-500 text-white p-2 w-full">Login</button>
    </form>
  );
};

export default Login;
