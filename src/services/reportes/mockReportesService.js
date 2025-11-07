/**
 * Servicio de reportes simulado para desarrollo
 */

// Mock data para KPIs de vendedores
const mockVendedoresKPIs = {
  '123456': {
    vendedorNombre: 'Edwin Gutiérrez',
    vendedorId: '123456',
    ventasTotales: 15750000,
    pedidosGestionados: 45,
    valorPromedioPedido: 350000
  },
  '123457': {
    vendedorNombre: 'Maria Rodriguez',
    vendedorId: '123457',
    ventasTotales: 22400000,
    pedidosGestionados: 67,
    valorPromedioPedido: 334328
  },
  '123458': {
    vendedorNombre: 'Martin Lopez',
    vendedorId: '123458',
    ventasTotales: 8900000,
    pedidosGestionados: 28,
    valorPromedioPedido: 317857
  },
  '123459': {
    vendedorNombre: 'Dolores Hernandez',
    vendedorId: '123459',
    ventasTotales: 19250000,
    pedidosGestionados: 53,
    valorPromedioPedido: 363208
  },
  '123460': {
    vendedorNombre: 'Ana Martinez',
    vendedorId: '123460',
    ventasTotales: 31500000,
    pedidosGestionados: 89,
    valorPromedioPedido: 353933
  },
  '485aea2c-f7a9-4be8-ac50-995be21b3e1b': {
    vendedorNombre: 'Juan Mexico',
    vendedorId: '485aea2c-f7a9-4be8-ac50-995be21b3e1b',
    ventasTotales: 12300000,
    pedidosGestionados: 34,
    valorPromedioPedido: 361765
  },
  '7984f866-1b6d-4bba-99ae-2ad727df6db0': {
    vendedorNombre: 'Test',
    vendedorId: '7984f866-1b6d-4bba-99ae-2ad727df6db0',
    ventasTotales: 0,
    pedidosGestionados: 1,
    valorPromedioPedido: 0
  },
  '8586d56a-b307-4266-9157-4f5c1cda1506': {
    vendedorNombre: 'Test',
    vendedorId: '8586d56a-b307-4266-9157-4f5c1cda1506',
    ventasTotales: 5600000,
    pedidosGestionados: 18,
    valorPromedioPedido: 311111
  },
  '7748bb9d-8eab-47c1-ada8-522dd7765478': {
    vendedorNombre: 'Vendedor Mexico',
    vendedorId: '7748bb9d-8eab-47c1-ada8-522dd7765478',
    ventasTotales: 18700000,
    pedidosGestionados: 52,
    valorPromedioPedido: 359615
  }
};

/**
 * Servicio de reportes mock
 */
const mockReportesService = {
  /**
   * Simulación de obtener KPIs de un vendedor
   * @param {string} vendedorId - ID del vendedor
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  getVendedorKPIs: async (vendedorId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Obtener KPIs del vendedor especificado
    const kpis = mockVendedoresKPIs[vendedorId];
    
    if (!kpis) {
      return {
        success: false,
        message: 'Vendedor no encontrado',
        status: 404
      };
    }
    
    return {
      success: true,
      result: [kpis],
      timestamp: new Date().toISOString()
    };
  }
};

export default mockReportesService;
