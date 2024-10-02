using transfer_microservice.Domain.Entities;

namespace transfer_microservice.Application.Interfaces
{
    public interface ITransferService
    {
        Task TransferFunds(Guid accountFrom, Guid accountTo, decimal amount);
    }
}