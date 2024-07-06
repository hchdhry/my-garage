using API.DTO;
using API.Extensions;
using API.Interface;
using API.Mappers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")] 
public class CommentController: ControllerBase
{
    private readonly ICommentRepository _commentRepository;
    private readonly UserManager<User> _userManager;
    public CommentController(ICommentRepository commentRepository,UserManager<User> userManager)
    {
        _commentRepository = commentRepository;
        _userManager = userManager;
    }
    [Authorize]
    [HttpPost("{CarId:int}")]
    public async Task<IActionResult> CreateComment([FromRoute]int CarId, [FromBody] CreateCommentDto comment)
    {

        if (!ModelState.IsValid)
            return BadRequest("oops");

        var username = User.getUserName();
        var appUser = await _userManager.FindByNameAsync(username);

        var commentModel = comment.ToCommentFromCreate(CarId);
        commentModel.User = appUser;
        if (appUser == null)
            return BadRequest("User not found");

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

    [HttpPut("{CommentId:int}")]
    public async Task<IActionResult> UpdateComment([FromRoute]int CommentId,[FromBody]UpdateCommentDTO commentDTO)
    {
        var UpdateComment = await _commentRepository.UpdateComment(CommentId,commentDTO);
        if(UpdateComment == null) return BadRequest("comment not found");
        return Ok(UpdateComment);
    }

    [HttpGet("{CarId:int}")]
    public async Task<IActionResult> GetComments([FromRoute] int CarId,[FromQuery] QueryObject queryObject)
    {
        var comments = await _commentRepository.GetAllById(CarId,queryObject);
        if (comments == null || !comments.Any())
            return NotFound("No comments found");

        List<CommentDTO> listOfCommentDTO = comments.Select(e => e.CommentToDTO()).ToList();
        return Ok(listOfCommentDTO);
    }


}
