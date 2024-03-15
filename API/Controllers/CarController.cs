using API.DTO;
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
        public async Task<IActionResult> CreateCar([FromQuery] string model)
        {
            var car = await _carRepo.CreateCar(model);
            if (car == null)
                {return BadRequest("car does not exist");}

            return Ok(car);
        }




        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteCar([FromRoute] int id)
        {
            var DeletedCar =await  _carRepo.DeleteCar(id);
            if(DeletedCar == null)
            {
                return BadRequest("car not found");
            }
            return NoContent();

        }
        [HttpPut]
        [Route("{id:int}")]

        public async Task<IActionResult> Update([FromRoute]int id,[FromBody]UpdateCarDto car)
        {
          var carToUpdate =  await _carRepo.UpdateCar(id,car);
          if (carToUpdate == null)
          {
              return BadRequest("car not found");
          }
            return Ok(carToUpdate);

        }
    }
}