# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar el archivo csproj desde la subcarpeta y restaurar dependencias
COPY ServerAhorcado/ServerAhorcado.csproj ./ 
RUN dotnet restore

# Copiar todo el proyecto
COPY ServerAhorcado/ ./ 
RUN dotnet publish -c Release -o out

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "ServerAhorcado.dll"]
