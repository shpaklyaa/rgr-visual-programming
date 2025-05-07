public class Review
{
    public int Id { get; set; }
    public int ArticleId { get; set; }
    public Article Article { get; set; }
    public int ReviewerId { get; set; }
    public User Reviewer { get; set; }
    public string Comment { get; set; }
    public string Status { get; set; } // Отправлено на доработку, Принято к публикации, Отклонено
    public DateTime DateCreated { get; set; }
}