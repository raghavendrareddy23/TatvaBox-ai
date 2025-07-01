import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MiniLoader } from './loader';
import api from '../API/api';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      toast.success('Signup successful');
      console.log('Signup success:', res.data);
    } catch (err) {
      console.error('Signup error:', err);
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSignup} className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="User Name"
        value={formData.username}
        onChange={handleChange}
        required
        className="p-2 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-2 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="p-2 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
      >
        {loading ? (
              <MiniLoader/>
            ) : (
              "Signup"
            )}
      </button>
    </form>
  );
}

export default Signup