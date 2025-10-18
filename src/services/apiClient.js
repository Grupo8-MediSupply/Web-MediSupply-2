/**
 * Cliente API base para realizar peticiones HTTP
 */

// Configuración base para las llamadas a la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;
const BASE_API_URL = `${API_BASE_URL}/${API_VERSION}`;

/**
 * Opciones por defecto para fetch
 */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Añade el token de autenticación a las opciones de la petición
 * @param {Object} options - Opciones de fetch
 * @returns {Object} - Opciones con el token incluido
 */
export const withAuth = (options = {}) => {
  const token = localStorage.getItem('access_token');
  if (!token) return options;

  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * Realiza una petición a la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones de fetch
 * @returns {Promise} - Promesa con la respuesta
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_API_URL}${endpoint}`;
  
  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    
    const responseData = await response.json();
    
    // Si la API devuelve success: false, tratar como error
    if (responseData && responseData.success === false) {
      throw new Error(responseData.message || 'Error en la petición');
    }

    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export default { apiRequest, withAuth };
