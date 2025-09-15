#!/bin/bash

# Script de build para Render
echo "🚀 Iniciando build para Render..."

# Instalar dependencias
dotnet restore

# Compilar la aplicación
dotnet publish -c Release -o ./publish

echo "✅ Build completado exitosamente"
