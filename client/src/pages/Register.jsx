import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', form);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} className="mb-2 p-2 w-full" />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} className="mb-2 p-2 w-full" />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} className="mb-2 p-2 w-full" />
      <button className="bg-green-500 text-white p-2 w-full">Register</button>
    </form>
  );
};

export default Register;
