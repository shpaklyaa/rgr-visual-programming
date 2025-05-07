import React, { createContext, useState, useEffect } from 'react';
import { login, register } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, password) => {
        const response = await login(email, password);
        setUser(response);
    };

    const handleRegister = async (userData) => {
        const response = await register(userData);
        setUser(response);
    };

    const handleLogout = () => {
        setUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};