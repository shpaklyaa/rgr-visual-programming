import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // TODO: Загрузить список пользователей и статей через API
        setUsers([
            { id: 1, name: 'Автор 1', role: 'Автор' },
            { id: 2, name: 'Рецензент 1', role: 'Рецензент' },
        ]);
        setArticles([
            { id: 1, title: 'Статья 1', status: 'Не рецензировано' },
            { id: 2, title: 'Статья 2', status: 'Принято к публикации' },
        ]);
    }, []);

    return (
        <div>
            <h1>Личный кабинет администратора</h1>
            <h2>Пользователи:</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.role}
                    </li>
                ))}
            </ul>
            <h2>Статьи:</h2>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        {article.title} - {article.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;