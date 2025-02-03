using Microsoft.AspNetCore.Mvc;
using QrGenerator.Models;
using QrGenerator.Repositories;

namespace QrGenerator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QrGeneratorController : ControllerBase
    {
        private readonly IQrCodeRepository _qrCodeRepository;

        public QrGeneratorController(IQrCodeRepository qrCodeRepository)
        {
            _qrCodeRepository = qrCodeRepository;
        }

        [HttpPost]
        public ActionResult<byte[]> Generate([FromBody] QrCodeGenerateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Url))
            {
                return BadRequest("URL is required");
            }

            var qrCodeImage = _qrCodeRepository.GenerateQrCode(request.Url);
            return File(qrCodeImage, "image/png");
        }
    }
}
