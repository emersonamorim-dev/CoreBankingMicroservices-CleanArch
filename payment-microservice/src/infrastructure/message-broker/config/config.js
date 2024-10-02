const amqp = require('amqplib');

class RabbitMQConfig {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  // Conecta ao RabbitMQ e configurar as exchanges e filas
  async connectAndConfigure() {
    try {
      // Estabelece a conexão com o RabbitMQ
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();

      // Configura exchange para os pagamentos
      const paymentExchange = 'payments_exchange';
      await this.channel.assertExchange(paymentExchange, 'direct', {
        durable: true,
      });

      // Configura fila para processar pagamentos
      const paymentQueue = 'payments_queue';
      await this.channel.assertQueue(paymentQueue, {
        durable: true,
      });

      // Vincula a fila à exchange para pagamentos
      await this.channel.bindQueue(paymentQueue, paymentExchange, 'process_payment');

      // Configura fila para atualização de status de pagamento
      const paymentStatusQueue = 'payment_status_queue';
      await this.channel.assertQueue(paymentStatusQueue, {
        durable: true,
      });

      // Vincula a fila à exchange para atualizações de status de pagamento
      await this.channel.bindQueue(paymentStatusQueue, paymentExchange, 'update_payment_status');

      console.log('Configuração do RabbitMQ concluída');
    } catch (error) {
      console.error('Erro de configuração do RabbitMQ:', error);
      throw error;
    }
  }

  // Envia uma mensagem para uma fila específica
  async sendToQueue(queue, message) {
    try {
      if (!this.channel) {
        await this.connectAndConfigure();
      }
      this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      console.log(`Mensagem enviada para queue ${queue}:`, message);
    } catch (error) {
      console.error('Erro ao enviar mensagem para queue:', error);
      throw error;
    }
  }

  // Publica uma mensagem em uma exchange
  async publishToExchange(exchange, routingKey, message) {
    try {
      if (!this.channel) {
        await this.connectAndConfigure();
      }
      this.channel.publish(exchange, routingKey, Buffer.from(message), { persistent: true });
      console.log(`Mensagem publicada para troca ${exchange} com routingKey ${routingKey}:`, message);
    } catch (error) {
      console.error('Erro ao publicar mensagem para exchange:', error);
      throw error;
    }
  }

  // Consume mensagens de uma fila
  async consumeFromQueue(queue, onMessage) {
    try {
      if (!this.channel) {
        await this.connectAndConfigure();
      }
      await this.channel.consume(queue, (message) => {
        if (message !== null) {
          console.log(`Mensagem recebida de queue ${queue}:`, message.content.toString());
          onMessage(message.content.toString());
          this.channel.ack(message);
        }
      });
    } catch (error) {
      console.error('Erro ao consumir mensagem de queue:', error);
      throw error;
    }
  }
}

module.exports = new RabbitMQConfig();
