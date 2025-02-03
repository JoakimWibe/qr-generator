namespace QrGenerator.Models;

public class QrCodeRequest
{
    public required string Url { get; set; }
    public required string Title { get; set; }
}