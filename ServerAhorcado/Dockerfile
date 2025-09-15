FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar .csproj desde la ruta correcta (origen -> destino)
COPY ServerAhorcado/ServerAhorcado/ServerAhorcado.csproj ServerAhorcado/ServerAhorcado/

RUN dotnet restore ServerAhorcado/ServerAhorcado/ServerAhorcado.csproj

# Copiar todo el resto del proyecto
COPY . .

RUN dotnet publish ServerAhorcado/ServerAhorcado/ServerAhorcado.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ServerAhorcado.dll"]



