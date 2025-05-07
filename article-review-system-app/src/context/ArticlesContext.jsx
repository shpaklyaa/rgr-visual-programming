import React, { createContext, useState, useEffect } from 'react';
import { getArticles } from '../services/apiService';

export const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getArticles();
            setArticles(data);
        };
        fetchArticles();
    }, []);

    return (
        <ArticlesContext.Provider value={{ articles }}>
            {children}
        </ArticlesContext.Provider>
    );
};