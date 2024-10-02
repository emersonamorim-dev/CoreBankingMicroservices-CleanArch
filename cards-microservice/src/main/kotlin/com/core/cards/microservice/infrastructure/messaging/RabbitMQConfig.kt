package com.core.cards.microservice.infrastructure.messaging

import org.springframework.amqp.core.Declarable
import org.springframework.amqp.core.Queue
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RabbitMqConfig {

    companion object {
        const val CARTAO_CREATED_QUEUE = "cartao-created"

    }

    @Bean
    fun jackson2JsonMessageConverter(): Jackson2JsonMessageConverter {
        return Jackson2JsonMessageConverter()
    }

    @Bean
    fun cartaoCreatedQueue(): Declarable {
        return Queue(CARTAO_CREATED_QUEUE)
    }

}