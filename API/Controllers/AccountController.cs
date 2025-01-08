using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers{

[ApiController]
[Route("api/Account")]
public class AccountController:ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _TokenService;
    private readonly SignInManager<User> _SignInManager;

public AccountController(UserManager<User> userManager,ITokenService tokenService,SignInManager<User> signInManager)
{
    _userManager = userManager;
    _TokenService = tokenService;
    _SignInManager = signInManager;
    
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
            if(createdUser.Succeeded) {
                    var role = await _userManager.AddToRoleAsync(appUser, "User");
                    if(role.Succeeded){
                       
                    return Ok(new NewUserDto
                    {
                        UserName = appUser.UserName,
                        Email = appUser.Email,
                        token = _TokenService.CreateToken(appUser)
                    });}
                    else { return BadRequest();}
            }
          
            else { return StatusCode(500, createdUser.Errors); }
            

        
    }
    catch(Exception e)
    {
         return StatusCode(500, e);
    }
         

}
[HttpPost("login")]
        public async Task<IActionResult> LogIn(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);
            if (user == null)
            {
                return Unauthorized("invalid username");
            }
            var result = await _SignInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return NotFound("incorrect credentials");
            }
            return Ok(new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                token = _TokenService.CreateToken(user)
            });


        }

    }
}