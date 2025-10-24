import { apiRequest, withAuth } from '../apiClient';

const catalogoService = {
  getProductos: () => apiRequest('/producto/ObtenerProductos', {
    method: 'GET',
    ...withAuth()
  })
};

export default catalogoService;
