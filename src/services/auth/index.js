/**
 * Punto de entrada para servicios de autenticación
 * Decide si usar servicios reales o simulados según configuración
 */
import realAuthService from './authService';
import mockAuthService from './mockAuthService';

// Verificar si estamos en modo desarrollo y usando mocks
const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

// Exportar el servicio apropiado según la configuración
const authService = USE_MOCKS ? mockAuthService : realAuthService;

export default authService;
