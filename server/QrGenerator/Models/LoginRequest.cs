namespace QrGenerator.Models;

public class LoginRequest
{
    public required string Email { get; set; }
    public string? Name { get; set; }
    public string? ImageUrl { get; set; }
}
