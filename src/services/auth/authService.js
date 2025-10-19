/**
 * Servicios de autenticación para comunicarse con la API
 */
import { apiRequest, withAuth } from '../apiClient';

/**
 * Servicio de autenticación
 */
const authService = {
  /**
   * Iniciar sesión de usuario
   * @param {Object} credentials - Credenciales del usuario (email, password)
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  login: (credentials) => apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  /**
   * Refrescar el token de autenticación
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  refreshToken: () => apiRequest('/refresh-token', {
    method: 'POST',
    ...withAuth(),
  }),

  /**
   * Cerrar sesión de usuario
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  logout: () => apiRequest('/logout', {
    method: 'POST',
    ...withAuth(),
  }),
};

export default authService;
