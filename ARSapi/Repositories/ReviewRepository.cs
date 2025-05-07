public class ReviewRepository
{
    private readonly ApplicationDbContext _context;

    public ReviewRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateReview(Review review)
    {
        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();
        return review.Id;
    }

    public async Task<List<Review>> GetReviewsByReviewer(int reviewerId)
    {
        return await _context.Reviews
            .Where(r => r.ReviewerId == reviewerId)
            .ToListAsync();
    }
}