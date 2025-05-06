import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token'); // Check if token exists

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/login" />;
    }

    // If token exists, render the children (protected component)
    return children;
}

export default ProtectedRoute;