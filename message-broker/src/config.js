module.exports = {
    rabbitmq: {
        url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5681', 
        exchange: 'message-broker'
    },
    services: {
        transfer: {
            queue: 'transferQueue',
            routingKey: 'transfer_key'
        },
        cards: {
            queue: 'cardsQueue',
            routingKey: 'cards_key'
        },
        payment: {
            queue: 'paymentQueue',
            routingKey: 'payment_key'
        }
    }
};
