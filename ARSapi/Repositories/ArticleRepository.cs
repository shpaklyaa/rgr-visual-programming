public class ArticleRepository
{
    private readonly ApplicationDbContext _context;

    public ArticleRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateArticle(Article article)
    {
        _context.Articles.Add(article);
        await _context.SaveChangesAsync();
        return article.Id;
    }

    public async Task<List<Article>> GetArticlesByAuthor(int authorId)
    {
        return await _context.Articles
            .Where(a => a.AuthorId == authorId)
            .ToListAsync();
    }
}