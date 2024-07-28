using API.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Hubs;

public class ChatHub : Hub
{
    private readonly ApplicationDBContext _db;

    public ChatHub(ApplicationDBContext dBContext)
    {
        _db = dBContext;
    }

    public async Task JoinChat(UserConnection userConnection)
    {
        await Clients.All.SendAsync("ReceivedMessage", $"{userConnection.Car} has joined", "Hi!");
    }

    public async Task JoinSpecificGroup(UserConnection userConnection)
    {
        try
        {
            Console.WriteLine($"Attempting to join group for user: {userConnection.Car}, ChatRoom: {userConnection.Car}");

            _db.UserConnections.Add(userConnection);
            await _db.SaveChangesAsync();
            Console.WriteLine("User connection added to shared DB");

            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Car);
            Console.WriteLine($"User added to group: {userConnection.Car}");

            await Clients.Group(userConnection.Car).SendAsync("ReceivedMessage", "admin", $"{userConnection.Car} has joined");
            Console.WriteLine("Join message sent to group");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in JoinSpecificGroup: {ex.Message}");
            Console.Error.WriteLine($"Stack trace: {ex.StackTrace}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while joining the group");
            throw;
        }
    }

    public async Task SendMessage(UserConnection userConnection, string message)
    {
        if (await _db.UserConnections.AnyAsync(u => u.Car == userConnection.Car && u.userName == userConnection.userName))
        {
            await Clients.Group(userConnection.Car).SendAsync("ReceivedMessage", userConnection.userName, message);
        }
        else
        {
            await Clients.Caller.SendAsync("ErrorMessage", "You are not in this chat room");
        }
    }
}

