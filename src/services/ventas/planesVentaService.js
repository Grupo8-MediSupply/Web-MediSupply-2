/**
 * Servicios de planes de venta para comunicarse con la API
 */
import { apiRequest, withAuth } from '../apiClient';

/**
 * Servicio de planes de venta
 */
const planesVentaService = {
  /**
   * Crear un nuevo plan de venta
   * @param {Object} planData - Datos del plan (nombre, vendedorId, montoMeta, inicio, fin, descripcion)
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  createPlanVenta: (planData) => apiRequest('/ventas/planes', {
    method: 'POST',
    body: JSON.stringify(planData),
    ...withAuth()
  }),

  /**
   * Obtener planes de venta por vendedor
   * @param {string} vendedorId - ID del vendedor
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  getPlanesByVendedor: (vendedorId) => apiRequest(`/ventas/planes/vendedor/${vendedorId}`, {
    method: 'GET',
    ...withAuth()
  }),

  /**
   * Obtener todos los planes de venta
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  getAllPlanes: () => apiRequest('/ventas/planes', {
    method: 'GET',
    ...withAuth()
  })
};

export default planesVentaService;
