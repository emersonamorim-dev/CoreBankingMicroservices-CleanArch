using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;
using StackExchange.Redis;
using transfer_microservice.Infrastructure.Messaging;
using transfer_microservice.Infrastructure.Caching;
using transfer_microservice.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

// Configura o RabbitMQ
builder.Services.AddSingleton<IConnection>(sp =>
{
    var factory = new ConnectionFactory() { HostName = "rabbitmq" };
    return factory.CreateConnection();
});

builder.Services.AddSingleton<IModel>(sp =>
{
    var connection = sp.GetRequiredService<IConnection>();
    return connection.CreateModel();
});

builder.Services.AddSingleton<IMessageQueueService, MessageQueueService>();

// Configura o Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var redisHost = builder.Configuration.GetConnectionString("RedisHost") ?? "localhost:6379";
    return ConnectionMultiplexer.Connect(redisHost);
});

builder.Services.AddSingleton<ICacheService, RedisCacheService>();

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

// aplicação está escutando na porta correta
app.Urls.Add("http://*:80");

app.Run();
