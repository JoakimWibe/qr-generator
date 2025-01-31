namespace QrGenerator.Models;

public class QrCode
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Url { get; set; }
    public required string Title {get; set;}
    public required string UserId {get; set;}
}