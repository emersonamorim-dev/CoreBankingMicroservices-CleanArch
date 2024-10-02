const pool = require('../../infrastructure/database/MySQLConnection');
const Payment = require('../entities/Payment');
const { v4: uuidv4 } = require('uuid'); 
const moment = require('moment'); 

class PaymentRepository {
  async save(paymentData) {
    const { amount, method, status, createdAt } = paymentData;
    const id = uuidv4(); 

    const formattedCreatedAt = moment(createdAt || new Date()).format('YYYY-MM-DD HH:mm:ss');

    const [result] = await pool.execute(
      'INSERT INTO payments (id, amount, method, status, created_at) VALUES (?, ?, ?, ?, ?)',
      [id, amount, method, status, formattedCreatedAt]
    );

    if (result.affectedRows === 0) {
      throw new Error('Falha ao inserir o pagamento no banco de dados');
    }

    return new Payment({
      id,
      amount,
      method,
      status,
      createdAt: formattedCreatedAt,
    });
  }

  async getById(paymentId) {
    const [rows] = await pool.execute(
      'SELECT id, amount, method, status, created_at FROM payments WHERE id = ?',
      [paymentId]
    );

    if (rows.length === 0) {
      return null;
    }

    const paymentData = rows[0];
    return new Payment({
      id: paymentData.id,
      amount: paymentData.amount,
      method: paymentData.method,
      status: paymentData.status,
      createdAt: paymentData.created_at,
    });
  }

  // Atualiza status de pagamento
  async updateStatus(paymentId, newStatus) {
    await pool.execute(
      'UPDATE payments SET status = ? WHERE id = ?',
      [newStatus, paymentId]
    );
  }
}

module.exports = new PaymentRepository();





