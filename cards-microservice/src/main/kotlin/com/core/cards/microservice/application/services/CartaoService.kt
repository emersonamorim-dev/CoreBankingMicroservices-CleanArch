package com.core.cards.microservice.application.services

import com.core.cards.microservice.application.event.CartaoCreatedEvent
import com.core.cards.microservice.application.usecase.CriarCartaoUseCase
import com.core.cards.microservice.application.usecase.ConsultarCartaoUseCase
import com.core.cards.microservice.domain.model.Cartao
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.UUID

@Service
class CartaoService(
    private val criarCartaoUseCase: CriarCartaoUseCase,
    private val consultarCartaoUseCase: ConsultarCartaoUseCase
) {

    // método aceita diretamente o evento CartaoCreatedEvent
    fun criarCartao(event: CartaoCreatedEvent): Cartao {
        return criarCartaoUseCase.execute(
            nomeTitular = event.nomeTitular,
            cpf = event.cpf,
            email = event.email,
            validade = event.validade,
            limite = event.limite,
            cvv = event.cvv
        )
    }

    fun consultarCartao(id: UUID): Cartao? {
        return consultarCartaoUseCase.execute(id)
    }
}
