namespace API.DTO
{
    public class UpdateCarDto{
 
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;// Vehicle model (e.g. a4 or corolla)
        public string FuelType { get; set; } = string.Empty;// Type of fuel used. Possible values: gas, diesel, electricity
        public string Drive { get; set; } = string.Empty;// Drive transmission. Possible values: fwd (front-wheel drive), rwd (rear-wheel drive), awd (all-wheel drive), 4wd (four-wheel drive)
        public int? Cylinders { get; set; } // Number of cylinders in engine. Possible values: 2, 3, 4, 5, 6, 8, 10, 12, 16
        public string Transmission { get; set; } = string.Empty;// Type of transmission. Possible values: manual, automatic
        public int? Year { get; set; } // Vehicle model year (e.g. 2018)
        public double? MinCityMpg { get; set; } // Minimum city fuel consumption (in miles per gallon)
        public double? MaxCityMpg { get; set; } // Maximum city fuel consumption (in miles per gallon)
        public double? MinHwyMpg { get; set; } // Minimum highway fuel consumption (in miles per gallon)
        public double? MaxHwyMpg { get; set; } // Maximum highway fuel consumption (in miles per gallon)
        public double? MinCombMpg { get; set; } // Minimum combination (city and highway) fuel consumption (in miles per gallon)
        public double? MaxCombMpg { get; set; } // Maximum combination (city and highway) fuel consumption (in miles per gallon)
        public int? Limit { get; set; } // How many results to return. Must be between 1 and 50. Default is 5
    }
}