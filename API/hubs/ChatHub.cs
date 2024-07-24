using API.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Hubs;
public class ChatHub:Hub
{
    private readonly ApplicationDBContext _db;
    public ChatHub(ApplicationDBContext dBContext)
    {
        _db = dBContext;
    }
   public async Task JoinChat(UserConnection userConnection)
   {
        await Clients.All.SendAsync(method:"RecievedMessage",arg1:$"{userConnection.userName} has joined",arg2:"hi!");
   }
    public async Task joinSpecificGroup(UserConnection userConnection)
    {
        try
        {
            Console.WriteLine($"Attempting to join group for user: {userConnection.userName}, ChatRoom: {userConnection.Car}");

          _db.UserConnections.Add(userConnection);
            Console.WriteLine("User connection added to shared DB");

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName: userConnection.Car);
            Console.WriteLine($"User added to group: {userConnection.Car}");

            await Clients.Group(userConnection.Car).SendAsync(method: "ReceivedMessage", arg1: "admin", arg2: $"{userConnection.userName} has joined");
            Console.WriteLine("Join message sent to group");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in joinSpecificGroup: {ex.Message}");
            Console.Error.WriteLine($"Stack trace: {ex.StackTrace}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while joining the group");
            throw;
        }
    }
}