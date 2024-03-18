using API.Models;

namespace API;

public interface ITokenService
{
    string CreateToken(User user);
}
