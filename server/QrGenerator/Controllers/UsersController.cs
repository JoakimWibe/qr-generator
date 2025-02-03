using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using QrGenerator.Models;
using QrGenerator.Repositories;
using QrGenerator.Services;

namespace QrGenerator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public UsersController(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Email is required");
            }

            var user = (await _userRepository.GetOne(request.Email)).Value;
            
            if (user == null)
            {
                user = await _userRepository.Create(new User
                {
                    Name = request.Name ?? request.Email,
                    Email = request.Email,
                    ImageUrl = request.ImageUrl
                });
            }

            var token = _tokenService.GenerateToken(user);

            return Ok(new AuthResponse
            {
                Token = token,
                User = user
            });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized();
            }

            var user = (await _userRepository.GetOne(email)).Value;
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize]
        [HttpPut("me")]
        public async Task<ActionResult<User>> UpdateCurrentUser(UserRequest request)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized();
            }

            var user = (await _userRepository.GetOne(email)).Value;
            if (user == null)
            {
                return NotFound();
            }
            
            user.Name = request.Name;
            user.ImageUrl = request.ImageUrl;

            var updatedUser = await _userRepository.Update(user);
            return Ok(updatedUser);
        }
    }
}