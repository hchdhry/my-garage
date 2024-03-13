using API.Data;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API;

public class CarRepository:ICarRepository
{
    private readonly ApplicationDBContext _dbcontext;
    
    private readonly IANCService _ANCService;
    public CarRepository(ApplicationDBContext applicationDBContext,IANCService aNCService)
    {
        _dbcontext = applicationDBContext;
        _ANCService = aNCService;
    }

    public async Task<Car> CreateCar(string model)
    {
        var car = await _ANCService.GetCarByModel(model);
        if (car == null)
        {
            return null;
        }
        return car;
        
    }
}
