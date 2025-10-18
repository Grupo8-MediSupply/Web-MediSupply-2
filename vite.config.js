import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), '')
  
  // Mostrar información sobre el modo actual
  console.log(`Running in ${mode} mode - Using ${env.VITE_USE_MOCK_API === 'true' ? 'MOCK' : 'REAL'} APIs`)

  return {
    plugins: [react()],
    define: {
      // Añadir cualquier configuración adicional según el modo
      __APP_MODE__: JSON.stringify(mode),
      __USING_MOCK__: env.VITE_USE_MOCK_API === 'true'
    },
    // Configuración para los distintos modos
    server: {
      open: true,
      // Puedes configurar un puerto diferente según el modo si lo necesitas
      port: mode === 'mock' ? 5173 : 5174
    }
  }
})
