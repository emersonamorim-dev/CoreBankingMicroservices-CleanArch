const axios = require('axios');
const startConsumer = require('../consumer');

async function processPaymentMessage(message) {
    console.log('Processando mensagem de pagamento:', message);
    
    const processedMessage = {
        paymentId: message.paymentId,  
        amount: message.amount,        
        status: message.status          
    };

    try {
        const response = await axios.post('http://localhost:3000/api/payments', processedMessage);

        console.log(`Resposta do serviço de pagamento: ${response.data}`);
    } catch (error) {
        console.error(`Erro ao processar mensagem de pagamento: ${error.message}`);
    }
}

module.exports = () => startConsumer('payment', processPaymentMessage);
