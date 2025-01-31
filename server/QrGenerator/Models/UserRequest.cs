namespace QrGenerator.Models;
public class UserRequest
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Email {get; set;}
    public string? ImageUrl {get; set;}
}