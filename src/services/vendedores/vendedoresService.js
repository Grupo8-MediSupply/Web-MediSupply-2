/**
 * Servicios de vendedores para comunicarse con la API
 */
import { apiRequest, withAuth } from '../apiClient';

/**
 * Servicio de vendedores
 */
const vendedoresService = {
  /**
   * Crear un nuevo vendedor
   * @param {Object} vendedorData - Datos del vendedor (nombre, email)
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  createVendedor: (vendedorData) => apiRequest('/vendedores', {
    method: 'POST',
    body: JSON.stringify(vendedorData),
    ...withAuth()
  }),

  /**
   * Obtener lista de vendedores
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  getVendedores: () => apiRequest('/vendedores', {
    method: 'GET',
    ...withAuth()
  }),
};

export default vendedoresService;
