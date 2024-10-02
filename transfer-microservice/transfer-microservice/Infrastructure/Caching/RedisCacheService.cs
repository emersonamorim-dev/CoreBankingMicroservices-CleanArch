using StackExchange.Redis;
using Newtonsoft.Json;
using transfer_microservice.Domain.Services;

namespace transfer_microservice.Infrastructure.Caching
{
    public class RedisCacheService : ICacheService
    {
        private readonly IDatabase _database;

        public RedisCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task SetCacheAsync<T>(string key, T value, TimeSpan expiration)
        {
            var serializedValue = JsonConvert.SerializeObject(value);
            await _database.StringSetAsync(key, serializedValue, expiration);
        }

        public async Task<T> GetCacheAsync<T>(string key)
        {
            var cachedData = await _database.StringGetAsync(key);
            if (!cachedData.IsNullOrEmpty)
            {
                return JsonConvert.DeserializeObject<T>(cachedData);
            }

            return default;
        }
    }
}
