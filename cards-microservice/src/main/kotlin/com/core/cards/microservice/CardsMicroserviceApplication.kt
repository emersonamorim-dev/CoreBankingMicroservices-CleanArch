package com.core.cards.microservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CardsMicroserviceApplication

fun main(args: Array<String>) {
	runApplication<CardsMicroserviceApplication>(*args)
}
