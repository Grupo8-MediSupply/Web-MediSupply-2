# Configuración de Google Maps para el Módulo de Logística

## Requisitos Previos

- Cuenta de Google Cloud Platform
- Tarjeta de crédito (para verificación, aunque hay cuota gratuita)

## Pasos de Configuración

### 1. Crear o Seleccionar un Proyecto

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el nombre del proyecto

### 2. Habilitar las APIs necesarias

Habilita las siguientes APIs en tu proyecto:

- **Maps JavaScript API** (requerida para el mapa)
- **Routes API** (requerida para las rutas)
- **Geocoding API** (opcional, para búsqueda de direcciones)

Para habilitar una API:
1. Ve a "APIs y servicios" > "Biblioteca"
2. Busca el nombre de la API
3. Haz clic en "Habilitar"

### 3. Crear una API Key

1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "Clave de API"
3. Se generará una nueva API Key
4. **Importante**: Haz clic en "Restringir clave" para configurar restricciones

### 4. Configurar Restricciones de la API Key (Recomendado)

#### Restricciones de Aplicación
- Selecciona "Referentes HTTP (sitios web)"
- Agrega tus dominios autorizados:
  ```
  http://localhost:*
  https://tu-dominio.com/*
  ```

#### Restricciones de API
- Selecciona "Restringir clave"
- Marca solo las APIs que necesitas:
  - Maps JavaScript API
  - Routes API
  - Geocoding API (si la usas)

### 5. Configurar la Variable de Entorno

1. Copia el archivo `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Agrega tu API Key en `.env.local`:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyA...tu_api_key_aqui
   ```

3. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Cuota Gratuita

Google Maps ofrece **$200 USD de crédito mensual gratuito**, que incluye:

- **Maps JavaScript API**: ~28,000 cargas de mapa gratis/mes
- **Routes API**: ~40,000 solicitudes gratis/mes

Ver detalles en: https://cloud.google.com/maps-platform/pricing

## Solución de Problemas

### Error: "InvalidKeyMapError"
- Verifica que la API Key esté correctamente copiada
- Asegúrate de haber habilitado "Maps JavaScript API"
- Verifica que no haya espacios o saltos de línea en la key

### Error: "RefererNotAllowedMapError"
- Agrega tu dominio a las restricciones de referentes HTTP
- En desarrollo, asegúrate de incluir `http://localhost:*`

### Error: "ApiNotActivatedMapError"
- Ve a la consola de Google Cloud
- Habilita la API correspondiente
- Puede tomar algunos minutos en propagarse

### El mapa no se carga
1. Abre la consola del navegador (F12)
2. Busca errores de Google Maps
3. Verifica que la variable de entorno esté cargada:
   ```javascript
   console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
   ```

## Seguridad

⚠️ **Nunca subas tu API Key al repositorio**

- Asegúrate de que `.env.local` esté en `.gitignore`
- No hagas commits de archivos con tu API Key
- Si accidentalmente expones tu key, revócala inmediatamente en Google Cloud Console

## Monitoreo de Uso

1. Ve a "APIs y servicios" > "Panel"
2. Selecciona "Maps JavaScript API"
3. Revisa el gráfico de uso diario
4. Configura alertas de presupuesto si es necesario

## Referencias

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Routes API](https://developers.google.com/maps/documentation/routes)
- [Precios](https://cloud.google.com/maps-platform/pricing)
- [Códigos de Error](https://developers.google.com/maps/documentation/javascript/error-messages)
