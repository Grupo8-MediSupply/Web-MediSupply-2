/**
 * Servicio de usuarios - Selecciona entre real o mock según configuración
 */
import usuariosService from './usuariosService';
import mockUsuariosService from './mockUsuariosService';

const useMockApi = import.meta.env.VITE_USE_MOCK_API === 'true';

export default useMockApi ? mockUsuariosService : usuariosService;
