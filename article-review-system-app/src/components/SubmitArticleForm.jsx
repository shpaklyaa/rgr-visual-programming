import React, { useState } from 'react';

const SubmitArticleForm = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Отправка статьи:', { title, file });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название статьи"
                required
            />
            <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                required
            />
            <button type="submit">Отправить</button>
        </form>
    );
};

export default SubmitArticleForm;