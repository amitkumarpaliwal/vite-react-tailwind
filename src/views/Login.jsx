import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleLogin = () => {
    login();
    navigate('/');
  };
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-2xl font-bold mb-4 text-white">Login Simulation</h2>
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          Login
        </button>
      </div>
    </MainLayout>
  );
}
