/**
 * Servicios de auditoría para comunicarse con la API
 */
import { apiRequest, withAuth } from '../apiClient';

/**
 * Servicio de auditoría
 */
const auditoriaService = {
  /**
   * Obtener todas las auditorías
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  getAuditorias: () => apiRequest('/auditorias', {
    method: 'GET',
    ...withAuth()
  }),
};

export default auditoriaService;
