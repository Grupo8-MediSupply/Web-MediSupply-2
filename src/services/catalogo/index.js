import realCatalogoService from './catalogoService';
import mockCatalogoService from './mockCatalogoService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

const catalogoService = USE_MOCKS ? mockCatalogoService : realCatalogoService;

export default catalogoService;
