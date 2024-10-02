class Payment {
  constructor({ id, amount, method, status, createdAt }) {
    this.id = id; 
    this.amount = amount;
    this.method = method;
    this.status = status || 'pending'; 
    this.createdAt = createdAt || new Date().toISOString(); 
  }

  validate() {
    if (this.amount === undefined || this.amount <= 0) {
      throw new Error('Quantidade inválida');
    }
    if (!this.method) {
      throw new Error('Método de pagamento é obrigatório');
    }
    if (!this.status) {
      this.status = 'pending';
    }
    if (!this.createdAt) {
      this.createdAt = new Date().toISOString();
    }
  }
}

module.exports = Payment;


