package com.core.cards.microservice.domain.model

import jakarta.persistence.*
import java.util.UUID

@Entity
@Table(name = "clientes")
data class Cliente(
    @Id
    @GeneratedValue
    val id: UUID? = null,

    @Column(nullable = false)
    val nome: String,

    @Column(nullable = false)
    val cpf: String,

    @Column(nullable = false)
    val email: String
) {
    // Construtor padrão requerido pelo Hibernate
    constructor() : this(
        id = null,
        nome = "",
        cpf = "",
        email = ""
    )
}

