/**
 * Servicios de reportes para comunicarse con la API
 */
import { apiRequest, withAuth } from '../apiClient';

/**
 * Servicio de reportes
 */
const reportesService = {
  /**
   * Obtener KPIs de un vendedor
   * @param {string} vendedorId - ID del vendedor
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  getVendedorKPIs: (vendedorId) => apiRequest(`/reportes/vendedores?vendedorId=${vendedorId}`, {
    method: 'GET',
    ...withAuth()
  }),
};

export default reportesService;
