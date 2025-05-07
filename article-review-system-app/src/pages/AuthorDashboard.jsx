import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import SubmitArticleForm from '../components/SubmitArticleForm';

const AuthorDashboard = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // TODO: Загрузить список статей через API
        setArticles([
            { id: 1, title: 'Статья 1', status: 'Не рецензировано' },
            { id: 2, title: 'Статья 2', status: 'Принято к публикации' },
        ]);
    }, []);

    return (
        <div>
            <h1>Личный кабинет автора</h1>
            <h2>Мои статьи:</h2>
            <ArticleList articles={articles} />
            <h2>Отправить новую статью:</h2>
            <SubmitArticleForm />
        </div>
    );
};

export default AuthorDashboard;