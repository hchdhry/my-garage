using API.Data;
using API.DTO;
using API.Interface;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class GarageRepository : IGarageRepository
{
    private readonly ApplicationDBContext _dbcontext;
    public GarageRepository(ApplicationDBContext DBContext)
    {
        _dbcontext = DBContext;
    }
    public async Task<Garage> CreateGarage(Garage garage)
    {
        await _dbcontext.Garage.AddAsync(garage);
        await _dbcontext.SaveChangesAsync();
        return garage;
    }

    public async Task<Garage> DeleteGarge(Garage garage)
    {
      _dbcontext.Remove(garage);
      await _dbcontext.SaveChangesAsync();
      return garage;
    }

    public async Task<List<GarageDTO>> GetAllGarage(User user)
    {
        var ListOfGarages = await _dbcontext.Garage.Where(u => u.UserId == user.Id).Select(Car => new GarageDTO{
          username = Car.UserId,
          Make = Car.Car.Make,
          Model = Car.Car.Model,
          Year = Car.Car.Year,
          CarId = Car.CarId
            

        }).ToListAsync();
        return ListOfGarages;
    }

   
}
