# 🐳 Docker Setup - Ahorcado API

Este documento explica cómo desplegar la API del juego Ahorcado usando Docker.

## 📋 Prerrequisitos

- Docker Desktop instalado
- Docker Compose instalado
- Git (para clonar el repositorio)

## 🚀 Despliegue Rápido

### Opción 1: Script Automático (Recomendado)

```bash
# Ejecutar el script de despliegue
./build-and-deploy.sh
```

### Opción 2: Comandos Manuales

```bash
# 1. Construir las imágenes
docker-compose build

# 2. Iniciar los servicios
docker-compose up -d

# 3. Verificar el estado
docker-compose ps
```

## 🔧 Configuración

### Variables de Entorno

El archivo `docker-compose.yml` incluye las siguientes configuraciones:

- **PostgreSQL**: Puerto 5432
- **API**: Puerto 5032
- **Base de datos**: `ahorcado_db`
- **Usuario**: `ahorcado_user`
- **Contraseña**: `ahorcado_password`

### Personalizar Configuración

Para cambiar la configuración, edita el archivo `docker-compose.yml`:

```yaml
environment:
  - ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=tu_db;Username=tu_user;Password=tu_password;SSL Mode=Disable;
```

## 📊 Verificación

### Verificar API
```bash
curl http://localhost:5032/health
```

### Verificar Base de Datos
```bash
docker-compose exec postgres psql -U ahorcado_user -d ahorcado_db -c "SELECT version();"
```

## 🛠️ Comandos Útiles

### Ver Logs
```bash
# Todos los servicios
docker-compose logs -f

# Solo la API
docker-compose logs -f api

# Solo PostgreSQL
docker-compose logs -f postgres
```

### Gestionar Servicios
```bash
# Parar servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v

# Reiniciar servicios
docker-compose restart

# Reconstruir y reiniciar
docker-compose up --build -d
```

### Acceder a la Base de Datos
```bash
# Conectar a PostgreSQL
docker-compose exec postgres psql -U ahorcado_user -d ahorcado_db

# Ejecutar migraciones (si las hay)
docker-compose exec api dotnet ef database update
```

## 🔍 Troubleshooting

### Puerto en Uso
Si el puerto 5032 está en uso:
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Usar puerto 8080 en lugar de 5032
```

### Problemas de Conexión a BD
```bash
# Verificar que PostgreSQL esté corriendo
docker-compose exec postgres pg_isready -U ahorcado_user -d ahorcado_db

# Ver logs de PostgreSQL
docker-compose logs postgres
```

### Limpiar Todo
```bash
# Parar y eliminar todo
docker-compose down -v --remove-orphans

# Eliminar imágenes
docker-compose down --rmi all
```

## 📁 Estructura de Archivos

```
ServerAhorcado/
├── DockerFile              # Dockerfile para la API
├── .dockerignore           # Archivos a ignorar en build
├── docker-compose.yml      # Configuración de servicios
├── build-and-deploy.sh     # Script de despliegue
└── README-Docker.md        # Este archivo
```

## 🌐 URLs de Acceso

- **API**: http://localhost:5032
- **Swagger/OpenAPI**: http://localhost:5032/swagger (en desarrollo)
- **Health Check**: http://localhost:5032/health

## 📝 Notas Importantes

1. **Datos Persistentes**: Los datos de PostgreSQL se guardan en un volumen Docker
2. **SSL**: Deshabilitado para desarrollo local
3. **Logs**: Se pueden ver con `docker-compose logs`
4. **Reinicio**: Los servicios se reinician automáticamente si fallan

## 🆘 Soporte

Si tienes problemas:

1. Verifica que Docker esté corriendo
2. Revisa los logs: `docker-compose logs`
3. Verifica los puertos: `netstat -tulpn | grep :5032`
4. Reinicia los servicios: `docker-compose restart`
