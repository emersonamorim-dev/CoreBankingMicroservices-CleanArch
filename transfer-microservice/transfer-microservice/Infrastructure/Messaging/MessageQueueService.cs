using RabbitMQ.Client;
using System.Text;
using Newtonsoft.Json;
using transfer_microservice.Domain.Services;

namespace transfer_microservice.Infrastructure.Messaging
{
    public class MessageQueueService : IMessageQueueService
    {
        private readonly IModel _channel;

        public MessageQueueService(IModel channel)
        {
            _channel = channel;

            // Declara a exchange do tipo Direct para transferências
            _channel.ExchangeDeclare(exchange: "transfer_direct", type: ExchangeType.Direct);
        }

        public async Task PublishMessageAsync(string queueName, object message)
        {
            var messageBody = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

            // Publica a mensagem na fila com chave de roteamento Direct
            _channel.BasicPublish(exchange: "transfer_direct", routingKey: queueName, basicProperties: null, body: messageBody);

            await Task.CompletedTask;
        }
    }
}
