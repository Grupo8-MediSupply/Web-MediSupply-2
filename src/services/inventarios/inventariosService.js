import { apiRequest, withAuth } from '../apiClient';

const inventariosService = {
  getBodegas: () => apiRequest('/bodegas', {
    method: 'GET',
    ...withAuth()
  })
};

export default inventariosService;
