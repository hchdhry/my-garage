using Microsoft.AspNetCore.Identity;

namespace API.Models{

public class User: IdentityUser
{
        public List<Garage> Garage { get; set; } = new List<Garage>();
    }
}