using Microsoft.AspNetCore.Mvc;
using QrGenerator.Models;
using QRCoder;

namespace QrGenerator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QrGeneratorController : ControllerBase
    {
        private readonly QRCodeGenerator _qrGenerator;

        public QrGeneratorController()
        {
            _qrGenerator = new QRCodeGenerator();
        }

        [HttpPost]
        public ActionResult<byte[]> Generate([FromBody] QrCodeGenerateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Url))
            {
                return BadRequest("URL is required");
            }

            QRCodeData qrCodeData = _qrGenerator.CreateQrCode(request.Url, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new PngByteQRCode(qrCodeData);
            var qrCodeImage = qrCode.GetGraphic(20);
            return File(qrCodeImage, "image/png");
        }
    }
}
