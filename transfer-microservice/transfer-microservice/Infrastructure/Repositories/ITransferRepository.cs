using transfer_microservice.Domain.Entities;

namespace transfer_microservice.Infrastructure.Repositories
{
    public interface ITransferRepository
    {
        Task AddAsync(Transfer transfer);
        Task<IEnumerable<Transfer>> GetAllTransfersAsync();
    }
}
