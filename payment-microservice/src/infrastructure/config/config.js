const amqp = require('amqplib');

class RabbitMQConfig {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.exchange = process.env.RABBITMQ_EXCHANGE || 'payments_exchange';
    this.url = process.env.RABBITMQ_URL || 'amqp://localhost';
  }

  // Conecta ao RabbitMQ e cria um canal
  async connect() {
    if (!this.connection) {
      try {
        this.connection = await amqp.connect(this.url);
        this.channel = await this.connection.createChannel();
        console.log('Conectado ao RabbitMQ');
      } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
        throw error;
      }
    }
  }

  // Publica uma mensagem em um exchange e chave de roteamento específicos
  async publishToExchange(exchange, routingKey, message) {
    try {
      await this.connect(); 
      await this.channel.assertExchange(exchange, 'direct', { durable: true });
      this.channel.publish(exchange, routingKey, Buffer.from(message), {
        persistent: true,
      });
      console.log(`Mensagem publicada em ${exchange} com chave ${routingKey}`);
    } catch (error) {
      console.error('Erro ao publicar mensagem no RabbitMQ:', error);
      throw error;
    }
  }

  // Fecha a conexão com o RabbitMQ
  async close() {
    if (this.connection) {
      await this.channel.close();
      await this.connection.close();
      this.connection = null;
      this.channel = null;
      console.log('Conexão com RabbitMQ fechada');
    }
  }
}

module.exports = new RabbitMQConfig();
