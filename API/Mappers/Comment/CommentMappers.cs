﻿using API.Models;
using API.DTO;

namespace API.Mappers;

public static class CommentMappers
{
    public static Comment ToCommentFromCreate(this CreateCommentDto comment, int CarId)
    {
        return new Comment
        {

            Title = comment.Title,
           Text = comment.Text,
           CarId = CarId
          
        };
    }

}
