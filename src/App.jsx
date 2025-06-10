import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Ingredients from './views/Ingredients'
import Home from './views/Home'
import MealsByIngredient from './views/MealsByIngredient'
import MealDetail from './views/MealDetail'
import Login from './views/Login'
import { AuthProvider, useAuth } from './contexts/AuthContext'

// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/ingredients' element={<ProtectedRoute><Ingredients /></ProtectedRoute>} />
        <Route path='/ingredients/:ingredient' element={<ProtectedRoute><MealsByIngredient /></ProtectedRoute>} />
        <Route path='/meal/:id' element={<ProtectedRoute><MealDetail /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
