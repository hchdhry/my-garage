using API;
using API.Data;
using API.Services;
using API.Interface;
using Microsoft.EntityFrameworkCore;
using API.Repository;
using API.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();

builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDBContext>(options =>{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddIdentity<User, IdentityRole>(Options =>
{
    Options.Password.RequireLowercase = true;
    Options.Password.RequireDigit = true;
    Options.Password.RequireNonAlphanumeric = true;
}).AddEntityFrameworkStores<ApplicationDBContext>();
builder.Services.AddScoped<ICarRepository,CarRepository>();
builder.Services.AddScoped<ICommentRepository,CommentRepository>();
builder.Services.AddScoped<ITokenService,TokenService>();
builder.Services.AddScoped<IANCService, ANCService>()
                .AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();
app.Run();


