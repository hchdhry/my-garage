using API.Data;
using API.Interface;
using API.Models;
using Microsoft.EntityFrameworkCore;

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

    public async Task<Comment> DeleteComment(int id)
    {       
        var CommentToDelete = await _dbcontext.Comment.FirstOrDefaultAsync(u => u.Id == id);
        if (CommentToDelete == null)
        {
            return null;
        }
        _dbcontext.Comment.Remove(CommentToDelete);
       await _dbcontext.SaveChangesAsync();
       return CommentToDelete;
    }
}
