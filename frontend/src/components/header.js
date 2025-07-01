import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('Token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('Username');
    navigate('/auth');
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black/60 text-white shadow-md">
      <h1 className="text-2xl font-bold">
        <Link to="/">TatvaBox</Link>
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/tatva/create')}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded"
        >
          Create Tatva
        </button>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-white text-black hover:bg-gray-200 px-4 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-black hover:bg-gray-200 px-4 py-1 rounded"
          >
            Login / Signup
          </button>
        )}
      </div>
    </header>
  );
}
export default Header
