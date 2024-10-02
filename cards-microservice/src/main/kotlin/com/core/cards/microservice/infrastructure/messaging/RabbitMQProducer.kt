package com.core.cards.microservice.infrastructure.messaging


import com.core.cards.microservice.domain.model.Cartao
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Component

@Component
class RabbitMQProducer(private val rabbitTemplate: RabbitTemplate) {

    fun enviarMensagem(cartao: Cartao) {
        rabbitTemplate.convertAndSend("fila_cartoes", cartao)
    }


}
