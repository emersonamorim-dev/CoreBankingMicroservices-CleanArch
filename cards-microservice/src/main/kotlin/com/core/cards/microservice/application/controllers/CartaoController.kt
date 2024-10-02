package com.core.cards.microservice.application.controllers

import com.core.cards.microservice.application.dto.CartaoResponse
import com.core.cards.microservice.application.dto.CriarCartaoRequest
import com.core.cards.microservice.application.usecase.CriarCartaoUseCase
import com.core.cards.microservice.application.usecase.ConsultarCartaoUseCase
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/v1/cartoes")
class CartaoController(
    private val criarCartaoUseCase: CriarCartaoUseCase,
    private val consultarCartaoUseCase: ConsultarCartaoUseCase
) {

    @PostMapping
    fun criarCartao(@RequestBody request: CriarCartaoRequest): CartaoResponse {

        val cartao = criarCartaoUseCase.execute(
            nomeTitular = request.nomeTitular,
            cpf = request.cpf,
            email = request.email,
            validade = request.validade,
            limite = request.limite,
            cvv = request.cvv
        )

        return CartaoResponse(
            id = cartao.id?.toString() ?: throw IllegalStateException("ID não pode ser nulo"),
            numero = cartao.numero,
            nomeTitular = cartao.nomeTitular,
            cpf = cartao.cpf,
            email = cartao.email,
            limite = cartao.limite,
        )
    }

    @GetMapping("/{id}")
    fun consultarCartao(@PathVariable id: UUID): CartaoResponse {
        val cartao = consultarCartaoUseCase.execute(id) ?: throw Exception("Cartão não encontrado")
        return CartaoResponse(
            id = cartao.id?.toString() ?: throw IllegalStateException("ID não pode ser nulo"),
            numero = cartao.numero,
            nomeTitular = cartao.nomeTitular,
            cpf = cartao.cpf,
            email = cartao.email,
            limite = cartao.limite
        )
    }
}
