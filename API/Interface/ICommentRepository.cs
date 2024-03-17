using API.Models;
namespace API.Interface{

public interface ICommentRepository
{
    Task<Comment> CreateComment(string Text, string Title);

}
}