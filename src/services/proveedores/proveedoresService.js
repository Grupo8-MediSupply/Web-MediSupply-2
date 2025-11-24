/**
 * Implementación real de servicios de proveedores
 * Se conecta a la API backend
 */
import { apiRequest, withAuth } from '../apiClient';

// Servicio real conectado a API
const proveedoresService = {
  // Obtener proveedores por país
  getProveedores: (paisId) => apiRequest(`/proveedores/${paisId}`, {
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
  }),
  
  // Obtener historial de compras de un proveedor
  getHistorialCompras: ({ proveedorId, fechaInicio, fechaFin }) => {
    const params = new URLSearchParams({ proveedorId });
    
    // Solo agregar fechas si están presentes
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);
    
    const url = `/proveedores/compras/historial?${params.toString()}`;
    console.log('🔍 Historial Compras Request:', {
      url,
      fullUrl: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}${url}`,
      params: { proveedorId, fechaInicio, fechaFin },
      queryString: params.toString()
    });
    
    return apiRequest(url, {
      method: 'GET',
      ...withAuth()
    });
  }
};

export default proveedoresService;
