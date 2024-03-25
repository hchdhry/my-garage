using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

[Table("Garage")]
public class Garage
{
    public string UserId {get;set;}
    public int CarId {get;set;}
    public Car Car {get;set;}
    public User User {get;set;}


}
