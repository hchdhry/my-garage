using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using Npgsql.Replication;

namespace API.Extensions{

public static class ClaimsExtensions
{
    public static string getUserName(this ClaimsPrincipal user)
    {
        return user.Claims.SingleOrDefault(x=> x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname")).Value;
    }
}
}