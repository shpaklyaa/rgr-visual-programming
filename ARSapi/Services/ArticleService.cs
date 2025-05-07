public class ArticleService
{
    private readonly ArticleRepository _articleRepository;

    public ArticleService(ArticleRepository articleRepository)
    {
        _articleRepository = articleRepository;
    }

    public async Task<int> CreateArticle(Article article)
    {
        return await _articleRepository.CreateArticle(article);
    }

    public async Task<List<Article>> GetArticlesByAuthor(int authorId)
    {
        return await _articleRepository.GetArticlesByAuthor(authorId);
    }
}