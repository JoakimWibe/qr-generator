namespace QrGenerator.Models;

public class AuthResponse
{
    public required string Token { get; set; }
    public required User User { get; set; }
}
