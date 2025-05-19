using ARSapi.Models;

namespace ARSapi.Repositories;

public interface IArticleRepository : IRepository<Article>
{
    Task<IEnumerable<Article>> GetArticlesWithAuthorsAsync();
    Task<IEnumerable<Article>> GetArticlesByAuthorAsync(int authorId);
    Task<Article?> GetArticleWithDetailsAsync(int id);
} 