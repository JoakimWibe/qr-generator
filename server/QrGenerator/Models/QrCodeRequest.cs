namespace QrGenerator.Models;
public class QRrCodeRequest
{
    public required string Url { get; set; }
    public required string Title {get; set;}
    public required string UserId {get; set;}
}