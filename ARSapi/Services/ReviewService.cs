public class ReviewService
{
    private readonly ReviewRepository _reviewRepository;

    public ReviewService(ReviewRepository reviewRepository)
    {
        _reviewRepository = reviewRepository;
    }

    public async Task<int> CreateReview(Review review)
    {
        return await _reviewRepository.CreateReview(review);
    }

    public async Task<List<Review>> GetReviewsByReviewer(int reviewerId)
    {
        return await _reviewRepository.GetReviewsByReviewer(reviewerId);
    }
}