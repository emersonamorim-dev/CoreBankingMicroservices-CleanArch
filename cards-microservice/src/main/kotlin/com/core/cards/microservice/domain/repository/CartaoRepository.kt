package com.core.cards.microservice.domain.repository


import com.core.cards.microservice.domain.model.Cartao
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID


interface CartaoRepository : JpaRepository<Cartao, UUID>


