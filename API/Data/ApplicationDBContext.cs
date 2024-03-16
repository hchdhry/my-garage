using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data{

public class ApplicationDBContext:IdentityDbContext<User>
{
    public ApplicationDBContext(DbContextOptions dbContextOptions):base(dbContextOptions)
    {
        
    }

public DbSet<Car> Car {get ; set ;}
public DbSet<Comment> Comment {get ; set ;}
}
}