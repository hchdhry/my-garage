using API.DTO;
using API.Interface;
using API.Mappers;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")] 
public class CommentController: ControllerBase
{
    private readonly ICommentRepository _commentRepository;
    public CommentController(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }
    [HttpPost("{CarId:int}")]
    public async Task<IActionResult> CreateComment(int CarId, [FromBody] CreateCommentDto comment)
    {
        var commentModel = comment.ToCommentFromCreate(CarId);
        var newComment = await _commentRepository.CreateComment(commentModel);
        return Ok(newComment);
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteComment([FromRoute]int id)
    {
        var DeleteComment = _commentRepository.DeleteComment(id);
        if(DeleteComment == null)
        {
            return BadRequest("error");
        }
        return NoContent();
    }


}
