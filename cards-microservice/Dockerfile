# Usar uma imagem base do JDK 17 (ou 11, se necessário)
FROM openjdk:17-jdk-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo JAR gerado para o container
COPY target/cards-microservice-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta na qual o Spring Boot está rodando
EXPOSE 8081

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]

