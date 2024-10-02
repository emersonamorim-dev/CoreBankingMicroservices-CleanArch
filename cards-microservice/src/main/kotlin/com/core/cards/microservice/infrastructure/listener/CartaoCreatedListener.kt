package com.core.cards.microservice.infrastructure.listener

import com.core.cards.microservice.application.event.CartaoCreatedEvent
import com.core.cards.microservice.application.services.CartaoService
import com.core.cards.microservice.infrastructure.messaging.RabbitMqConfig
import org.slf4j.LoggerFactory
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component

@Component
class CartaoCreatedListener(
    private val cartaoService: CartaoService
) {
    private val logger = LoggerFactory.getLogger(CartaoCreatedListener::class.java)

    // aceita o evento diretamente
    @RabbitListener(queues = [RabbitMqConfig.CARTAO_CREATED_QUEUE])
    fun listen(event: CartaoCreatedEvent) {
        logger.info("Cartão criado: {}", event)

        // cria o cartão com base no evento recebido
        cartaoService.criarCartao(event)
    }
}
