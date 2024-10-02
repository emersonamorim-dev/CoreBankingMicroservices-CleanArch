const Payment = require('../../domain/entities/Payment');

class ProcessPayment {
  constructor(paymentRepository, redisClient, rabbitMQConfig) {
    this.paymentRepository = paymentRepository;
    this.redisClient = redisClient;
    this.rabbitMQConfig = rabbitMQConfig;
  }

  async execute(paymentData) {
    try {
      const payment = new Payment(paymentData);
      payment.validate(); 

      // Salva o pagamento no banco de dados
      const savedPayment = await this.paymentRepository.save(payment);
      if (!savedPayment.id) {
        throw new Error('Falha ao recuperar o ID do pagamento');
      }

      // Armazena pagamento no cache do Redis
      const redisKey = `payment:${savedPayment.id}`;
      await this.redisClient.set(redisKey, JSON.stringify(savedPayment), 3600);

      console.log(`Key ${redisKey} Redis com expiração de 3600 segundos`);

      // Publica mensagem no RabbitMQ
      const paymentMessage = JSON.stringify(savedPayment);
      await this.rabbitMQConfig.publishToExchange('payments_exchange', 'process_payment', paymentMessage);

      return savedPayment;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw error; 
    }
  }
}

module.exports = ProcessPayment;
