using QrGenerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QrGenerator.Repositories;

namespace QrGenerator.Repositories;

public class UserRepository : IUserRepository
{
    private readonly QrContext _userContext;

    public UserRepository(QrContext context)
    {
        _userContext = context;
    }

    public async Task<User> Create(User user)
    {
        var createUser = _userContext.User.Add(user);
        await _userContext.SaveChangesAsync();
        return createUser.Entity;
    }

    public async Task<ActionResult<User>> GetOne(string id)
    {
        return await _userContext.User.FirstOrDefaultAsync(user => user.Id == id);
    }
    
}