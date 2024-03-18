using API.Models;
namespace API.Interface{

public interface ICommentRepository
{
    Task<Comment> CreateComment(Comment comment);

}
}