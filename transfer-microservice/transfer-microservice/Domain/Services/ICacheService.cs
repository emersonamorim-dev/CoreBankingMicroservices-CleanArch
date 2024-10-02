namespace transfer_microservice.Domain.Services
{
    public interface ICacheService
    {
        Task SetCacheAsync<T>(string key, T value, TimeSpan expiration);
        Task<T> GetCacheAsync<T>(string key);
    }
}
