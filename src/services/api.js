/**
 * Punto de entrada principal para todos los servicios API
 * Importa y exporta servicios desde sus respectivos dominios
 */

// Importar servicios por dominio
import authService from './auth';
import vendedoresService from './vendedores';
import proveedoresService from './proveedores';
import catalogoService from './catalogo/index';
import reportesService from './reportes';
import logisticaService from './logistica';
import { planesVentaService } from './ventas';
import auditoriaService from './auditoria';

// Exportar todos los servicios agrupados por dominio
export const api = {
  auth: authService,
  vendedores: vendedoresService,
  proveedores: proveedoresService,
  catalogo: catalogoService,
  reportes: reportesService,
  logistica: logisticaService,
  planesVenta: planesVentaService,
  auditoria: auditoriaService,
  // En el futuro, otros dominios se añadirán aquí:
  // inventory: inventoryService,
  // catalog: catalogService,
  // etc.
};

export default api;
