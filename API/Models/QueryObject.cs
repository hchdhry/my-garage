namespace API.Models;


public class QueryObject
{
  
 public string? MakeQuery {get ; set;} = string.Empty;

    public bool AscendingByYear {get ; set;} = true;
    public int PageSize{get;set;} = 20;
    public int PageNumber{get;set;} = 1;

}
