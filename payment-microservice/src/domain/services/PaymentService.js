const redisClient = require('../../infrastructure/cache/RedisClient');
const paymentRepository = require('../repositories/PaymentRepository');
const Payment = require('../entities/Payment');
const rabbitMQConfig = require('../../infrastructure/config/config');

class PaymentService {
  // Processa um pagamento
  async processPayment(paymentData) {
    const payment = new Payment(paymentData);

    payment.validate();

    const savedPayment = await paymentRepository.save(payment);

    // Armazena o pagamento no cache Redis
    await redisClient.set(`payment:${savedPayment.id}`, JSON.stringify(savedPayment), 3600);

    // Publica mensagem no RabbitMQ 
    const paymentMessage = JSON.stringify(savedPayment);
    await rabbitMQConfig.publishToExchange('payments_exchange', 'process_payment', paymentMessage);

    return savedPayment;
  }

  // Recupera os detalhes de um pagamento pelo ID
  async getPaymentDetails(paymentId) {
    let paymentDetails = await redisClient.get(`payment:${paymentId}`);

    if (paymentDetails) {
      return JSON.parse(paymentDetails);
    }

    paymentDetails = await paymentRepository.getById(paymentId);

    if (!paymentDetails) {
      throw new Error('Payment not found');
    }

    // Armazena o pagamento no cache para futuras consultas
    await redisClient.set(`payment:${paymentDetails.id}`, JSON.stringify(paymentDetails), 3600);

    return paymentDetails;
  }

  async updatePaymentStatus(paymentId, newStatus) {
    await paymentRepository.updateStatus(paymentId, newStatus);

    const cachedPayment = await this.getPaymentDetails(paymentId);
    cachedPayment.status = newStatus;
    await redisClient.set(`payment:${paymentId}`, JSON.stringify(cachedPayment), 3600);

    // Publica a atualização de status no RabbitMQ
    const statusUpdateMessage = JSON.stringify({ paymentId, newStatus });
    await rabbitMQConfig.publishToExchange('payments_exchange', 'update_payment_status', statusUpdateMessage);
  }
}

module.exports = PaymentService;

