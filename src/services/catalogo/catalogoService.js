import { apiRequest, withAuth } from '../apiClient';

const catalogoService = {
  getProductos: () => apiRequest('/producto/ObtenerProductos', {
    method: 'GET',
    ...withAuth()
  }),
  createProducto: (productoData) => apiRequest('/producto', {
    method: 'POST',
    body: JSON.stringify(productoData),
    ...withAuth()
  })
};

export default catalogoService;
