package com.core.cards.microservice.domain.model

import jakarta.persistence.*
import java.math.BigDecimal
import java.util.UUID

@Entity
@Table(name = "cartoes")
data class Cartao(
    @Id
    @GeneratedValue
    val id: UUID? = null,


    @Column(nullable = false)
    val numero: String,

    @Column(nullable = false)
    val nomeTitular: String,

    @Column(nullable = false)
    val cpf: String,

    @Column(nullable = false)
    val email: String,

    @Column(nullable = false)
    val limite: BigDecimal,

    @Column(nullable = false)
    val validade: String,

    @Column(nullable = false)
    val cvv: String
) {
    // Construtor padrão requerido pelo Hibernate
    constructor() : this(
        id = null,
        numero = "",
        nomeTitular = "",
        cpf = "",
        email = "",
        limite = BigDecimal.ZERO,
        validade = "",
        cvv = ""
    )
}
