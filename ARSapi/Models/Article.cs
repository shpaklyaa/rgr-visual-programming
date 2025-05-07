public class Article
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string FilePath { get; set; }
    public string Status { get; set; } // Не рецензировано, Отправлено на доработку, Принято к публикации, Отклонено
    public int AuthorId { get; set; }
    public User Author { get; set; }
    public ICollection<Review> Reviews { get; set; }
}