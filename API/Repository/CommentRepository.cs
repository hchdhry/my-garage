﻿using API.Data;
using API.DTO;
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

    public async Task<Comment> GetByID(int id)
    {   
        return await _dbcontext.Comment.Include(a => a.User).FirstOrDefaultAsync(c=>c.Id == id);
       
    }
    public async Task<List<Comment>> GetAllById(int CarId, QueryObject queryObject)
    {
      var comments = _dbcontext.Comment.Where(c=> c.CarId == CarId).AsQueryable();
      if(queryObject.AscendingByYear == true)
      {
        comments = comments.OrderBy(c=>c.CreatedAt);
      }
      return await comments.ToListAsync();
    }

    public async Task<Comment> UpdateComment(int CommentId, UpdateCommentDTO comment)
    {
        var CommentToUpdate = await _dbcontext.Comment.FirstOrDefaultAsync(c=>c.Id == CommentId);

        if(CommentToUpdate == null)
        {
            return null;
        }

            CommentToUpdate.Text = comment.Text;
            CommentToUpdate.Title = comment.Title;
            CommentToUpdate.CreatedAt = comment.CreatedAt;
            await _dbcontext.SaveChangesAsync();
            return CommentToUpdate;

    }
}
