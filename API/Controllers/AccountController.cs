using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers{

[ApiController]
[Route("api/Account")]
public class AccountController:ControllerBase
{
    UserManager<User> _userManager;

public AccountController(UserManager<User> userManager)
{
    _userManager = userManager;
    
}
[HttpPost("register")]
public async Task<IActionResult> Register(RegisterDto registerDto)
{
    try
    {
        if(!ModelState.IsValid)
                {
                    return BadRequest("Invalid request");

                }
                var appUser = new User
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,                
            };
            var createdUser = await _userManager.CreateAsync(appUser,registerDto.Password);
            if(createdUser.Succeeded) return Ok("user created");
          
            else { return StatusCode(500, createdUser.Errors); }
            

        
    }
    catch(Exception e)
    {
         return StatusCode(500, e);
    }
         

}

}
}