using Microsoft.AspNetCore.Mvc;
using QrGenerator.Models;

namespace QrGenerator.Repositories;

public interface IQrCodeRepository
{
    byte[] GenerateQrCode(string url);
}