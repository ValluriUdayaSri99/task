import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;