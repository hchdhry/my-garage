using API.Models;


namespace API.Interface;

public interface IGarageRepository
{
    Task<Garage> CreateGarage(Garage garage);

}
