# ---------------------------
# Etapa 1: Build
# ---------------------------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar todo el proyecto al contenedor
COPY . .

# Buscar el archivo .csproj automáticamente
# Esto busca el primer archivo *.csproj que encuentre
RUN export CSPROJ=$(find . -name "*.csproj" | head -n 1) && \
    echo "Usando proyecto: $CSPROJ" && \
    dotnet restore "$CSPROJ" && \
    dotnet publish "$CSPROJ" -c Release -o /app/out

# ---------------------------
# Etapa 2: Runtime
# ---------------------------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copiar los archivos publicados desde la etapa de build
COPY --from=build /app/out ./

# Exponer puertos HTTP y HTTPS
EXPOSE 80
EXPOSE 443

# Comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "$(ls *.dll | head -n 1)"]

