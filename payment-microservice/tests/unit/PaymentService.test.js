const PaymentService = require('../../src/domain/services/PaymentService');
const PaymentRepository = require('../../src/domain/repositories/PaymentRepository');
const RedisClient = require('../../src/infrastructure/cache/RedisClient');
const RabbitMQConfig = require('../../src/infrastructure/config/config');
const Payment = require('../../src/domain/entities/Payment');

// Mockando as dependências
jest.mock('../../src/domain/repositories/PaymentRepository');
jest.mock('../../src/infrastructure/cache/RedisClient', () => ({
  set: jest.fn(),
  get: jest.fn(),
  quit: jest.fn(),
}));
jest.mock('../../src/infrastructure/config/config', () => ({
  publishToExchange: jest.fn(),
  connect: jest.fn(),
  close: jest.fn(),
}));
jest.mock('../../src/domain/entities/Payment');

describe('PaymentService', () => {
  let paymentService;

  beforeEach(() => {
    paymentService = new PaymentService();
    jest.clearAllMocks(); 
  });

  describe('processPayment', () => {
    test('deve processar um pagamento, armazenar no Redis e publicar no RabbitMQ', async () => {
      const paymentData = { id: '123', amount: 100 };

      // Mock da implementação de Payment
      Payment.mockImplementation(() => ({
        validate: jest.fn(),
      }));

      // Mock das funções do PaymentRepository e RedisClient
      PaymentRepository.save.mockResolvedValue(paymentData);
      RedisClient.set.mockResolvedValue();
      RabbitMQConfig.publishToExchange.mockResolvedValue();

      // Executa o método processPayment
      const result = await paymentService.processPayment(paymentData);

      expect(Payment).toHaveBeenCalledWith(paymentData); 
      expect(PaymentRepository.save).toHaveBeenCalledWith(expect.anything()); 
      expect(RedisClient.set).toHaveBeenCalledWith(
        `payment:${paymentData.id}`,
        JSON.stringify(paymentData),
        3600
      ); 
      expect(RabbitMQConfig.publishToExchange).toHaveBeenCalledWith(
        'payments_exchange',
        'process_payment',
        JSON.stringify(paymentData)
      ); 
      expect(result).toEqual(paymentData); 
    });
  });

  describe('getPaymentDetails', () => {
    test('deve retornar detalhes do pagamento do Redis se presente', async () => {
      const paymentId = '123';
      const cachedPayment = { id: paymentId, amount: 100 };

      // Mock do RedisClient para retornar um pagamento do cache
      RedisClient.get.mockResolvedValue(JSON.stringify(cachedPayment));

      const result = await paymentService.getPaymentDetails(paymentId);

      expect(RedisClient.get).toHaveBeenCalledWith(`payment:${paymentId}`); 
      expect(result).toEqual(cachedPayment); 
    });

    test('deve retornar detalhes do pagamento do banco de dados se não estiver no Redis', async () => {
      const paymentId = '123';
      const dbPayment = { id: paymentId, amount: 100 };

      // Mock para simular ausência de dados no Redis e presença no banco de dados
      RedisClient.get.mockResolvedValue(null);
      PaymentRepository.getById.mockResolvedValue(dbPayment);
      RedisClient.set.mockResolvedValue();

      const result = await paymentService.getPaymentDetails(paymentId);

      expect(RedisClient.get).toHaveBeenCalledWith(`payment:${paymentId}`);
      expect(PaymentRepository.getById).toHaveBeenCalledWith(paymentId); 
      expect(RedisClient.set).toHaveBeenCalledWith(
        `payment:${dbPayment.id}`,
        JSON.stringify(dbPayment),
        3600
      ); 
      expect(result).toEqual(dbPayment); 
    });

    test('deve lançar um erro se o pagamento não for encontrado', async () => {
      const paymentId = '123';

      // Mock para simular ausência de dados tanto no Redis quanto no banco de dados
      RedisClient.get.mockResolvedValue(null);
      PaymentRepository.getById.mockResolvedValue(null);

      await expect(paymentService.getPaymentDetails(paymentId)).rejects.toThrow('Payment not found');
    });
  });

  describe('updatePaymentStatus', () => {
    test('deve atualizar o status do pagamento e publicar no RabbitMQ', async () => {
      const paymentId = '123';
      const newStatus = 'completed';
      const cachedPayment = { id: paymentId, status: 'pending' };

      // Mock das funções utilizadas no método
      paymentService.getPaymentDetails = jest.fn().mockResolvedValue(cachedPayment);
      RedisClient.set.mockResolvedValue();
      PaymentRepository.updateStatus.mockResolvedValue();
      RabbitMQConfig.publishToExchange.mockResolvedValue();

      await paymentService.updatePaymentStatus(paymentId, newStatus);

      expect(PaymentRepository.updateStatus).toHaveBeenCalledWith(paymentId, newStatus); 
      expect(paymentService.getPaymentDetails).toHaveBeenCalledWith(paymentId); 
      expect(RedisClient.set).toHaveBeenCalledWith(
        `payment:${paymentId}`,
        JSON.stringify({ ...cachedPayment, status: newStatus }),
        3600
      ); 
      expect(RabbitMQConfig.publishToExchange).toHaveBeenCalledWith(
        'payments_exchange',
        'update_payment_status',
        JSON.stringify({ paymentId, newStatus })
      ); 
    });
  });
});
