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
}