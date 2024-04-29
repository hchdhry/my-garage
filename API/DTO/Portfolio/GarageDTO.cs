namespace API.DTO;
public class GarageDTO
{
    public string username{get; set;} = string.Empty;
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int? CarId { get; set; } 
    public int? Year { get; set; }

}