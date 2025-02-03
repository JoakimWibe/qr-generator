using QrGenerator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QRCoder;

namespace QrGenerator.Repositories;

public class QrCodeRepository : IQrCodeRepository
{
    private readonly QRCodeGenerator _qrGenerator;

    public QrCodeRepository(QrContext qrCodeContext)
    {
        _qrGenerator = new QRCodeGenerator();
    }

    public byte[] GenerateQrCode(string url)
    {
        QRCodeData qrCodeData = _qrGenerator.CreateQrCode(url, QRCodeGenerator.ECCLevel.Q);
        var qrCode = new PngByteQRCode(qrCodeData);
        return qrCode.GetGraphic(20);
    }
}