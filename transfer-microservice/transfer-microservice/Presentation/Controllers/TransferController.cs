using Microsoft.AspNetCore.Mvc;
using transfer_microservice.Domain.Services;
using transfer_microservice.Domain.Entities;

namespace transfer_microservice.Controllers
{
    [ApiController]
    [Route("api/transfer")]
    public class TransferController : ControllerBase
    {
        private readonly IMessageQueueService _messageQueueService;
        private readonly ICacheService _cacheService;

        public TransferController(IMessageQueueService messageQueueService, ICacheService cacheService)
        {
            _messageQueueService = messageQueueService;
            _cacheService = cacheService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransfer([FromBody] Transfer transfer)
        {
            if (!transfer.IsValid())
            {
                return BadRequest("Transferência inválida.");
            }

            // Publica a transferência na fila Direct Exchange do RabbitMQ
            await _messageQueueService.PublishMessageAsync("transfer", transfer);

            // Armazena em cache usando TransferId como chave
            await _cacheService.SetCacheAsync($"transfer_{transfer.TransferId}", transfer, TimeSpan.FromMinutes(30));

            return Ok(new { Message = "Transferência criada com sucesso", TransferId = transfer.TransferId });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransfer(Guid id)
        {
            // Verifica o cache primeiro
            var cachedTransfer = await _cacheService.GetCacheAsync<Transfer>($"transfer_{id}");
            if (cachedTransfer != null)
            {
                return Ok(cachedTransfer);
            }
            
            return NotFound("Transferência não encontrada.");
        }
    }
}
