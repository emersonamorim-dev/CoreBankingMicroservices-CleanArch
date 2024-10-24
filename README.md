### Core Digital Banking Microservices - C#, Kotlin e NodeJS 🚀 🔄 🌐

O Core Digital Banking Microservice é uma solução robusta e resiliente para bancos digitais, baseada em uma Arquitetura de Microserviços Poliglota. Cada microserviço é responsável por uma função crítica do sistema bancário, utilizando diferentes tecnologias para atender às suas necessidades específicas, garantindo escalabilidade, flexibilidade e robustez.

Esse projeto é implementado com os princípios da Clean Architecture, onde cada camada tem responsabilidades bem definidas, facilitando a manutenção e expansão do sistema. A arquitetura de microserviços permite uma comunicação desacoplada, aumentando a tolerância a falhas e a escalabilidade do sistema.


#### 1. Microserviços de Cartões (Kotlin, Postgres, RabbitMQ, Redis)
Microservice de Cartões (Kotlin, PostgreSQL, RabbitMQ, Redis)
O microserviço de cartões é responsável por toda a gestão de cartões de débito e crédito, incluindo emissão, cancelamento e verificação de dados.

#### Tecnologia:
Linguagem: Kotlin com Spring Boot
Banco de Dados: PostgreSQL
Mensageria: RabbitMQ para comunicação entre serviços
Cache: Redis para otimização de consultas
Funcionalidades:
Emissão de Cartões: Permite a emissão de novos cartões, vinculados a contas bancárias.
Consulta de Cartões: Verificação dos detalhes do cartão.
Bloqueio/Desbloqueio: Gestão de status dos cartões para garantir a segurança.
Autenticação: Implementação de autenticação e autorização com JWT.


#### 2. Microservice de Pagamentos (Node.js, MySQL, RabbitMQ, Redis)
O microserviço de pagamentos processa transações de pagamentos de forma segura e eficiente, garantindo a integridade e rapidez nas transações.

#### Tecnologia:
Linguagem: Node.js com Express.js
Banco de Dados: MySQL
Mensageria: RabbitMQ para comunicação assíncrona
Cache: Redis para armazenamento temporário e otimização de processos de pagamento
Funcionalidades:
Processamento de Pagamentos: Gerencia transações financeiras, autorizando e capturando valores.
Integração com Gateways: Integração com gateways de pagamento para realizar transações em tempo real.
Histórico de Transações: Armazena e recupera o histórico de pagamentos.
Retry e Fallback: Implementação de resiliência para garantir que os pagamentos sejam processados corretamente, mesmo em casos de falha.

#### 3. Microservice de Transferência (C#, MongoDB, RabbitMQ, Redis)
Microservice de Transferência foi projetado em C# utilizando o framework .NET Core 8.0 para lidar com operações de transferência de fundos entre contas bancárias 

#### Tecnologia:
Linguagem: C# com .NET Core
Banco de Dados: MongoDB
Mensageria: RabbitMQ para garantir uma comunicação eficiente e assíncrona
Cache: Redis para armazenamento temporário de dados de sessões
Funcionalidades:
- Application: Contém as interfaces e os serviços responsáveis por interações com a camada de domínio e a infraestrutura, gerenciando a lógica de negócios.

- Domain: Contém as entidades e serviços diretamente relacionados às regras de negócios da aplicação, como as entidades de transferência e as regras para validar as operações.

- Infrastructure: Esta camada é dividida em módulos, como Caching (para otimizações usando Redis), Config (configurações gerais do microserviço), Data (integração com MongoDB), Messaging (para interações com RabbitMQ), e Repositories (implementações de persistência de dados).

- Presentation: Inclui os Controllers, que são responsáveis por expor os endpoints da API para que outros microserviços ou o frontend possam se comunicar com o sistema.


#### Arquitetura
A arquitetura de Clean Architecture assegura uma separação clara de responsabilidades, com camadas de domínio, aplicação, infraestrutura e apresentação bem definidas. Isso garante que os serviços sejam facilmente testáveis, extensíveis e modulares.

Cada microserviço é independente e utiliza seu próprio banco de dados, garantindo que as mudanças em um serviço não impactem outros serviços. A comunicação entre os microserviços é realizada através de mensagens com o RabbitMQ, garantindo que as operações sejam processadas de maneira assíncrona e resiliente.

#### Diagrama da Aplicação

![](https://raw.githubusercontent.com/emersonamorim-dev/CoreBankingMicroservices-CleanArch/refs/heads/main/Diagrama/Diagrama-Core-Digital-Banking-Microservice.png)


#### Mensageria e Cache
RabbitMQ: É utilizado como um message broker, permitindo que os microserviços troquem informações de forma assíncrona. Cada microserviço publica e consome mensagens de filas específicas, garantindo o processamento correto de cada funcionalidade.
Redis: Implementado em todos os microserviços como cache de dados críticos, como tokens de autenticação, status de transações e outras operações que exigem alto desempenho.
Fluxo de Comunicação
A comunicação entre os microserviços é baseada em mensageria com RabbitMQ. Quando uma operação é iniciada, como a emissão de um cartão ou processamento de um pagamento, uma mensagem é publicada em uma fila específica no RabbitMQ. O microserviço apropriado consome a mensagem e processa a operação.

Este modelo de comunicação desacoplada garante resiliência e escalabilidade, permitindo que o sistema continue funcionando mesmo se um dos serviços estiver temporariamente indisponível.

#### Funcionalidades
1. Emissão e Gerenciamento de Cartões
Emissão de novos cartões com integração a contas bancárias.
Consulta de saldo e status do cartão.
Bloqueio e desbloqueio de cartões em tempo real.
2. Processamento de Pagamentos
Processamento de pagamentos via cartões de crédito e débito.
Autorização e captura de valores de transações.
Integração com gateways de pagamento externos.
Recuperação de transações e geração de relatórios.
3. Processamento de Transferência
Com transferência de valores.
Instalação e Execução
Requisitos
Docker e Docker Compose instalados
RabbitMQ, Redis, e bancos de dados respectivos (PostgreSQL, MySQL, MongoDB)

#### Passos de Instalação
Clone o repositório do microserviço:
```
git clone https://github.com/emersonamorim-dev/CoreBankingMicroservices-CleanArch.git
```
```
cd CoreBankingMicroservices-CleanArch
```

#### Monitoramento e Métricas
O sistema utiliza o Prometheus e Grafana para monitorar métricas de performance. O Prometheus coleta métricas expostas por cada microserviço, que podem ser visualizadas e analisadas através de painéis no Grafana.

#### Configuração do Monitoramento
Configure o Prometheus e Grafana nos contêineres Docker usando o arquivo docker-compose.yml.
As métricas estarão disponíveis na porta 15692 para Prometheus, e o painel de Grafana estará acessível na porta 3000.

#### Escalabilidade
O Core Digital Banking foi desenvolvido para ser escalável horizontalmente. Usando Kubernetes e Helm, é possível orquestrar os contêineres para ambientes de produção. A escalabilidade é garantida, pois cada microserviço pode ser escalado independentemente, dependendo da carga.

#### Resiliência
A arquitetura poliglota garante que cada microserviço possa ser desenvolvido e mantido em sua própria stack tecnológica, garantindo resiliência e flexibilidade para adotar novas tecnologias conforme necessário.


#### Conclusão
O Core Digital Banking Microservice é uma solução avançada e moderna para a gestão de serviços bancários digitais, construída com base em uma arquitetura poliglota e resiliente. Sua implementação com Clean Architecture assegura modularidade, fácil manutenção e alta escalabilidade, sendo capaz de se adaptar a diversas necessidades e crescimentos de mercado. Com uma comunicação eficiente baseada em RabbitMQ, o uso de Redis para cache, e a integração com múltiplos bancos de dados como PostgreSQL, MySQL, e MongoDB, este sistema oferece uma base sólida para operações financeiras robustas e seguras.

Além disso, a capacidade de cada microserviço operar de forma independente, utilizando diferentes stacks tecnológicas, garante que o sistema possa evoluir e integrar novas funcionalidades sem impactar outros serviços. Essa abordagem poliglota permite que o Core Digital Banking seja altamente flexível, inovador e capaz de se manter à frente em um cenário bancário digital competitivo.

Por fim, com o suporte a monitoramento e métricas via Prometheus e Grafana, além de ser facilmente escalável com Kubernetes e Helm, o sistema está preparado para atender grandes volumes de transações e usuários, mantendo a qualidade e segurança das operações bancárias.

### Desenvolvido por:
Emerson Amorim [@emerson-amorim-dev](https://www.linkedin.com/in/emerson-amorim-dev/)

