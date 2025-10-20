/**
 * Punto de entrada para servicios de vendedores
 * Decide si usar servicios reales o simulados según configuración
 */
import realVendedoresService from './vendedoresService';
import mockVendedoresService from './mockVendedoresService';

// Verificar si estamos en modo desarrollo y usando mocks
const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

// Exportar el servicio apropiado según la configuración
const vendedoresService = USE_MOCKS ? mockVendedoresService : realVendedoresService;

export default vendedoresService;
