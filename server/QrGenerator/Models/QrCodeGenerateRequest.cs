namespace QrGenerator.Models;
using System.ComponentModel.DataAnnotations;

public class QrCodeGenerateRequest
{
    [Required]
    public required string Url { get; set; }
}