# 1️⃣ Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

# Establecer directorio de trabajo
WORKDIR /src

# Copiar archivos del proyecto y restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Copiar el resto del código y compilar
COPY . ./
RUN dotnet publish -c Release -o /app/publish --no-restore

# 2️⃣ Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

# Instalar herramientas necesarias para debugging
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR /app

# Crear usuario no-root para seguridad
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Copiar los archivos compilados desde la etapa de build
COPY --from=build /app/publish .

# Exponer el puerto que Render usa
EXPOSE 10000

# Variables de entorno por defecto
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:10000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:10000/health || exit 1

# Comando para ejecutar la app
ENTRYPOINT ["dotnet", "ServerAhorcado.dll"]
