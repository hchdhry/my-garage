using API.Data;
using API.Interface;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class GarageRepository : IGarageRepository
{
    ApplicationDBContext _dbcontext;
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

    public async Task<List<Garage>> GetAllGarage(User user)
    {
        var ListOfGarages = await _dbcontext.Garage.Where(u => u.UserId == user.Id).ToListAsync();
        return ListOfGarages;
    }
}
