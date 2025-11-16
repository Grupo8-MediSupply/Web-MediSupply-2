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
  }),
  solicitarLote: (productosLote) => apiRequest('/producto/solicitar-lote', {
    method: 'POST',
    body: JSON.stringify(productosLote),
    ...withAuth()
  })
};

export default catalogoService;
