### Microservice de Cartão - Kotlin Application 🚀 🔄 🌐
Codificação em Kotlin com Java 21, Postgres e RabbitMQ para um Microservice de Cartão para o Microserviço Poliglota
Core Banking Microservices foi desenvolvido com o objetivo de gerir operações relacionadas à criação e administração de cartões de crédito/débito em um ambiente de arquitetura distribuída. Implementado em Kotlin, este microserviço segue os princípios da Clean Architecture, promovendo alta modularidade, manutenção e escalabilidade. Para garantir robustez e performance, o microserviço utiliza PostgreSQL para armazenamento de dados, RabbitMQ para comunicação assíncrona entre serviços, e Redis como solução de cache para otimização de consultas. Além disso, o sistema é monitorado por Prometheus e Grafana, ferramentas de observabilidade que garantem uma visão detalhada do desempenho da aplicação. Toda a solução é containerizada via Docker e orquestrada por Kubernetes, o que possibilita um ambiente altamente escalável e confiável.


#### Tecnologias Utilizadas 🛠️
![Java](https://img.shields.io/badge/-Java-F89820?style=for-the-badge&logo=java&logoColor=white)
![Kotlin](https://img.shields.io/badge/-Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)
![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/-RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Maven](https://img.shields.io/badge/-Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)
![Hibernate](https://img.shields.io/badge/-Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

PostgreSQL para persistência de dados;
RabbitMQ como broker de mensagens para comunicação assíncrona;
Redis para caching e melhoria de performance;
Prometheus para monitoramento de métricas;
Grafana para visualização das métricas coletadas;
Implementação de Docker para containerização do microserviço;
Integração com Kubernetes para orquestração de containers.
Estrutura do Projeto
A estrutura de pastas que segue a Clean Architecture, com camadas separadas por responsabilidades, está descrita abaixo com base na imagem anexada:

### Aplicação está toda configurada para subir Via Docker Desktop no Windows dentro do WSL2 com Ubuntu 24.04

#### Configure seu usuário do WSL2 ou Ubuntu no docker-compose.yml em:

```
build: /home/seu-usuario/corebankingmicroservices-cleanarch/cards-microservice/
```

#### Configure sua senha do Postgres em:

```
- SPRING_DATASOURCE_PASSWORD=sua-senha
```
em

```
POSTGRES_PASSWORD: sua-senha
```


#### Comando para buildar Imagem:

``` 
docker build -t cards-microservice:latest .
``` 

#### Subir Aplicação via Docker

``` 
docker-compose up --build

```

#### Realizar a Requisição via Postman

- Requisição Post

```
http://localhost:8081/api/v1/cartoes

```
#### Corpo Json da Requisição

```
{
  "clienteId": "e75b159b-7c45-4a65-8e85-2a5b0b334b5e",
  "nome": "Emerson Amorim",
  "cpf": "123.456.789-10",
  "email": "emerson_tecno@hotmail.com",
  "limite": 9000.00,
  "cvv": "123"
}
```

#### Retorno da Requisição

```
{
    "id": "27b957fb-3ef2-4c90-ae82-62069ba1f54a",
    "numero": "3665797318706352",
    "cliente": {
        "id": "0e01635e-f156-4308-8531-71cad5e65018",
        "nome": "Emerson Amorim",
        "cpf": "123.456.789-10",
        "email": "emerson_tecno@hotmail.com"
    },
    "limite": 9000.00,
    "dataValidade": "2029-09-20",
    "cvv": "123"
}
```

#### Para deixar aplicação Down

```
docker-compose down
```


#### Estrutura de Pastas do Microserviço

- src/main/kotlin/com/core/application/
- controllers: Define os controladores que expõem as APIs para serem consumidas pelo frontend ou outros microservices.
- dtos: Classes de Data Transfer Object (DTO) que representam dados que são enviados e recebidos entre o frontend e o backend.
events: Eventos relacionados ao domínio do cartão, usados para comunicação via RabbitMQ.
- domain/
entities: Entidades principais do domínio, como Cartao e Cliente, que representam os objetos persistidos no banco de dados.
- services: Serviços do domínio que encapsulam as regras de negócio, como a criação de cartões.
- usecases: Casos de uso que combinam as regras de negócio e processos associados à aplicação.
- infrastructure/
- config: Configurações necessárias para o microserviço, como conexões com o banco de dados e o RabbitMQ.
- exceptions: Manuseio de exceções, onde são definidos erros específicos da aplicação.
- messaging: Implementações relacionadas ao envio e recebimento de mensagens pelo RabbitMQ.
- repository: Repositórios de acesso a dados, onde se define a interação direta com o banco de dados.
- Application.kt: Ponto de entrada da aplicação, configurando e iniciando o microserviço.
Tecnologias Utilizadas
PostgreSQL:

#### Diagrama da Aplicação

![](https://raw.githubusercontent.com/emersonamorim-dev/Core-Digital-Banking-Microservice/main/Diagrama-Microserviço-Cartao-Kotlin.png)

Banco de dados relacional utilizado para armazenar informações dos cartões e clientes. As interações com o banco de dados são feitas através dos repositórios definidos na camada de infraestrutura.
RabbitMQ:

Utilizado para a comunicação assíncrona entre os microserviços. Quando um novo cartão é criado, um evento é publicado na fila cartaoQueue.
O listener CardsCreatedListener consome eventos desta fila para processar a criação de cartões em outros serviços.
Redis:

Redis é utilizado para caching, aumentando a eficiência ao armazenar dados frequentemente acessados, como informações de cliente.
Prometheus e Grafana:

O Prometheus é responsável por coletar métricas da aplicação, como tempo de resposta de endpoints, uso de memória, e status dos serviços.
O Grafana é integrado para visualizar estas métricas em painéis interativos.
Docker e Kubernetes
Docker:

O projeto usa Docker para garantir que o ambiente seja consistente. Cada serviço, como o banco de dados PostgreSQL, RabbitMQ, Redis, Prometheus e Grafana, é executado em um container isolado.
O arquivo docker-compose.yml define os containers e suas interações, por exemplo, expondo a porta do RabbitMQ e PostgreSQL, e configurando a comunicação entre eles.
Kubernetes:

Para orquestração de containers, Kubernetes é usado para escalar a aplicação e garantir a alta disponibilidade dos serviços. Os deployments, services e pods são definidos para cada componente do sistema.
Por exemplo, o RabbitMQ, Prometheus, Grafana e o microserviço de cartão são configurados como pods no Kubernetes, permitindo monitoramento e escalabilidade horizontal automática.
Fluxo da Aplicação
Recepção de Requisição (API):

O usuário ou outro serviço realiza uma chamada REST para o controller definido na camada application/controllers, como criar um novo cartão.
Processamento do Pedido:

O serviço de cartão realiza a lógica de negócio através dos services na camada domain/services. Caso necessário, ele faz cache ou busca informações no Redis ou PostgreSQL.
Envio de Evento para RabbitMQ:

Após a criação de um cartão, um evento de cartão criado é enviado para o RabbitMQ, para que outros microserviços que consumam este evento possam reagir adequadamente, como gerar um contrato ou enviar um e-mail de confirmação.
Monitoramento e Métricas:

As métricas da aplicação são capturadas pelo Prometheus e visualizadas no Grafana. Isso permite aos administradores monitorar o desempenho da aplicação, como tempos de resposta, filas do RabbitMQ e o status dos containers.
docker-compose.yml
O arquivo docker-compose.yml define como os containers do microserviço serão criados e interagem entre si. Ele especifica containers para:


#### Conclusão
O Microservice de Cartão combina a flexibilidade da arquitetura de microserviços com o poder das tecnologias modernas para oferecer um sistema eficiente e escalável. Sua implementação em Kotlin, o uso de RabbitMQ para comunicação entre serviços, PostgreSQL para persistência, e Redis para cache garantem uma aplicação rápida, resiliente e com alta disponibilidade. A integração com Prometheus e Grafana permite um monitoramento detalhado, essencial para a operação em larga escala. Com o uso de Docker e Kubernetes, a solução se torna facilmente implantável e escalável, oferecendo suporte a grandes volumes de transações em um ambiente de produção robusto.

### Desenvolvido por:
Emerson Amorim [@emerson-amorim-dev](https://www.linkedin.com/in/emerson-amorim-dev/)