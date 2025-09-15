# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar el proyecto y restaurar dependencias
COPY ServerAhorcado/*.csproj ./
RUN dotnet restore

# Copiar todo el código y compilar
COPY src/. ./
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "ServerAhorcado.dll"]


