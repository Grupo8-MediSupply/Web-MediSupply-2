import { apiRequest, withAuth } from '../apiClient';

const inventariosService = {
  getBodegas: () => apiRequest('/bodegas', {
    method: 'GET',
    ...withAuth()
  }),
  getProductosInBodega: (id) => apiRequest(`/bodegas/${id}/productos`, {
    method: 'GET',
    ...withAuth()
  })
};

export default inventariosService;
