# Usamos la imagen de .NET SDK para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiamos csproj y restauramos dependencias
COPY *.csproj ./ServerAhorcado ./ServerAhorcado
RUN dotnet restore

# Copiamos el resto del proyecto y compilamos
COPY . ./
RUN dotnet publish -c Release -o out

# Imagen final de runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "ServerAhorcado.dll"]


