using MongoDB.Driver;
using transfer_microservice.Domain.Entities;
using transfer_microservice.Infrastructure.Data;

namespace transfer_microservice.Infrastructure.Repositories
{
    public class TransferRepository : ITransferRepository
    {
        private readonly MongoDbContext _context;

        public TransferRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Transfer transfer)
        {
            await _context.Transfers.InsertOneAsync(transfer);
        }

        public async Task<IEnumerable<Transfer>> GetAllTransfersAsync()
        {
            return await _context.Transfers.Find(_ => true).ToListAsync();
        }
    }

}