# MediSupply

Sistema de gestión de suministros médicos para clínicas y hospitales.

## Tecnologías

- React 18
- Vite
- Material UI 5 (con tema personalizado Material Design 3)
- React Router 6
- Redux Toolkit para gestión de estado
- JWT para autenticación
- Modo API real y simulada (mock)

## Requisitos previos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd Web-MediSupply-2
```

2. Instala las dependencias:
```bash
npm install
# o
yarn
```

3. Configura las variables de entorno:
   - Copia `.env.example` a `.env.mock` y `.env.real`
   - Ajusta las URLs y configuraciones según sea necesario

4. Inicia el servidor de desarrollo:

   Con APIs simuladas:
   ```bash
   npm run dev:mock
   # o
   yarn dev:mock
   ```

   Con APIs reales:
   ```bash
   npm run dev:real
   # o
   yarn dev:real
   ```

5. Abre tu navegador en `http://localhost:5173` (modo mock) o `http://localhost:5174` (modo real)

## Modos de ejecución

- **Modo Mock**: Utiliza datos simulados para desarrollo sin depender de APIs externas
- **Modo Real**: Se conecta a las APIs reales del backend

## Credenciales de prueba (modo mock)

- **Email**: `admin@medisupply.com`
- **Contraseña**: `admin123`

o

- **Email**: `test20@correo.com.co`
- **Contraseña**: `deploy1`

## Comandos disponibles

- `npm run dev`: Inicia el servidor de desarrollo con configuración por defecto
- `npm run dev:mock`: Inicia el servidor con APIs simuladas
- `npm run dev:real`: Inicia el servidor con APIs reales
- `npm run build`: Compila el proyecto para producción
- `npm run build:mock`: Compila el proyecto con APIs simuladas
- `npm run build:real`: Compila el proyecto con APIs reales
- `npm run lint`: Ejecuta el linter para encontrar problemas de código
- `npm run preview`: Previsualiza la build de producción localmente

## Estructura del proyecto

- `/src`: Código fuente de la aplicación
  - `/components`: Componentes reutilizables
    - `/Navbar.jsx`: Barra de navegación lateral
    - `/ProtectedRoute.jsx`: Componente para rutas protegidas por autenticación
    - `/ApiModeIndicator.jsx`: Indicador del modo API (real o mock)
  - `/pages`: Componentes de página completa
    - `/Home.jsx`: Página de inicio
    - `/Login.jsx`: Página de autenticación
    - `/About.jsx`: Página de información
    - Varias páginas para cada sección (Inventario, Catálogo, etc.)
  - `/redux`: Configuración y slices de Redux
    - `/store.js`: Configuración del store
    - `/features`: Slices para cada funcionalidad
      - `/authSlice.js`: Manejo de autenticación
      - `/inventarioSlice.js`: Gestión de inventario
      - `/catalogoSlice.js`: Gestión del catálogo de productos
  - `/services`: Servicios y utilidades
    - `/api.js`: Cliente API central
    - `/mockApi.js`: Simulación de APIs para desarrollo
  - `/theme`: Configuración del tema
    - `/theme.js`: Tema Material UI personalizado basado en Material Design 3
  - `/assets`: Recursos estáticos (imágenes, logos, etc.)
  - `App.jsx`: Componente principal
  - `main.jsx`: Punto de entrada

## Variables de entorno

La aplicación utiliza diferentes archivos de entorno:

- `.env`: Configuración compartida
- `.env.mock`: Configuración para modo de simulación
- `.env.real`: Configuración para modo real

Variables principales:

- `VITE_API_BASE_URL`: URL base de la API
- `VITE_USE_MOCK_API`: `true` para usar APIs simuladas, `false` para APIs reales
- Varios `VITE_*_ENDPOINT` para diferentes rutas de la API

## Diseño y temas

El proyecto utiliza Material UI con un tema personalizado basado en Material Design 3.
El tema soporta modo claro y oscuro, que puede cambiarse desde la interfaz.
