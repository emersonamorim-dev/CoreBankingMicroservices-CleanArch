package com.core.cards.microservice.infrastructure.redis

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import redis.clients.jedis.JedisPool
import redis.clients.jedis.JedisPoolConfig


@Configuration
class RedisConfig {

    @Bean
    fun jedisPool(): JedisPool {
        val config = JedisPoolConfig()
        return JedisPool(config, "localhost", 6379)
    }
}
