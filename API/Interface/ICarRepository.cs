using API.Models;

namespace API;

public interface ICarRepository
{
    Task<Car> CreateCar(string model);

}
