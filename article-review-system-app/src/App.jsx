import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthorDashboard from './pages/author/AuthorDashboard';
import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/author/*"
                        element={
                            <ProtectedRoute role="author">
                                <>
                                    <Navbar />
                                    <AuthorDashboard />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/reviewer/*"
                        element={
                            <ProtectedRoute role="reviewer">
                                <>
                                    <Navbar />
                                    <ReviewerDashboard />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute role="admin">
                                <>
                                    <Navbar />
                                    <AdminDashboard />
                                </>
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App; 