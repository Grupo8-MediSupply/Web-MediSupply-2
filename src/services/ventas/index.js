/**
 * Punto de entrada para servicios de ventas
 */
import realPlanesVentaService from './planesVentaService';
import mockPlanesVentaService from './mockPlanesVentaService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

const planesVentaService = USE_MOCKS ? mockPlanesVentaService : realPlanesVentaService;

export { planesVentaService };
