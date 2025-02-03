using QrGenerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QRCoder;

namespace QrGenerator.Repositories;

public class QrCodeRepository : IQrCodeRepository
{
    private readonly QrContext _qrCodeContext;
    private readonly QRCodeGenerator _qrGenerator;

    public QrCodeRepository(QrContext qrCodeContext)
    {
        _qrCodeContext = qrCodeContext;
        _qrGenerator = new QRCodeGenerator();
    }

    public async Task<ActionResult<IEnumerable<QrCode>>> GetAllByUser(string userId)
    {
        var qrCodes = await _qrCodeContext.QrCode
            .Where(qr => qr.UserId == userId)
            .ToListAsync();
        return new ActionResult<IEnumerable<QrCode>>(qrCodes);
    }

    public async Task<QrCode?> GetById(string id)
    {
        return await _qrCodeContext.QrCode.FirstOrDefaultAsync(qrCode => qrCode.Id == id);
    }

    public async Task<QrCode> Create(QrCode qrCode)
    {
        var addQrCode = _qrCodeContext.QrCode.Add(qrCode);
        await _qrCodeContext.SaveChangesAsync();
        return addQrCode.Entity;
    }

    public async Task<bool> Delete(string id)
    {
        var qrCode = await _qrCodeContext.QrCode.FindAsync(id);

        if (qrCode == null)
        {
            return false;
        }

        _qrCodeContext.QrCode.Remove(qrCode);
        await _qrCodeContext.SaveChangesAsync();
        return true;
    }

    public byte[] GenerateQrCode(string url)
    {
        QRCodeData qrCodeData = _qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
        var qrCode = new PngByteQRCode(qrCodeData);
        return qrCode.GetGraphic(20);
    }
}