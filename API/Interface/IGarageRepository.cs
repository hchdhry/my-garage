using API.Models;


namespace API.Interface;

public interface IGarageRepository
{
    Task<List<Garage>> GetAllGarage(User user);
    Task<Garage> CreateGarage(Garage garage);

   

}
