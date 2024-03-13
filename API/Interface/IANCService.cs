using API.Models;

namespace API;

public interface IANCService
{
    Task <Car> GetCarByModel(string model);

}
