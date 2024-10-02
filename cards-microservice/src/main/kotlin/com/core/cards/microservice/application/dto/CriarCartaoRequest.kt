package com.core.cards.microservice.application.dto

import java.math.BigDecimal
import java.util.UUID

data class CriarCartaoRequest(
    val nomeTitular: String,
    val cpf: String,
    val email: String,
    val validade: String,
    val limite: BigDecimal,
    val cvv: String
)

