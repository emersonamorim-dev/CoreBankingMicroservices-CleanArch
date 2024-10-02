const redis = require('redis');

// Crie o cliente Redis
const redisClient = redis.createClient({
  url: 'redis://redis-cache:6379', 
});

// Conecte o cliente Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Cliente Redis conectado');
  } catch (error) {
    console.error('Falha ao conectar ao Redis:', error);
  }
})();

class RedisClient {
  async set(key, value, expirationInSeconds) {
    try {
      await redisClient.set(key, value, { EX: expirationInSeconds });
      console.log(`Key ${key} definido no Redis com expiração ${expirationInSeconds} segundos`);
    } catch (error) {
      console.error('Falha ao definir chave no Redis:', error);
      throw new Error('Falha na operação de configuração do Redis');
    }
  }

  async get(key) {
    try {
      const value = await redisClient.get(key);
      return value;
    } catch (error) {
      console.error('Falha ao obter a chave do Redis:', error);
      throw new Error('Falha na operação de obter do Redis');
    }
  }

  async close() {
    try {
      await redisClient.quit();
      console.log('Cliente Redis fechado');
    } catch (error) {
      console.error('Falha ao fechar o cliente Redis:', error);
    }
  }
}

module.exports = new RedisClient();

