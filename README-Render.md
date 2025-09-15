# 🚀 Despliegue en Render - Ahorcado API

Esta guía te ayudará a desplegar tu aplicación Ahorcado en Render.

## 📋 Prerrequisitos

- Cuenta en [Render](https://render.com)
- Repositorio en GitHub con tu código
- Docker instalado localmente (para pruebas)

## 🔧 Configuración

### 1. Archivos de configuración incluidos

- `render.yaml` - Configuración de servicios para Render
- `ServerAhorcado/ServerAhorcado/Dockerfile` - Dockerfile optimizado para Render
- `ServerAhorcado/ServerAhorcado/.dockerignore` - Archivos a ignorar en el build
- `ServerAhorcado/ServerAhorcado/build.sh` - Script de build para Render

### 2. Variables de entorno

La aplicación está configurada para usar:
- `DATABASE_URL` - Cadena de conexión a PostgreSQL (se configura automáticamente)
- `ASPNETCORE_ENVIRONMENT=Production`
- `ASPNETCORE_URLS=http://+:10000`
- `PORT=10000`

## 🚀 Pasos para desplegar

### Opción 1: Despliegue automático con render.yaml

1. **Conecta tu repositorio a Render:**
   - Ve a [Render Dashboard](https://dashboard.render.com)
   - Haz clic en "New +" → "Blueprint"
   - Conecta tu repositorio de GitHub
   - Render detectará automáticamente el archivo `render.yaml`

2. **Render creará automáticamente:**
   - Una base de datos PostgreSQL
   - Un servicio web con tu API .NET
   - Las variables de entorno necesarias

### Opción 2: Despliegue manual

1. **Crear base de datos PostgreSQL:**
   - Ve a "New +" → "PostgreSQL"
   - Nombre: `ahorcado-database`
   - Plan: Free
   - Región: Oregon (o la más cercana)

2. **Crear servicio web:**
   - Ve a "New +" → "Web Service"
   - Conecta tu repositorio
   - Configuración:
     - **Build Command:** `cd ServerAhorcado && dotnet restore && dotnet publish -c Release -o ./publish`
     - **Start Command:** `cd ServerAhorcado && dotnet ./publish/ServerAhorcado.dll`
     - **Environment:** `Docker`
     - **Dockerfile Path:** `ServerAhorcado/Dockerfile`
     - **Docker Context:** `ServerAhorcado`

3. **Configurar variables de entorno:**
   - `ASPNETCORE_ENVIRONMENT=Production`
   - `ASPNETCORE_URLS=http://+:10000`
   - `PORT=10000`
   - `DATABASE_URL` (copiar desde la base de datos creada)

## 🔍 Verificación

Una vez desplegado, puedes verificar que todo funciona:

1. **Health Check:** `https://tu-app.onrender.com/health`
2. **API Endpoints:** `https://tu-app.onrender.com/api/...`

## 🐛 Troubleshooting

### Problemas comunes:

1. **Error de conexión a base de datos:**
   - Verifica que `DATABASE_URL` esté configurada correctamente
   - Asegúrate de que la base de datos esté en la misma región

2. **Build falla:**
   - Verifica que el Dockerfile esté en la ruta correcta
   - Revisa los logs de build en Render

3. **Aplicación no responde:**
   - Verifica que el puerto 10000 esté configurado
   - Revisa los logs de la aplicación

### Logs útiles:

- **Build logs:** En la pestaña "Logs" del servicio
- **Runtime logs:** En la pestaña "Logs" del servicio
- **Database logs:** En la pestaña "Logs" de la base de datos

## 📊 Monitoreo

Render proporciona:
- Métricas de rendimiento
- Logs en tiempo real
- Alertas de salud del servicio
- Métricas de base de datos

## 🔄 Actualizaciones

Para actualizar tu aplicación:
1. Haz push de los cambios a tu repositorio
2. Render detectará automáticamente los cambios
3. Reconstruirá y redesplegará automáticamente

## 💰 Costos

- **Plan Free:** Incluye 750 horas de ejecución por mes
- **Base de datos:** 1GB de almacenamiento gratuito
- **Tráfico:** Ilimitado en plan gratuito

## 📞 Soporte

- [Documentación de Render](https://render.com/docs)
- [Comunidad de Render](https://community.render.com)
- [Soporte técnico](https://render.com/support)
