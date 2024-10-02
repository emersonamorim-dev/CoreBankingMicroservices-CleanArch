const broker = require('./src/broker');
const startTransferQueue = require('./src/queues/transferQueue');
const startCardsQueue = require('./src/queues/cardsQueue');
const startPaymentQueue = require('./src/queues/paymentQueue');

async function init() {
    try {
        await broker.connect();

        // Inicia os consumidores de mensagens
        startTransferQueue();
        startCardsQueue();
        startPaymentQueue();

        console.log('Message Broker ready');
    } catch (error) {
        console.error('Erro ao inicializar message broker:', error);
    }
}

init();
