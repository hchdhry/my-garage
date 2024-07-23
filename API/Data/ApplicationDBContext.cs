using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Data{

public class ApplicationDBContext:IdentityDbContext<User>
{
    public ApplicationDBContext(DbContextOptions dbContextOptions):base(dbContextOptions)
    {
        
    }

public DbSet<Car> Car {get ; set ;}
public DbSet<UserConnection> userConnections {get;set;}
public DbSet<Comment> Comment {get ; set ;}
public DbSet<Garage> Garage {get;set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Garage>(x => x.HasKey(p=> new{p.CarId,p.UserId}));

            builder.Entity<Garage>().HasOne(p=>p.User)
            .WithMany(p => p.Garage)
            .HasForeignKey(p=>p.UserId);

            builder.Entity<Garage>().HasOne(p => p.Car)
           .WithMany(p => p.Garage)
           .HasForeignKey(p => p.CarId);

            List<IdentityRole> roles = new List<IdentityRole>    {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}