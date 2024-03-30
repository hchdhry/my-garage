using API.DTO;
using API.Models;


namespace API.Interface;

public interface IGarageRepository
{
    Task<List<GarageDTO>> GetAllGarage(User user);
    Task<Garage> CreateGarage(Garage garage);

    Task<Garage> DeleteGarge(Garage garage);

   

}
