import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ArticlesProvider } from './context/ArticlesContext';
import Navbar from './components/Navbar';
import AuthorDashboard from './pages/AuthorDashboard';
import ReviewerDashboard from './pages/ReviewerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <AuthProvider>
            <ArticlesProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/author" element={<AuthorDashboard />} />
                        <Route path="/reviewer" element={<ReviewerDashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Router>
            </ArticlesProvider>
        </AuthProvider>
    );
}

export default App;