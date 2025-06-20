import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { firebaseUser, authLoading } = useUser();

  if (authLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 