/**
 * Servicio para manejar todas las llamadas a la API
 */

import { mockApiRequest } from './mockApi';

// Configuración base para las llamadas a la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;
const BASE_API_URL = `${API_BASE_URL}/${API_VERSION}`;

// Endpoints
const ENDPOINTS = {
  auth: import.meta.env.VITE_AUTH_ENDPOINT,
  login: import.meta.env.VITE_LOGIN_ENDPOINT,
  refreshToken: import.meta.env.VITE_REFRESH_TOKEN_ENDPOINT,
  inventory: import.meta.env.VITE_INVENTORY_ENDPOINT,
  products: import.meta.env.VITE_PRODUCTS_ENDPOINT,
  suppliers: import.meta.env.VITE_SUPPLIERS_ENDPOINT,
  orders: import.meta.env.VITE_ORDERS_ENDPOINT,
  logistics: import.meta.env.VITE_LOGISTICS_ENDPOINT,
  sales: import.meta.env.VITE_SALES_ENDPOINT,
  customers: import.meta.env.VITE_CUSTOMERS_ENDPOINT,
  reports: import.meta.env.VITE_REPORTS_ENDPOINT,
};

// Verificar si estamos en modo desarrollo y usando mocks
const USE_MOCKS = import.meta.env.VITE_USE_MOCK_API === 'true';

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
const withAuth = (options = {}) => {
  const token = localStorage.getItem('access_token'); // Cambiado a access_token según la estructura de la API
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
const apiRequest = async (endpoint, options = {}) => {
  // Si estamos usando mocks, usar el servicio de mock
  if (USE_MOCKS) {
    return mockApiRequest(endpoint, options);
  }

  const url = `${BASE_API_URL}${endpoint}`;
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

/**
 * Servicios de API organizados por recurso
 */
export const api = {
  auth: {
    login: (credentials) => apiRequest(`/api/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    refreshToken: () => apiRequest(`${ENDPOINTS.auth}${ENDPOINTS.refreshToken}`, {
      method: 'POST',
      ...withAuth(),
    }),
  },
  inventory: {
    getAll: () => apiRequest(ENDPOINTS.inventory, withAuth()),
    getById: (id) => apiRequest(`${ENDPOINTS.inventory}/${id}`, withAuth()),
    create: (data) => apiRequest(ENDPOINTS.inventory, {
      method: 'POST',
      body: JSON.stringify(data),
      ...withAuth(),
    }),
    update: (id, data) => apiRequest(`${ENDPOINTS.inventory}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...withAuth(),
    }),
    delete: (id) => apiRequest(`${ENDPOINTS.inventory}/${id}`, {
      method: 'DELETE',
      ...withAuth(),
    }),
  },
  // Añadir otros recursos según sea necesario...
};

export default api;
