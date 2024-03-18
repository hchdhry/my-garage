using API.Data;
using API.Interface;
using API.Models;

namespace API.Repository;

public class CommentRepository : ICommentRepository
{
    private readonly ApplicationDBContext _dbcontext;
    public CommentRepository(ApplicationDBContext db)
    {
        _dbcontext = db;
    }
    public async Task<Comment> CreateComment(Comment comment)
    {
        await _dbcontext.Comment.AddAsync(comment);
        await _dbcontext.SaveChangesAsync();
        return comment;
        
    }
}
