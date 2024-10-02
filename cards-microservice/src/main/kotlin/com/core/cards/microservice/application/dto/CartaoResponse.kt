package com.core.cards.microservice.application.dto

import java.math.BigDecimal
import java.util.UUID


data class CartaoResponse(
    val id: String,
    val numero: String,
    val nomeTitular: String,
    val cpf: String,
    val email: String,
    val limite: BigDecimal
)
