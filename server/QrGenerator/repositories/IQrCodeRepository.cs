using QrGenerator.Models;
using Microsoft.AspNetCore.Mvc;

namespace QrGenerator.Repositories;

public interface IQrCodeRepository
{
    Task<ActionResult<IEnumerable<QrCode>>> GetAllByUser(string id);
    Task<QrCode> GetById(string id);
    Task<QrCode> Create(QrCode qrCode);
    void Delete(string id);
    public byte[] GenerateQrCode(string url);
}