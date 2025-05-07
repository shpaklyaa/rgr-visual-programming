import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <ul>
            {reviews.map((review) => (
                <li key={review.id}>
                    <strong>{review.articleTitle}</strong> - {review.status}
                </li>
            ))}
        </ul>
    );
};

export default ReviewList;