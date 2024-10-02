using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;

namespace transfer_microservice.Infrastructure.Config
{
    public static class RabbitMQConfig
    {
        public static void AddRabbitMQ(this IServiceCollection services, IConfiguration configuration)
        {
            var factory = new ConnectionFactory
            {
                HostName = configuration["RabbitMQ:HostName"] ?? "localhost",
                UserName = configuration["RabbitMQ:UserName"] ?? "guest",
                Password = configuration["RabbitMQ:Password"] ?? "guest",
                VirtualHost = configuration["RabbitMQ:VirtualHost"] ?? "/"
            };

            services.AddSingleton(factory);
            services.AddSingleton<IConnection>(sp => factory.CreateConnection());
            services.AddSingleton<IModel>(sp => sp.GetRequiredService<IConnection>().CreateModel());
        }
    }
}
