package com.core.cards.microservice.application.event

import java.math.BigDecimal

data class CartaoCreatedEvent(
    val nomeTitular: String,
    val cpf: String,
    val email: String,
    val validade: String,
    val limite: BigDecimal,
    val cvv: String,
    val numeroCartao: String
)
