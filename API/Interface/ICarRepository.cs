using API.Models;

namespace API;

public interface ICarRepository
{
    Task<Car> CreateCar(string model);

    Task<Car> DeleteCar(int id);

}
