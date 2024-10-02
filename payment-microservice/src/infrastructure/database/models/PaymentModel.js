const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Conexão com o banco de dados MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'mysql-db', 
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || 'Elas1981XP#', 
  database: process.env.DB_NAME || 'paymentdb', 
};

async function connect() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

const PaymentModel = {
  // Cria um novo pagamento
  async createPayment(paymentData) {
    const connection = await connect();
    const { amount, description, status } = paymentData;

    const query = 'INSERT INTO payments (amount, description, status) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [amount, description, status]);

    await connection.end(); 

    return result;
  },

  // Busca pagamento por ID
  async getPaymentById(paymentId) {
    const connection = await connect();

    const query = 'SELECT * FROM payments WHERE id = ?';
    const [rows] = await connection.execute(query, [paymentId]);

    await connection.end(); 

    if (rows.length === 0) {
      return null;
    }

    return rows[0]; // Retorna o pagamento encontrado
  },

  // Atualiza o status de um pagamento
  async updatePaymentStatus(paymentId, newStatus) {
    const connection = await connect();

    const query = 'UPDATE payments SET status = ? WHERE id = ?';
    const [result] = await connection.execute(query, [newStatus, paymentId]);

    await connection.end(); 

    return result;
  },

  // Lista todos os pagamentos
  async getAllPayments() {
    const connection = await connect();

    const query = 'SELECT * FROM payments';
    const [rows] = await connection.execute(query);

    await connection.end(); 

    return rows; 
  },
};

module.exports = PaymentModel;
