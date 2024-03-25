using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("Garage")]
public class Garage
{
    public int UserId {get;set;}
    public int CarId {get;set}
    public Car Car {get;set;}
    public User User; {get;set;}


}
