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
   * @param {Object} vendedorData - Datos del vendedor (nombre, email, identificacion, tipoIdentificacion)
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  createVendedor: (vendedorData) => apiRequest('/vendedores', {
    method: 'POST',
    body: JSON.stringify(vendedorData),
    ...withAuth()
  }),

  /**
   * Obtener lista de vendedores por país
   * @param {string} paisId - ID del país (10 para Colombia, 20 para México, etc.)
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  getVendedoresByPais: (paisId) => apiRequest(`/vendedores/pais/${paisId}`, {
    method: 'GET',
    ...withAuth()
  }),
};

export default vendedoresService;
