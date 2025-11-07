/**
 * Punto de entrada para servicios de reportes
 * Decide si usar servicios reales o simulados según configuración
 */
import realReportesService from './reportesService';
import mockReportesService from './mockReportesService';

// Verificar si estamos en modo desarrollo y usando mocks
const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

// Exportar el servicio apropiado según la configuración
const reportesService = USE_MOCKS ? mockReportesService : realReportesService;

export default reportesService;
