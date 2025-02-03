using QrGenerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    public async Task<ActionResult<User>> GetOne(string email)
    {
        var user = await _userContext.User.FirstOrDefaultAsync(user => user.Email == email);
        return user is null ? new NotFoundResult() : new ActionResult<User>(user);
    }

    public async Task<User> Update(User user)
    {
        _userContext.User.Update(user);
        await _userContext.SaveChangesAsync();
        return user;
    }
}