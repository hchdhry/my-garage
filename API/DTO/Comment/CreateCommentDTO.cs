using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class CreateCommentDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must be at least 5 characters long")]
        [MaxLength(75, ErrorMessage = "Title must be at most 75 characters long")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(5, ErrorMessage = "Content must be at least 5 characters long")]
        [MaxLength(500, ErrorMessage = "Content must be at most 500 characters long")]
        public string Text { get; set; }
    }
}