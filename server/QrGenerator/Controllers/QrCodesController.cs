using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using QrGenerator.Models;
using QrGenerator.Repositories;
using System.Security.Claims;

namespace QrGenerator.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QrCodesController : ControllerBase
    {
        private readonly IQrCodeRepository _qrCodeRepository;

        public QrCodesController(IQrCodeRepository qrCodeRepository)
        {
            _qrCodeRepository = qrCodeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<QrCode>>> GetMyQrCodes()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            return await _qrCodeRepository.GetAllByUser(userId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QrCode>> GetQrCode(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var qrCode = await _qrCodeRepository.GetById(id);

            if (qrCode == null)
            {
                return NotFound();
            }

            if (qrCode.UserId != userId)
            {
                return Forbid();
            }

            return qrCode;
        }

        [HttpPost]
        public async Task<ActionResult<QrCode>> CreateQrCode([FromBody] QrCodeRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var qrCode = new QrCode
            {
                Title = request.Title,
                Url = request.Url,
                UserId = userId
            };

            var createdQrCode = await _qrCodeRepository.Create(qrCode);
            
            return CreatedAtAction(
                nameof(GetQrCode),
                new { id = createdQrCode.Id },
                createdQrCode
            );
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQrCode(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var qrCode = await _qrCodeRepository.GetById(id);

            if (qrCode == null)
            {
                return NotFound();
            }

            if (qrCode.UserId != userId)
            {
                return Forbid();
            }

            var deleted = await _qrCodeRepository.Delete(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
