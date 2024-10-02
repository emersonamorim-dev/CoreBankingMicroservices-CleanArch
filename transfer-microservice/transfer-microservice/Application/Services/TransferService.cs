using transfer_microservice.Application.Interfaces;
using transfer_microservice.Domain.Entities;
using transfer_microservice.Domain.Services;
using transfer_microservice.Infrastructure.Repositories;

namespace transfer_microservice.Application.Services
{
    public class TransferService : ITransferService
    {
        private readonly ITransferRepository _transferRepository;
        private readonly IMessageQueueService _messageQueueService;

        public TransferService(ITransferRepository transferRepository, IMessageQueueService messageQueueService)
        {
            _transferRepository = transferRepository;
            _messageQueueService = messageQueueService;
        }

        public async Task TransferFunds(Guid accountFrom, Guid accountTo, decimal amount)
        {
            var transfer = new Transfer
            {
                TransferId = Guid.NewGuid(),
                AccountFrom = accountFrom,
                AccountTo = accountTo,
                Amount = amount,
                TransferDate = DateTime.UtcNow
            };

            if (!transfer.IsValid())
            {
                throw new InvalidOperationException("Invalid transfer.");
            }

            await _transferRepository.AddAsync(transfer);

            // Send message to RabbitMQ
            await _messageQueueService.PublishMessageAsync("transferQueue", transfer);
        }
    }
}