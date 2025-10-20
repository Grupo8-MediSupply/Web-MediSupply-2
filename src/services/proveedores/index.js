/**
 * Punto de entrada para servicios de proveedores
 * Decide si usar servicios reales o simulados según configuración
 */
import realProveedoresService from './proveedoresService';
import mockProveedoresService from './mockProveedoresService';

// Verificar si estamos en modo desarrollo y usando mocks
const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

// Exportar el servicio apropiado según la configuración
const proveedoresService = USE_MOCKS ? mockProveedoresService : realProveedoresService;

export default proveedoresService;
