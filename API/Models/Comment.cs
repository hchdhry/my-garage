
namespace API.Models{

public class Comment
{
    public int Id { get; set; } 

    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public int CarId { get; set; }
    public Car Car { get; set; }
    public User User { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }
}