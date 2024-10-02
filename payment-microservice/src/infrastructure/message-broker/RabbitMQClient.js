const amqp = require('amqplib');

class RabbitMQConfig {
  constructor() {
    this.url = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
  }

  async connect() {
    try {
      console.log(`Conectando ao RabbitMQ at ${this.url}...`);
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();

      this.connection.on('close', () => {
        console.warn('Conexão RabbitMQ fechada. Tentando reconectar...');
        setTimeout(() => this.connect(), 5000);
      });

      console.log('Conectando ao RabbitMQ.');
    } catch (error) {
      console.error('RabbitMQ erro de conexão:', error);
      throw new Error('Falha ao conectar a RabbitMQ');
    }
  }

  async publishToExchange(exchange, routingKey, message) {
    try {
      if (!this.channel) {
        await this.connect();
      }
      await this.channel.assertExchange(exchange, 'direct', { durable: true });
      this.channel.publish(exchange, routingKey, Buffer.from(message));
      console.log(`Mensagem publicada para troca ${exchange} com routing key ${routingKey}`);
    } catch (error) {
      console.error('Erro ao publicar mensagem para exchange:', error);
      throw error;
    }
  }

  async closeConnection() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log('RabbitMQ conexão fechada.');
    } catch (error) {
      console.error('Erro ao fechar a conexão RabbitMQ:', error);
    }
  }
}

module.exports = new RabbitMQConfig();
