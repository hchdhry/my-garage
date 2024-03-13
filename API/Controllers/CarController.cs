using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // or [Route("api/car")]
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _carRepo;

        public CarController(ICarRepository carRepository)
        {
            _carRepo = carRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCar([FromQuery] string model)
        {
            var car = await _carRepo.CreateCar(model);
            if (car == null)
                return BadRequest("Not found");

            return Ok(car);
        }
    }
}