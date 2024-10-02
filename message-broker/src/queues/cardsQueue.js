const axios = require('axios');
const startConsumer = require('../consumer');

async function processCardsMessage(message) {
    console.log('Mensagem de processamento de cartões:', message);
    
    // mensagem pode ser processada ou validada conforme necessário
    const processedMessage = {
        cardId: message.cardId,  
        action: message.action   
    };

    try {
        const response = await axios.post('http://localhost:8081/api/v1/cartoes', processedMessage);
        console.log(`Resposta do serviço de cartões: ${response.data}`);
    } catch (error) {
        console.error(`Mensagem de erro ao processar cartões: ${error.message}`);
    }
}

module.exports = () => startConsumer('cards', processCardsMessage);
