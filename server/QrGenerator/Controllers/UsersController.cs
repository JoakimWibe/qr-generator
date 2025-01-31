using Microsoft.AspNetCore.Mvc;
using QrGenerator.Models;
using QrGenerator.Repositories;

namespace epjctrip_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;


        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{id}")]
        public Task<ActionResult<User>> GetUser(string id)
        {
            var user = _userRepository.GetOne(id).Result.Value;

            return user == null
                ? Task.FromResult<ActionResult<User>>(NotFound())
                : Task.FromResult<ActionResult<User>>(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create(UserRequest request)
        {
            var newUser = await _userRepository.Create(new User
            {
                Name = request.Name,
                Email = request.Email,
                Id = request.Id,
                ImageUrl = request.ImageUrl
            });

            var actionName = nameof(GetUser);
            var routeValue = new { id = newUser.Id };
            return CreatedAtAction(actionName, routeValue, newUser);
        }
    }
}