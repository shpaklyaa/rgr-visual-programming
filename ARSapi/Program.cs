var builder = WebApplication.CreateBuilder(args);

// Добавление зависимостей
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Создание статьи
app.MapPost("/api/articles", async (HttpContext ctx, ArticleService articleService) =>
{
    var article = await ctx.Request.ReadFromJsonAsync<Article>();
    var result = await articleService.CreateArticle(article);
    return Results.Ok(result);
});

// Получение статей автора
app.MapGet("/api/articles/{authorId}", async (int authorId, ArticleService articleService) =>
{
    var articles = await articleService.GetArticlesByAuthor(authorId);
    return Results.Ok(articles);
});

// Аутентификация
app.MapPost("/api/auth/login", async (HttpContext ctx, AuthenticationService authService) =>
{
    var loginData = await ctx.Request.ReadFromJsonAsync<(string email, string password)>();
    var isAuthenticated = await authService.Authenticate(loginData.email, loginData.password);

    if (!isAuthenticated)
    {
        return Results.Unauthorized();
    }

    return Results.Ok(new { message = "Успешная аутентификация" });
});

app.Run();