import { apiRequest, withAuth } from '../apiClient';

/**
 * @typedef {Object} Ubicacion
 * @property {number} lat - Latitud
 * @property {number} lng - Longitud
 */

/**
 * @typedef {Object} NavigationInstruction
 * @property {string} maneuver - Tipo de maniobra
 * @property {string} instructions - Instrucciones de navegación
 */

/**
 * @typedef {Object} Step
 * @property {Object} polyline - Polilínea codificada
 * @property {string} travelMode - Modo de viaje
 * @property {Object} endLocation - Ubicación final
 * @property {Object} startLocation - Ubicación inicial
 * @property {number} distanceMeters - Distancia en metros
 * @property {Object} staticDuration - Duración estática
 * @property {Object} localizedValues - Valores localizados
 * @property {NavigationInstruction} navigationInstruction - Instrucciones
 */

/**
 * @typedef {Object} Leg
 * @property {Step[]} steps - Pasos de la ruta
 * @property {Object} duration - Duración total
 * @property {Object} polyline - Polilínea del tramo
 * @property {number} distanceMeters - Distancia en metros
 * @property {Object} localizedValues - Valores localizados
 */

/**
 * @typedef {Object} Ruta
 * @property {string} vehiculoId - ID del vehículo
 * @property {string[]} ordenesIds - IDs de las órdenes
 * @property {number} distancia - Distancia total en metros
 * @property {string} duracion - Duración en segundos
 * @property {string} polilinea - Polilínea codificada
 * @property {Leg[]} legs - Tramos de la ruta
 * @property {string} rutaId - ID único de la ruta
 */

/**
 * Valida la estructura de un pedido para entregar
 * @param {Object} pedido - Pedido a validar
 * @returns {boolean} - true si es válido
 */
const validarEstructuraPedido = (pedido) => {
  if (!pedido.orden || !pedido.vehiculoAsignado) {
    console.warn('Pedido sin orden o vehículo asignado:', pedido);
    return false;
  }

  const { orden, vehiculoAsignado } = pedido;

  // Validar campos obligatorios de la orden
  if (!orden.id || !orden.estado || !orden.cliente) {
    console.warn('Orden con estructura incompleta:', orden);
    return false;
  }

  // Validar cliente
  if (!orden.cliente.id || !orden.cliente.nombre || !orden.cliente.ubicacion) {
    console.warn('Cliente con estructura incompleta:', orden.cliente);
    return false;
  }

  // Validar ubicación del cliente
  if (typeof orden.cliente.ubicacion.lat !== 'number' || 
      typeof orden.cliente.ubicacion.lng !== 'number') {
    console.warn('Ubicación del cliente inválida:', orden.cliente.ubicacion);
    return false;
  }

  // Validar bodegasOrigen
  if (!Array.isArray(orden.bodegasOrigen) || orden.bodegasOrigen.length === 0) {
    console.warn('Orden sin bodegas de origen:', orden);
    return false;
  }

  // Validar cada bodega
  for (const bodega of orden.bodegasOrigen) {
    if (!bodega.id || !bodega.ubicacion) {
      console.warn('Bodega con estructura incompleta:', bodega);
      return false;
    }
    if (typeof bodega.ubicacion.lat !== 'number' || 
        typeof bodega.ubicacion.lng !== 'number') {
      console.warn('Ubicación de bodega inválida:', bodega.ubicacion);
      return false;
    }
  }

  // Validar vehículo
  if (!vehiculoAsignado.id || !vehiculoAsignado.placa || !vehiculoAsignado.ubicacionGeografica) {
    console.warn('Vehículo con estructura incompleta:', vehiculoAsignado);
    return false;
  }

  // Validar ubicación del vehículo
  if (typeof vehiculoAsignado.ubicacionGeografica.lat !== 'number' || 
      typeof vehiculoAsignado.ubicacionGeografica.lng !== 'number') {
    console.warn('Ubicación del vehículo inválida:', vehiculoAsignado.ubicacionGeografica);
    return false;
  }

  return true;
};

const logisticaService = {
  /**
   * Obtener pedidos pendientes de entrega por rango de fechas
   * @param {string} fechaInicio - Fecha inicio (YYYY/MM/DD)
   * @param {string} fechaFin - Fecha fin (YYYY/MM/DD)
   * @returns {Promise<{success: boolean, result: Array, timestamp: string}>}
   */
  getPedidosEntregar: async (fechaInicio, fechaFin) => {
    const response = await apiRequest('/pedidos/entregar', {
      method: 'GET',
      params: { fechaInicio, fechaFin },
      ...withAuth()
    });

    // Validar y filtrar pedidos
    if (response.success && Array.isArray(response.result)) {
      const pedidosValidos = response.result.filter(validarEstructuraPedido);
      
      if (pedidosValidos.length < response.result.length) {
        console.warn(
          `${response.result.length - pedidosValidos.length} pedido(s) descartado(s) por estructura inválida`
        );
      }

      return {
        ...response,
        result: pedidosValidos
      };
    }

    return response;
  },

  /**
   * Generar rutas optimizadas usando Google Routes API
   * @param {Array} pedidos - Array de objetos {orden, vehiculoAsignado}
   * @returns {Promise<{success: boolean, result: Ruta[], timestamp: string}>}
   */
  generateRutas: (pedidos) => apiRequest('/pedidos/rutas', {
    method: 'POST',
    body: JSON.stringify(pedidos),
    ...withAuth()
  })
};

export default logisticaService;
