using ARSapi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ARSapi.Services;

public interface IArticleService
{
    Task<IEnumerable<object>> GetArticlesAsync(int userId, string? userRole);
    Task<Article?> GetArticleByIdAsync(int id, int userId, string? userRole);
    Task<(bool success, object? result, string? errorMessage)> SubmitArticleAsync(IFormFile file, string title, int userId, string webRootPath);
    Task<(bool success, string? errorMessage)> DeleteArticleAsync(int id, string webRootPath);
} 