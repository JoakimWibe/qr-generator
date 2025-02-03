using Microsoft.AspNetCore.Mvc;
using QrGenerator.Models;

namespace QrGenerator.Repositories;

public interface IUserRepository
{
    Task<User> Create(User user);
    Task<ActionResult<User>> GetOne(string email);
    Task<User> Update(User user);
}