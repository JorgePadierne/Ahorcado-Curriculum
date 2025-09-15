#!/bin/bash

# Script para construir y desplegar la aplicación Ahorcado

echo "🚀 Iniciando build y deploy de Ahorcado..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con color
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

# Verificar que Docker Compose esté instalado
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Limpiar contenedores y volúmenes existentes
print_message "Limpiando contenedores y volúmenes existentes..."
docker-compose down -v --remove-orphans

# Construir las imágenes
print_message "Construyendo imágenes de Docker..."
docker-compose build --no-cache

# Verificar que la construcción fue exitosa
if [ $? -ne 0 ]; then
    print_error "Error al construir las imágenes de Docker."
    exit 1
fi

# Iniciar los servicios
print_message "Iniciando servicios..."
docker-compose up -d

# Verificar que los servicios estén corriendo
print_message "Verificando estado de los servicios..."
sleep 10

# Verificar PostgreSQL
if docker-compose exec postgres pg_isready -U ahorcado_user -d ahorcado_db > /dev/null 2>&1; then
    print_message "✅ PostgreSQL está corriendo correctamente"
else
    print_error "❌ PostgreSQL no está respondiendo"
    docker-compose logs postgres
    exit 1
fi

# Verificar API
if curl -f http://localhost:5032/health > /dev/null 2>&1; then
    print_message "✅ API está corriendo correctamente en http://localhost:5032"
else
    print_warning "⚠️  API no responde en /health, pero puede estar iniciando..."
    print_message "Verificando logs de la API..."
    docker-compose logs api
fi

# Mostrar estado final
print_message "🎉 Despliegue completado!"
print_message "📊 Estado de los servicios:"
docker-compose ps

print_message "🔗 URLs disponibles:"
print_message "  - API: http://localhost:5032"
print_message "  - PostgreSQL: localhost:5432"

print_message "📝 Comandos útiles:"
print_message "  - Ver logs: docker-compose logs -f"
print_message "  - Parar servicios: docker-compose down"
print_message "  - Reiniciar: docker-compose restart"
