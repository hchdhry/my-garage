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
    public async Task LeaveChat(UserConnection userConnection)
    {
        try
        {
            UserConnection existingConnections = await _db.UserConnections.FirstOrDefaultAsync(u=>u.Car == userConnection.Car&& u.userName == userConnection.userName);
            await Clients.Group(userConnection.Car).SendAsync("ReceivedMessage", "admin", $"{userConnection.userName} has left the group");
            if(existingConnections != null)
            {
                _db.Remove(existingConnections);
                await _db.SaveChangesAsync();
            }
            Console.WriteLine("you are not in this group");
          
            
        }
        catch(Exception e)
        {
            Console.WriteLine(e);
        }

    }

    public async Task JoinSpecificGroup(UserConnection userConnection)
    {
        try
        {
            Console.WriteLine($"Attempting to join group for user: {userConnection.userName}, Car: {userConnection.Car}");

            var existingConnection = await _db.UserConnections
                .FirstOrDefaultAsync(uc => uc.Car == userConnection.Car && uc.userName == userConnection.userName);

            if (existingConnection == null)
            {
                userConnection.ConnectionId = Context.ConnectionId;
                await _db.UserConnections.AddAsync(userConnection);
                await _db.SaveChangesAsync();
                Console.WriteLine("User connection added to shared DB");
            }
            else
            {
                Console.WriteLine("User connection already exists in DB");
                existingConnection.ConnectionId = Context.ConnectionId;
                await _db.SaveChangesAsync();
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Car);
            Console.WriteLine($"User added to SignalR group: {userConnection.Car}");

            await Clients.Group(userConnection.Car).SendAsync("ReceivedMessage", "admin", $"{userConnection.userName} has joined {userConnection.Car}");
            Console.WriteLine("Join message sent to group");
        }
        catch (DbUpdateException dbEx)
        {
            Console.Error.WriteLine($"Database error in JoinSpecificGroup: {dbEx.Message}");
            Console.Error.WriteLine($"Inner exception: {dbEx.InnerException?.Message}");
            Console.Error.WriteLine($"Stack trace: {dbEx.StackTrace}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while updating the database");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in JoinSpecificGroup: {ex.Message}");
            Console.Error.WriteLine($"Stack trace: {ex.StackTrace}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while joining the group");
        }
    }

    public async Task SendMessage(UserConnection userConnection, string message)
    {
        try
        {
            var existingConnection = await _db.UserConnections
                .FirstOrDefaultAsync(u => u.Car == userConnection.Car && u.userName == userConnection.userName);

            if (existingConnection != null)
            {
                if (existingConnection.ConnectionId != Context.ConnectionId)
                {
                    existingConnection.ConnectionId = Context.ConnectionId;
                    await _db.SaveChangesAsync();
                }

                await Clients.Group(userConnection.Car).SendAsync("ReceivedMessage", userConnection.userName, message);
                Console.WriteLine($"Message sent in group {userConnection.Car} by user {userConnection.userName}");
            }
            else
            {
                Console.WriteLine($"User {userConnection.userName} not found in chat room {userConnection.Car}. Attempting to rejoin.");
                await JoinSpecificGroup(userConnection);
                await Clients.Group(userConnection.Car).SendAsync("ReceivedMessage", userConnection.userName, message);
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error in SendMessage: {ex.Message}");
            Console.Error.WriteLine($"Stack trace: {ex.StackTrace}");
            await Clients.Caller.SendAsync("ErrorMessage", "An error occurred while sending the message. Please try rejoining the chat.");
        }
    }
}