using API.DTO;
using API.Models;

namespace API;

public interface ICarRepository
{
    Task<List<Car>> GetAllCar(QueryObject query);
    Task<Car> GetCar(int id);
    
    Task<Car> CreateCar(string model);

    Task<Car> DeleteCar(int id);

    Task<Car> UpdateCar (int id, UpdateCarDto car);

}
