/**
 * Servicio de mock para simular respuestas de API durante desarrollo
 * Delega a servicios de dominio específicos según el endpoint
 */

import mockAuthService from './auth/mockAuthService';
import mockAuditoriaService from './auditoria/mockAuditoriaService';

/**
 * Simula una petición a la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones de fetch
 * @returns {Promise} - Promesa con la respuesta simulada
 */
export const mockApiRequest = async (endpoint, options = {}) => {
  console.log(`Mock API Request to: ${endpoint}`, options);
  
  // Determinar qué servicio de dominio debe manejar la petición
  
  // Endpoints de autenticación
  if (endpoint === '/api/login') {
    try {
      const credentials = JSON.parse(options.body);
      return await mockAuthService.login(credentials);
    } catch (error) {
      return {
        success: false,
        message: 'Error en el formato de la petición',
        status: 400
      };
    }
  }
  
  if (endpoint === '/api/refresh-token') {
    return await mockAuthService.refreshToken();
  }
  
  if (endpoint === '/api/logout') {
    return await mockAuthService.logout();
  }
  
  // Endpoints de auditoría
  if (endpoint === '/api/auditorias') {
    return await mockAuditoriaService.getAuditorias();
  }
  
  // Si no es un endpoint conocido, devolver error
  return {
    success: false,
    timestamp: new Date().toISOString(),
    path: endpoint,
    method: options.method || 'GET',
    status: 404,
    message: 'Endpoint not found in mock API'
  };
};

export default mockApiRequest;
