const PaymentController = require('../../src/interfaces/controllers/PaymentController');
const ProcessPayment = require('../../src/application/use-cases/ProcessPayment');
const PaymentRepository = require('../../src/domain/repositories/PaymentRepository');
const RedisClient = require('../../src/infrastructure/cache/RedisClient');
const RabbitMQConfig = require('../../src/infrastructure/message-broker/config/config');

// Mockando as dependências
jest.mock('../../src/application/use-cases/ProcessPayment');
jest.mock('../../src/domain/repositories/PaymentRepository');
jest.mock('../../src/infrastructure/cache/RedisClient', () => ({
  set: jest.fn(),
  get: jest.fn(),
  quit: jest.fn(),
}));
jest.mock('../../src/infrastructure/message-broker/config/config', () => ({
  publishToExchange: jest.fn(),
  connect: jest.fn(),
  close: jest.fn(),
}));

afterAll(() => {
  RedisClient.quit.mockClear();
  RabbitMQConfig.close.mockClear();
});

describe('PaymentController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe('createPayment', () => {
    test('deve criar um pagamento e retornar status 201', async () => {
      const mockResult = { success: true, message: 'Pagamento processado com sucesso' };
      ProcessPayment.prototype.execute.mockResolvedValue(mockResult);

      req.body = {
        amount: 100,
        method: 'credit',
        userId: '12345',
      };

      await PaymentController.createPayment(req, res);

      expect(ProcessPayment.prototype.execute).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    test('deve retornar erro 500 se ocorrer um erro no processamento', async () => {
      const mockError = new Error('Erro ao processar pagamento');
      ProcessPayment.prototype.execute.mockRejectedValue(mockError);

      req.body = {
        amount: 100,
        method: 'credit',
        userId: '12345',
      };

      await PaymentController.createPayment(req, res);

      expect(ProcessPayment.prototype.execute).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao processar pagamento' });
    });
  });
});
