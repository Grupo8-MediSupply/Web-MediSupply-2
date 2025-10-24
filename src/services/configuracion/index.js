import realConfiguracionService from './configuracionService';
import mockConfiguracionService from './mockConfiguracionService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

const configuracionService = USE_MOCKS ? mockConfiguracionService : realConfiguracionService;

export default configuracionService;
