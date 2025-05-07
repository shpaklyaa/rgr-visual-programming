export const getArticles = async () => {
    const response = await fetch('/api/articles');
    return await response.json();
};

export const submitArticle = async (formData) => {
    const response = await fetch('/api/articles', {
        method: 'POST',
        body: formData,
    });
    return await response.json();
};

export const writeReview = async (reviewData) => {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
    });
    return await response.json();
};