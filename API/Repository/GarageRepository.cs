using API.Data;
using API.Interface;
using API.Models;

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
}
