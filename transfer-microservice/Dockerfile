FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8088

# Fase de build do projeto
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar o arquivo .csproj e restaurar as dependências
COPY ["transfer-microservice/transfer-microservice.csproj", "transfer-microservice/"]
RUN dotnet restore "./transfer-microservice/transfer-microservice.csproj"

# Copiar todos os arquivos do projeto e compilar
COPY . .
WORKDIR "/src/transfer-microservice"
RUN dotnet build "./transfer-microservice.csproj" -c Release -o /app/build

# Fase de publicação
FROM build AS publish
RUN dotnet publish "./transfer-microservice.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Fase final para execução do aplicativo
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "transfer-microservice.dll"]
