using ARSapi.Data;
using ARSapi.Models;
using Microsoft.EntityFrameworkCore;

namespace ARSapi.Repositories;

public class ReviewRepository : Repository<Review>, IReviewRepository
{
    public ReviewRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Review>> GetReviewsByReviewerAsync(int reviewerId)
    {
        return await _dbSet
            .Include(r => r.Article)
                .ThenInclude(a => a.Author)
            .Where(r => r.ReviewerId == reviewerId)
            .ToListAsync();
    }
} 