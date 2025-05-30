import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute check:', { 
    user, 
    loading, 
    allowedRoles, 
    currentPath: location.pathname 
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.userType)) {
    console.log(`User role ${user.userType} not allowed, required: ${allowedRoles.join(', ')}`);
    return <Navigate to="/" />;
  }

  return children;
}