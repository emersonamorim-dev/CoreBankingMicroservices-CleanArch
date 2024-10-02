namespace transfer_microservice.Domain.Services
{
    public interface IMessageQueueService
    {
        Task PublishMessageAsync(string queueName, object message);
    }
}
