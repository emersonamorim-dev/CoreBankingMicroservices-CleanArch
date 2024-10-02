### Microservice de Pagamento - Node com Javascript Vanila 🚀 🔄 🌐
Codificação de Microservice de Pagamento foi desenvolvido em Node.js utilizando JavaScript Vanilla para lidar com operações de pagamento em uma arquitetura de microserviços. Este serviço foi projetado para garantir alta performance e confiabilidade em transações financeiras, integrando tecnologias como MySQL para persistência de dados, RabbitMQ para gerenciamento de filas e mensagens assíncronas, e Redis para caching, otimizando o desempenho das consultas. Além disso, Prometheus e Grafana são utilizados para monitoramento da aplicação, permitindo a observação de métricas de performance e a identificação de gargalos. A infraestrutura da aplicação é completamente containerizada e gerida através de Docker e Kubernetes, garantindo escalabilidade e fácil manutenção.


#### Descrição Geral
Na imagem fornecida, podemos visualizar a estrutura do Microservice de Pagamento, que está organizada da seguinte forma:

- application/use-cases: Contém os casos de uso, que são responsáveis pela lógica principal do negócio. O arquivo ProcessPayment.js gerencia o fluxo de processamento de pagamento, onde a lógica de orquestração entre as diferentes camadas do serviço acontece.

- domain:

- entities: Contém as definições de entidades principais, como Payment.js, que define a estrutura de dados relacionada aos pagamentos.
- repositories: O arquivo PaymentRepository.js implementa a interface de persistência de dados no MySQL, responsável por salvar, atualizar e recuperar informações sobre os pagamentos.
- services: O serviço de pagamentos, PaymentService.js, orquestra a execução dos casos de uso e a interação com outras camadas, como cache, banco de dados e mensageria.

- infrastructure:

- cache: A integração com o Redis é feita através do RedisClient.js, que facilita o armazenamento temporário de dados e otimiza o desempenho de consultas frequentes.
- database: O arquivo MySQLConnection.js lida com a conexão e configurações do banco de dados MySQL.
- message-broker: A integração com o RabbitMQ é realizada no arquivo RabbitMQClient.js, onde as filas e trocas de mensagens entre microserviços são gerenciadas.

- interfaces:

- controllers e routes: Responsáveis por expor os endpoints HTTP para o frontend ou outros serviços.
tests:

- integration e unit: Os testes de unidade e integração são implementados utilizando Jest e Supertest, garantindo que todas as funcionalidades sejam devidamente validadas e a qualidade do código seja mantida.

#### Diagrama da Aplicação

![](https://raw.githubusercontent.com/emersonamorim-dev/CoreBankingMicroservices-CleanArch/refs/heads/main/Diagrama/Diagrama-Microservico-Pagamento-NodeJS.png)

### Aplicação está toda configurada para subir Via Docker Desktop no Windows dentro do WSL2 com Ubuntu 24.04

#### Configure seu usuário do WSL2 ou Ubuntu no docker-compose.yml em:

```
build: /home/seu-usuario/corebankingmicroservices-cleanarch/payment-microservice/
```

#### Configure sua senha do MYSQL em:

```
MYSQL_ROOT_PASSWORD: sua-senha
```


#### Comando para buildar Imagem:

``` 
docker build -t payment-microservice:latest .
``` 


#### Subir Aplicação via Docker

``` 
docker-compose up --build

```

#### Realizar a Requisição via Postman

- Requisição Post

```
http://localhost:3000/api/payments

```
#### Corpo Json da Requisição

```
{
  "amount": 10500,
  "method": "credit_debit",
  "status": "pending"
}

```

#### Retorno da Requisição

```
{
    "id": "6e683105-ef04-471b-b98f-f9e2fbe7468f",
    "amount": 10500,
    "method": "credit_debit",
    "status": "pending",
    "createdAt": "2024-09-20 14:56:39"
}
```

- Caso gere erro ao acessar o Banco de dados via Container:

```
docker ps
```

- Verique o ID do Container do Mysql e rode o comando abaixo:
```
docker exec -it <nome-do-container-mysql> bash
```

- Entre como root no container no MYSQL:
```
mysql -u root -p
```

- Apague a tabela criada com seguinte comando:
```
DROP TABLE IF EXISTS paymentdb.payments;
```

- Crie a tabela novamente:
```
CREATE TABLE paymentdb.payments (
  id VARCHAR(36) PRIMARY KEY,
  amount DECIMAL(10, 2),
  method VARCHAR(50),
  status VARCHAR(50),
  created_at DATETIME
);
```

#### Para derrubar aplicação

```
docker-compose down
```

#### Acessar o Grafana na seguinte porta:

Grafana UI: 
```
http://localhost:3081

```

#### Acessar o Prometheus na seguinte porta:

Prometheus UI: 
```
http://localhost:9094/

```

#### Acessar o Zipkin na seguinte porta:

Zipkin UI: 
```
http://localhost:9412
```

A aplicação utiliza Docker para containerizar o ambiente, garantindo fácil replicação e implantação, e Kubernetes para orquestrar a execução dos containers em produção. O monitoramento da aplicação é feito por Prometheus, que coleta métricas, e Grafana, que fornece dashboards de visualização das métricas em tempo real.

#### Conclusão
O Microservice de Pagamento em Node.js com JavaScript Vanilla e tecnologias de suporte como MySQL, RabbitMQ e Redis foi projetado para proporcionar alta disponibilidade, escalabilidade e desempenho em operações financeiras críticas. A integração com Prometheus e Grafana garante um monitoramento eficaz da aplicação, permitindo a rápida identificação de problemas e otimizando a capacidade de resposta da equipe de desenvolvimento. O uso de Jest e Supertest nos testes automatizados reforça a qualidade do serviço, garantindo que a lógica de negócios funcione conforme esperado. A arquitetura baseada em Docker e Kubernetes proporciona uma solução eficiente para escalar o microserviço de forma ágil e confiável, respondendo às demandas de tráfego e garantindo a continuidade das operações.


### Desenvolvido por:
Emerson Amorim [@emerson-amorim-dev](https://www.linkedin.com/in/emerson-amorim-dev/)
