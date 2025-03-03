﻿using API.DTO;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _carRepo;

        public CarController(ICarRepository carRepository)
        {
            _carRepo = carRepository;
        }

        [HttpPost]
        [Authorize]
        
        public async Task<IActionResult> CreateCar([FromBody] string model)
        {
            var car = await _carRepo.CreateCar(model);
            if (car == null)
            {return BadRequest("something went wrong");}

            return Ok(car);
        }

        [HttpGet]
        
        public async Task<IActionResult> GetAllCars([FromQuery]QueryObject query)
        {
            int skipnumber = (query.PageNumber - 1) * query.PageSize;
            var cars = await _carRepo.GetAllCar(query);
            var listOfCars = cars.Select(car => new CarDTO
            {   
                Model = car.Model,
                Make = car.Make,
                Year = car.Year
            }).ToList();
            if (cars == null)
            {
                return BadRequest("no cars found");
            }
       
   
            return Ok(listOfCars.Skip(skipnumber).Take(query.PageSize));
        }

        [HttpGet("full")]
        public async Task<IActionResult> GetFullCars ([FromQuery] QueryObject query)
        {
            int skipnumber = (query.PageNumber - 1) * query.PageSize;
            var cars = await _carRepo.GetAllCar(query);
            if (cars.IsNullOrEmpty())
            {
                return BadRequest("no cars found");
            }
            return Ok(cars.Skip(skipnumber).Take(query.PageSize));
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