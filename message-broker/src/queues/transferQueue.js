const axios = require('axios');
const startConsumer = require('../consumer');

async function processTransferMessage(message) {
    console.log('Processando mensagem de transferência:', message);

    const processedMessage = {
        transferId: message.transferId,   
        amount: message.amount,         
        fromAccount: message.fromAccount, 
        toAccount: message.toAccount,    
        status: message.status          
    };

    try {
        const response = await axios.post('http://localhost:5000/api/transfer', processedMessage);

        console.log(`Resposta do serviço de transferência: ${response.data}`);
    } catch (error) {
        console.error(`Erro ao processar mensagem de transferência: ${error.message}`);
    }
}

module.exports = () => startConsumer('transfer', processTransferMessage);
