namespace QrGenerator.Models;
public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string Email {get; set;}
    public string? ImageUrl {get; set;}
}