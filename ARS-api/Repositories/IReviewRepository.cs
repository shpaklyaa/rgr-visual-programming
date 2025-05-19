using ARSapi.Models;

namespace ARSapi.Repositories;

public interface IReviewRepository : IRepository<Review>
{
    Task<IEnumerable<Review>> GetReviewsByReviewerAsync(int reviewerId);
} 