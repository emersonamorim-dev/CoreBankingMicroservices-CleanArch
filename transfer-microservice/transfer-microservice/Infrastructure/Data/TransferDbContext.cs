using MongoDB.Driver;
using transfer_microservice.Domain.Entities;

namespace transfer_microservice.Infrastructure.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            // Recuperando a string de conexão do MongoDB do arquivo de configuração
            var client = new MongoClient(configuration["ConnectionStrings:MongoDb"]);
            _database = client.GetDatabase("TransferDb");
        }

        public IMongoCollection<Transfer> Transfers => _database.GetCollection<Transfer>("Transfers");
    }
}
