import { apiRequest, withAuth } from '../apiClient';

const configuracionService = {
  getConfiguracion: () => apiRequest('/configuracion', {
    method: 'GET',
    ...withAuth()
  }),
};

export default configuracionService;
