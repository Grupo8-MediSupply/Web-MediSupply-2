/**
 * Implementación real de servicios de proveedores
 * Se conecta a la API backend
 */
import { apiRequest, withAuth } from '../apiClient';

// Servicio real conectado a API
const proveedoresService = {
  // Obtener todos los proveedores
  getProveedores: () => apiRequest('/proveedores', {
    method: 'GET',
    ...withAuth()
  }),
  
  // Obtener un proveedor por ID
  getProveedorById: (id) => apiRequest(`/proveedores/${id}`, {
    method: 'GET',
    ...withAuth()
  }),
  
  // Crear un nuevo proveedor
  createProveedor: (proveedorData) => apiRequest('/proveedores', {
    method: 'POST',
    body: JSON.stringify(proveedorData),
    ...withAuth()
  })
};

export default proveedoresService;
