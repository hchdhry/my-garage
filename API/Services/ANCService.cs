using API.Models;
using API.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;

namespace API.Services
{

    public class ANCService : IANCService
    {
        private readonly HttpClient _httpClient;
        public ANCService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<Car> GetCarByModel(string model)
        {
            try
            {
                string URL = $"https://api.api-ninjas.com/v1/cars?model={model}";
                Console.WriteLine("Request URL: " + URL);
                _httpClient.DefaultRequestHeaders.Add("X-Api-Key", "CzJFBLoKMuLRxAYNoItOYw==zTFW6smxK8F0CsKC");
                var result = await _httpClient.GetAsync(URL);
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var carData = JsonConvert.DeserializeObject<Car[]>(content);
                    var car = carData[0];
                    return car;

                }
                return null;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
    }
}