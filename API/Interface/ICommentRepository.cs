﻿using API.Models;
namespace API.Interface{

public interface ICommentRepository
{
    Task<Comment> CreateComment(Comment comment);

    Task<Comment> DeleteComment(int id);

    Task<Comment> UpdateComment(int card,Comment comment);

}
}