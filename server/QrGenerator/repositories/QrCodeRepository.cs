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

    public async Task<ActionResult<IEnumerable<QrCode>>> GetAll()
    {
        return await _qrCodeContext.QrCode.ToListAsync();
    }

    public async Task<QrCode> GetById(string id)
    {
        return await _qrCodeContext.QrCode.FirstOrDefaultAsync(qrCode => qrCode.Id == id);
    }

    public async Task<QrCode> Create(QrCode qrCode)
    {
        var addQrCode = _qrCodeContext.QrCode.Add(qrCode);
        await _qrCodeContext.SaveChangesAsync();
        return addQrCode.Entity;
    }

    public void Delete(string id)
    {
        var qrCode = _qrCodeContext.QrCode.Find(id);

        if (qrCode == null)
        {
            return;
        }

        _qrCodeContext.QrCode.Remove(qrCode);
        _qrCodeContext.SaveChanges();
    }

    public byte[] GenerateQrCode(string url)
    {
        try
        {
            using var qrCodeData = _qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
            using var qrCode = new PngByteQRCode(qrCodeData);
            
            return qrCode.GetGraphic(20);
        }
        catch (Exception ex)
        {
            throw new Exception($"An error occurred while generating the QR code: {ex.Message}", ex);
        }
    }


}