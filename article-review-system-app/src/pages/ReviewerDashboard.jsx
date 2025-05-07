import React, { useEffect, useState } from 'react';
import ReviewList from '../components/ReviewList';
import WriteReviewForm from '../components/WriteReviewForm';

const ReviewerDashboard = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // TODO: Загрузить список рецензий через API
        setReviews([
            { id: 1, articleTitle: 'Статья 1', status: 'Отправлено на доработку' },
            { id: 2, articleTitle: 'Статья 2', status: 'Принято к публикации' },
        ]);
    }, []);

    return (
        <div>
            <h1>Личный кабинет рецензента</h1>
            <h2>Мои рецензии:</h2>
            <ReviewList reviews={reviews} />
            <h2>Написать новую рецензию:</h2>
            <WriteReviewForm />
        </div>
    );
};

export default ReviewerDashboard;