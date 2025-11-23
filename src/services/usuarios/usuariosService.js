/**
 * Servicios de usuarios para comunicarse con la API
 */
import { apiRequest, withAuth } from '../apiClient';

/**
 * Servicio de usuarios
 */
const usuariosService = {
  /**
   * Obtener todos los usuarios
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  getUsuarios: () => apiRequest('/usuarios', {
    method: 'GET',
    ...withAuth()
  }),

  /**
   * Actualizar estado activo de un usuario
   * @param {string} idUsuario - ID del usuario
   * @param {boolean} activo - Nuevo estado activo
   * @returns {Promise} - Promesa con la respuesta de la API
   */
  updateUsuarioEstado: (idUsuario, activo) => apiRequest(`/usuarios/${idUsuario}`, {
    method: 'PATCH',
    ...withAuth(),
    body: JSON.stringify({ activo })
  }),
};

export default usuariosService;
