### Microservice de Transferência - C# 🚀 🔄 🌐
Codificação em C# para um Microservice de Transferência foi projetado em C# utilizando o framework .NET Core 8.0 para lidar com operações de transferência de fundos entre contas bancárias para o Microserviço Poliglota
Core Banking Microservices em uma arquitetura de microserviços. Este serviço foi implementado com um alto foco em desempenho, segurança e escalabilidade, utilizando MongoDB como banco de dados NoSQL para armazenar registros das transferências. A comunicação entre microserviços é realizada de forma assíncrona usando RabbitMQ, enquanto o Redis é utilizado como sistema de cache para otimizar as consultas e melhorar o tempo de resposta. O monitoramento é assegurado por Prometheus e Grafana, garantindo uma visão detalhada da performance da aplicação. Toda a infraestrutura é orquestrada com Docker e Kubernetes, permitindo a escalabilidade e gerenciamento simplificado de containers e serviços.

#### Tecnologias Usadas:
- Visual Studio 2022
- .NET Core 8.0: Framework utilizado para desenvolver a aplicação.
- Entity Framework: ORM utilizado para interação com o banco de dados.
- MongoDB
- RabbitMQ
- Redis
- Prometeus
- Grafana
- Zipkin

#### Descrição Geral
Na imagem anexada, podemos ver a estrutura do Microservice de Transferência, composta pelos seguintes diretórios principais:

- Application: Contém as interfaces e os serviços responsáveis por interações com a camada de domínio e a infraestrutura, gerenciando a lógica de negócios.

- Domain: Contém as entidades e serviços diretamente relacionados às regras de negócios da aplicação, como as entidades de transferência e as regras para validar as operações.

- Infrastructure: Esta camada é dividida em módulos, como Caching (para otimizações usando Redis), Config (configurações gerais do microserviço), Data (integração com MongoDB), Messaging (para interações com RabbitMQ), e Repositories (implementações de persistência de dados).

- Presentation: Inclui os Controllers, que são responsáveis por expor os endpoints da API para que outros microserviços ou o frontend possam se comunicar com o sistema.

#### Diagrama da Aplicação

![](https://raw.githubusercontent.com/emersonamorim-dev/Core-Digital-Banking-Microservice/main/Diagrama-Microservico-Tranferencia-C#.png)

#### Comandos necessário para instalar o .NET Core 8.0 no Ubuntu 24.04 via WSL2

```
sudo apt update && sudo apt upgrade -y
```

```
sudo apt install -y wget apt-transport-https
```


- Adicionar o Repositório do Microsoft Package
```
# Baixar a chave GPG
wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb

# Instalar o pacote de repositório da Microsoft
sudo dpkg -i packages-microsoft-prod.deb
```

- Instalar o SDK do .NET Core 8.0

```
sudo apt update
```

```
sudo apt install -y dotnet-sdk-8.0
```

```
dotnet --version

```

### Aplicação está toda configurada para subir Via Docker Desktop no Windows dentro do WSL2 com Ubuntu 24.04

#### Configure seu usuário do WSL2 ou Ubuntu no docker-compose.yml em:

```
build: /home/seu-usuario/corebankingmicroservices-cleanarch/transfer-microservice/
```


#### Comando para buildar Imagem:

``` 
docker build -t transfer-microservice:latest .
``` 


#### Subir Aplicação via Docker

``` 
docker-compose up --build

```

#### Realizar a Requisição via Postman

- Requisição Post

```
http://localhost:5000/api/transfer

```
#### Corpo Json da Requisição

```
{
    "accountFrom": "e7a8f3c1-24f7-4b58-93e1-31f1e6d01912",
    "accountTo": "c8b5d3b2-2a8d-4b75-912f-31b1e6d01911",
    "amount": 10500.00,
    "transferDate": "2024-09-20T12:00:00"
}

```

#### Retorno da Requisição

```
{
    "message": "Transferência criada com sucesso",
    "transferId": "965c5e08-f360-4e03-8178-524bdd3863a6"
}
```

#### Para deixar aplicação Down

```
docker-compose down
```

#### Acessar o Grafana na seguinte porta:

Grafana UI: 
```
http://localhost:3018

```

#### Acessar o Prometheus na seguinte porta:

Prometheus UI: 
```
http://localhost:9090

```

#### Acessar o Zipkin na seguinte porta:

Zipkin UI: 
```
http://localhost:9411
```

A solução é totalmente configurada para funcionar em um ambiente containerizado, com arquivos de configuração como docker-compose.yml para definir a infraestrutura dos containers. Além disso, a configuração de Prometheus e Grafana permite o monitoramento do desempenho do serviço em tempo real, enquanto o Kubernetes facilita a orquestração e o gerenciamento de escalabilidade.


#### Conclusão
O Microservice de Transferência oferece uma solução robusta e escalável para a gestão de transações financeiras em tempo real. Utilizando tecnologias modernas como MongoDB, RabbitMQ e Redis, o microserviço garante alta performance e integridade nas transações financeiras. A integração com Prometheus e Grafana proporciona um monitoramento contínuo, ajudando na detecção proativa de falhas e gargalos de performance. Além disso, a orquestração por Kubernetes e a containerização com Docker garantem uma operação fluida e escalável, permitindo a rápida adaptação às necessidades de aumento de carga sem comprometer a estabilidade do sistema.

### Desenvolvido por:
Emerson Amorim [@emerson-amorim-dev](https://www.linkedin.com/in/emerson-amorim-dev/)
