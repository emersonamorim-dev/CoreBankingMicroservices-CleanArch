package com.core.cards.microservice.application.usecase

import com.core.cards.microservice.domain.model.Cartao
import com.core.cards.microservice.domain.repository.CartaoRepository
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class ConsultarCartaoUseCase(private val cartaoRepository: CartaoRepository) {

    fun execute(id: UUID): Cartao? {
        return cartaoRepository.findById(id).orElse(null)
    }
}
