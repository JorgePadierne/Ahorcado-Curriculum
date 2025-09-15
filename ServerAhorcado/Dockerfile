FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar la solución y csproj para restaurar
COPY ServerAhorcado.sln .
COPY ServerAhorcado/ServerAhorcado.csproj ServerAhorcado/
RUN dotnet restore ServerAhorcado.sln

# Copiar todo
COPY . .

RUN dotnet publish ServerAhorcado/ServerAhorcado.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ServerAhorcado.dll"]
