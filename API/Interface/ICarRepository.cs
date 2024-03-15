using API.DTO;
using API.Models;

namespace API;

public interface ICarRepository
{
    Task<Car> CreateCar(string model);

    Task<Car> DeleteCar(int id);

    Task<Car> UpdateCar (int id, UpdateCarDto car);

}
