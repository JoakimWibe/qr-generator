using Microsoft.AspNetCore.Mvc;
using QrGenerator.Models;
using QrGenerator.Repositories;

namespace QrGenerator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QrController : ControllerBase
    {
        private readonly IQrCodeRepository _qrCodeRepository;
        
        public QrController(IQrCodeRepository qrCodeRepository)
        {
            _qrCodeRepository = qrCodeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<QrCode>>> GetQrCodesByUser(string userId)
        {
            if (_qrCodeRepository != null)
            {
                return await _qrCodeRepository.GetAllByUser(userId);
            }

            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QrCode>> GetQrCode(string id)
        {
            var QrCodeFromDb = await _qrCodeRepository.GetById(id);
            if (QrCodeFromDb != null)
            {
                return QrCodeFromDb;
            }

            return NotFound();
        }
        

        [HttpPost]
        public async Task<ActionResult<QrCode>> CreateQrCode(QRrCodeRequest request)
        {
            var savedQrCode = await _qrCodeRepository.Create(new QrCode
            {
                Url = request.Url,
                Title = request.Title,
                UserId = request.UserId
            });
            
            var actionName = nameof(GetQrCode);
            var routeValue = new { id = savedQrCode.Id };
            return CreatedAtAction(actionName, routeValue, savedQrCode);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQrCode(string id)
        {
            _qrCodeRepository.Delete(id);
            return NoContent();
        }

         [HttpGet("generate")]
        public IActionResult GenerateQRCode([FromQuery] QrCodeGenerateRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Url))
            {
                return BadRequest("URL is required and cannot be empty.");
            }

            try
            {
                var qrCodeBytes = _qrCodeRepository.GenerateQrCode(request.Url);
                return File(qrCodeBytes, "image/png");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while generating the QR code: {ex.Message}");
            }
        }
    }
}