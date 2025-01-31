using QrGenerator.Models;
using Microsoft.AspNetCore.Mvc;

namespace QrGenerator.Repositories;

public interface IUserRepository
{
    Task<User> Create(User user);
    
    Task<ActionResult<User>> GetOne(string id);
}