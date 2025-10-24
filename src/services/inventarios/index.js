import realInventariosService from './inventariosService';
import mockInventariosService from './mockInventariosService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

const inventariosService = USE_MOCKS ? mockInventariosService : realInventariosService;

export default inventariosService;
