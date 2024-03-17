using API.Models;

namespace API.Interface{

public interface IANCService
{
    Task <Car> GetCarByModel(string model);

}
}