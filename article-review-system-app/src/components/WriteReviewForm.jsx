import React, { useState } from 'react';

const WriteReviewForm = () => {
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('on_rework');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Рецензия:', { comment, status });
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментарий"
                required
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="on_rework">Отправлено на доработку</option>
                <option value="accepted">Принято к публикации</option>
                <option value="rejected">Отклонено</option>
            </select>
            <button type="submit">Отправить</button>
        </form>
    );
};

export default WriteReviewForm;