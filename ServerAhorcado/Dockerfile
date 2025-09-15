# Etapa 1: build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia todo
COPY . .

# Restaura dependencias
RUN dotnet restore ServerAhorcado/ServerAhorcado.csproj

# Compila en release
RUN dotnet publish ServerAhorcado/ServerAhorcado.csproj -c Release -o /app/publish

# Etapa 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copiar app publicada
COPY --from=build /app/publish .

# Exponer puerto (Render usa 10000 interno, pero ASP.NET por defecto es 8080)
EXPOSE 8080

# Iniciar app
ENTRYPOINT ["dotnet", "ServerAhorcado.dll"]
