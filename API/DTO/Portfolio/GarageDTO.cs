namespace API.DTO;
public class GarageDTO
{
    public string username{get; set;} = string.Empty;
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;// Vehicle model (e.g. a4 or corolla)

    public int? Year { get; set; }

}