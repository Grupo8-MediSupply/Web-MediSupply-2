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
  }),
  getProductoById: (id) => apiRequest(`/producto/${id}`, {
    method: 'GET',
    ...withAuth()
  })
};

export default catalogoService;
