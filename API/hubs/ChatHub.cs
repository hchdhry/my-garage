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
}