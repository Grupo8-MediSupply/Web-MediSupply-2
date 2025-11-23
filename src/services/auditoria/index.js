/**
 * Exporta el servicio de auditoría según el modo (mock o real)
 */
import auditoriaService from './auditoriaService';
import mockAuditoriaService from './mockAuditoriaService';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export default USE_MOCK_API ? mockAuditoriaService : auditoriaService;
