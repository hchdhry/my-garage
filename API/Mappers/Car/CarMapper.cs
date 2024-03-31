using API.DTO;

namespace API.Mappers.Car
{
    public class CarMapper
    {
        public static CarDTO MapCarToCarDTO(API.Models.Car car)
        {
            return new CarDTO
            {
                Make = car.Make,
                Model = car.Model,
                Year = car.Year
            };
        }
    }
}
