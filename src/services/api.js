/**
 * Punto de entrada principal para todos los servicios API
 * Importa y exporta servicios desde sus respectivos dominios
 */

// Importar servicios por dominio
import authService from './auth';
import vendedoresService from './vendedores';
import proveedoresService from './proveedores';
import catalogoService from './catalogo/index';

// Exportar todos los servicios agrupados por dominio
export const api = {
  auth: authService,
  vendedores: vendedoresService,
  proveedores: proveedoresService,
  catalogo: catalogoService,
  // En el futuro, otros dominios se añadirán aquí:
  // inventory: inventoryService,
  // catalog: catalogService,
  // etc.
};

export default api;
