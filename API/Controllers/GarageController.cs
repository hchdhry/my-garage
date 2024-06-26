﻿using API.Models;
using API.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using API.Interface;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Garage")]
    public class GarageController : ControllerBase
    {
        private readonly IGarageRepository _garageRepository;
        private readonly UserManager<User> _userManager;
        private readonly ICarRepository _carRepository;

        public GarageController(IGarageRepository garageRepository, UserManager<User> userManager, ICarRepository carRepository)
        {
            _garageRepository = garageRepository;
            _userManager = userManager;
            _carRepository = carRepository;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateGarage([FromBody]int carId)
        {
            var username = HttpContext.User.getUserName();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
                return NotFound("User not found");

            var car = await _carRepository.GetCar(carId);
            if (car == null)
                return NotFound("Car not found");
         

            var newGarage = new Garage
            {
                CarId = car.Id,
                UserId = appUser.Id
            };
            await _garageRepository.CreateGarage(newGarage);
           

            return Ok(newGarage); 
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> getUserGarage()
        {   
            var username = User.getUserName();
            var appUser = await _userManager.FindByNameAsync(username);

            var userGarage = await _garageRepository.GetAllGarage(appUser);

            if (userGarage == null)return NotFound();

            return Ok(userGarage);

        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteGarage([FromRoute]int id)
        {
            var username = User.getUserName();
            var appUser =await  _userManager.FindByNameAsync(username);
            

            Garage DeleteModel = new Garage
            {
                UserId = appUser.Id,
                CarId = id

            };
           var DeletedGarage = await _garageRepository.DeleteGarge(DeleteModel);
           if(DeletedGarage == null) return null;

            return NoContent();

        }
    }
}
