using Microsoft.AspNetCore.Mvc;
using QrGenerator.Models;

namespace QrGenerator.Repositories;

public interface IQrCodeRepository
{
    Task<ActionResult<IEnumerable<QrCode>>> GetAllByUser(string userId);
    Task<QrCode?> GetById(string id);
    Task<QrCode> Create(QrCode qrCode);
    Task<bool> Delete(string id);
    byte[] GenerateQrCode(string url);
}