using API.Data;
using API.DTO;
using API.Models;
using API.Interface;
using API.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
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

    public Task<bool> CarExistAsync(string Model)
    {
        return  _dbcontext.Car.AnyAsync(c =>c.Model.ToLower() == Model.ToLower());
    }

    public async Task<Car> CreateCar(string model)
    {
        var car = await _ANCService.GetCarByModel(model);
        if (car == null)
        {
            return null;
        }
        if (await CarExistAsync(model))
        {
            return null;
        }
        await _dbcontext.AddAsync(car);
        await _dbcontext.SaveChangesAsync();

        return car;
        
    }

    public async Task<Car> DeleteCar(int id)
    {
        var car = await  _dbcontext.Car.FirstOrDefaultAsync(u => u.Id == id);
        if (car == null)
        {
            return null;
        }
       _dbcontext.Car.Remove(car);
       await _dbcontext.SaveChangesAsync();
       return car;
    }

    public async Task<Car> UpdateCar(int id, UpdateCarDto car)
    {
   
        var carToUpdate = await _dbcontext.Car.FirstOrDefaultAsync(c => c.Id == id);
       if(carToUpdate == null)
       {
        return null;
        }

        carToUpdate.Year = car.Year;
        carToUpdate.Model = car.Model;
        carToUpdate.Make = car.Make;
        carToUpdate.MaxCityMpg = car.MaxCityMpg;
        carToUpdate.MinCityMpg = car.MinCityMpg;
        carToUpdate.Cylinders = car.Cylinders;
        carToUpdate.Drive = car.Drive;
        carToUpdate.MinHwyMpg = car.MinHwyMpg;
        carToUpdate.MaxHwyMpg = car.MaxHwyMpg;
        carToUpdate.MinCombMpg = car.MinCombMpg;
        carToUpdate.MaxCombMpg = car.MaxCombMpg;
        carToUpdate.FuelType = car.FuelType;
        carToUpdate.Transmission = car.Transmission;
        carToUpdate.Limit = car.Limit;
        await _dbcontext.SaveChangesAsync();
        return carToUpdate;
    }
}
