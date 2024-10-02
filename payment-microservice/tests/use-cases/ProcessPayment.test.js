const ProcessPayment = require('../../src/application/use-cases/ProcessPayment');
const Payment = require('../../src/domain/entities/Payment');
const PaymentRepository = require('../../src/domain/repositories/PaymentRepository');
const RedisClient = require('../../src/infrastructure/cache/RedisClient');
const RabbitMQConfig = require('../../src/infrastructure/config/config');

// Mockando as dependências
jest.mock('../../src/domain/entities/Payment');
jest.mock('../../src/domain/repositories/PaymentRepository', () => ({
  save: jest.fn(),
  getById: jest.fn(),
  updateStatus: jest.fn(),
}));
jest.mock('../../src/infrastructure/cache/RedisClient', () => ({
  set: jest.fn(),
  get: jest.fn(),
}));
jest.mock('../../src/infrastructure/config/config', () => ({
  publishToExchange: jest.fn(),
  connect: jest.fn(),
  close: jest.fn(),
}));

describe('ProcessPayment', () => {
  let processPayment;
  let redisClient;
  let rabbitMQConfig;

  beforeEach(() => {
    redisClient = RedisClient;
    rabbitMQConfig = RabbitMQConfig;
    processPayment = new ProcessPayment(PaymentRepository, redisClient, rabbitMQConfig);

    // Mock de console.log e console.error para evitar logs nos testes
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.clearAllMocks();
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  test('deve processar um pagamento com sucesso', async () => {
    const paymentData = { id: '123', amount: 100, userId: 'user-1' };

    // Mock da entidade Payment
    Payment.mockImplementation(() => ({
      validate: jest.fn(),
    }));

    // Mock do método save do PaymentRepository
    PaymentRepository.save.mockResolvedValue(paymentData);

    // Mock das funções Redis e RabbitMQ
    redisClient.set.mockResolvedValue();
    rabbitMQConfig.publishToExchange.mockResolvedValue();

    // Executa o caso de uso
    const result = await processPayment.execute(paymentData);

    expect(Payment).toHaveBeenCalledWith(paymentData);
    expect(PaymentRepository.save).toHaveBeenCalledWith(expect.any(Object));
    expect(redisClient.set).toHaveBeenCalledWith(`payment:${paymentData.id}`, JSON.stringify(paymentData), 3600);
    expect(rabbitMQConfig.publishToExchange).toHaveBeenCalledWith(
      'payments_exchange',
      'process_payment',
      JSON.stringify(paymentData)
    );
    expect(result).toEqual(paymentData);
  });

  test('deve lançar um erro quando falha ao salvar o pagamento', async () => {
    const paymentData = { id: '123', amount: 100, userId: 'user-1' };

    // Mock da entidade Payment
    Payment.mockImplementation(() => ({
      validate: jest.fn(),
    }));

    // Mock do método save do PaymentRepository para retornar um pagamento inválido (sem ID)
    PaymentRepository.save.mockResolvedValue({});

    await expect(processPayment.execute(paymentData)).rejects.toThrow('Falha ao recuperar o ID do pagamento');

    expect(redisClient.set).not.toHaveBeenCalled();
    expect(rabbitMQConfig.publishToExchange).not.toHaveBeenCalled();
  });

  test('deve lançar um erro se o pagamento não for válido', async () => {
    const paymentData = { id: '123', amount: 100, userId: 'user-1' };

    // Mock para simular erro de validação do pagamento
    Payment.mockImplementation(() => ({
      validate: jest.fn(() => {
        throw new Error('Pagamento inválido');
      }),
    }));

    await expect(processPayment.execute(paymentData)).rejects.toThrow('Pagamento inválido');

    expect(PaymentRepository.save).not.toHaveBeenCalled();
    expect(redisClient.set).not.toHaveBeenCalled();
    expect(rabbitMQConfig.publishToExchange).not.toHaveBeenCalled();
  });
});
