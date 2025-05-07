import React from 'react';

const ArticleList = ({ articles }) => {
    return (
        <ul>
            {articles.map((article) => (
                <li key={article.id}>
                    <strong>{article.title}</strong> - {article.status}
                </li>
            ))}
        </ul>
    );
};

export default ArticleList;