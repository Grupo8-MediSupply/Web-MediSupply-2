import realLogisticaService from './logisticaService';
import mockLogisticaService from './mockLogisticaService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

const logisticaService = USE_MOCKS ? mockLogisticaService : realLogisticaService;

export default logisticaService;
