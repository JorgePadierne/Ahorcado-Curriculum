#!/bin/bash

# Script de build para Render
echo "🚀 Iniciando build para Render..."

# Verificar que estamos en el directorio correcto
if [ ! -f "ServerAhorcado/ServerAhorcado.csproj" ]; then
    echo "❌ Error: No se encontró el archivo del proyecto. Asegúrate de ejecutar desde la raíz del proyecto."
    exit 1
fi

# Navegar al directorio del servidor
cd ServerAhorcado

# Restaurar dependencias
echo "📦 Restaurando dependencias..."
dotnet restore

# Compilar la aplicación
echo "🔨 Compilando aplicación..."
dotnet build -c Release

# Ejecutar tests (opcional)
echo "🧪 Ejecutando tests..."
dotnet test --no-build --verbosity quiet

echo "✅ Build completado exitosamente!"
