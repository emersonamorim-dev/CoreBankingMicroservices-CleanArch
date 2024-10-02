const PaymentRepository = require('../../domain/repositories/PaymentRepository');
const RedisClient = require('../../infrastructure/cache/RedisClient');
const RabbitMQConfig = require('../../infrastructure/message-broker/config/config');
const ProcessPayment = require('../../application/use-cases/ProcessPayment');

// Cria uma instância do caso de uso com as dependências injetadas
const processPayment = new ProcessPayment(PaymentRepository, RedisClient, RabbitMQConfig);

class PaymentController {
  async createPayment(req, res) {
    try {
      const paymentData = req.body;
      const result = await processPayment.execute(paymentData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PaymentController();

