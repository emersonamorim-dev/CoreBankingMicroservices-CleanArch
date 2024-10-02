package com.core.cards.microservice.application.usecase

import com.core.cards.microservice.domain.model.Cartao
import com.core.cards.microservice.domain.repository.CartaoRepository
import org.springframework.stereotype.Component
import java.math.BigDecimal
import java.util.UUID
import kotlin.random.Random

@Component
class CriarCartaoUseCase(private val cartaoRepository: CartaoRepository) {

    fun execute(
        nomeTitular: String,
        cpf: String,
        email: String,
        validade: String,
        limite: BigDecimal,
        cvv: String
    ): Cartao {
        val numeroGerado = gerarNumeroCartao()

        val novoCartao = Cartao(
            id = UUID.randomUUID(),
            numero = numeroGerado,
            nomeTitular = nomeTitular,
            cpf = cpf,
            email = email,
            limite = limite,
            validade = validade,
            cvv = cvv
        )
        return cartaoRepository.save(novoCartao)
    }

    private fun gerarNumeroCartao(): String {
        val prefixoCartao = "4"
        val numeroGerado = (1..15)
            .map { Random.nextInt(0, 10).toString() }
            .joinToString("")
        return prefixoCartao + numeroGerado
    }
}
