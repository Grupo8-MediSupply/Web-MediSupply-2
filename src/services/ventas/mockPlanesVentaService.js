/**
 * Servicio de planes de venta simulado para desarrollo
 */

// Mock data para planes de venta (usar let para poder modificarlo)
let mockPlanes = [
  {
    id: 'plan-001',
    nombre: 'Campaña Q1 2025',
    vendedorId: '123456',
    vendedorNombre: 'Edwin Gutiérrez',
    montoMeta: 5000000,
    montoActual: 3500000,
    inicio: '01/01/2025',
    fin: '31/03/2025',
    descripcion: 'Plan trimestral de ventas para el primer trimestre',
    estado: 'ACTIVO'
  },
  {
    id: 'plan-002',
    nombre: 'Promoción Verano',
    vendedorId: '123457',
    vendedorNombre: 'Maria Rodriguez',
    montoMeta: 3000000,
    montoActual: 2800000,
    inicio: '01/06/2025',
    fin: '31/08/2025',
    descripcion: 'Campaña de verano con productos especiales',
    estado: 'ACTIVO'
  }
];

/**
 * Servicio de planes de venta mock
 */
const mockPlanesVentaService = {
  /**
   * Simulación de crear un nuevo plan de venta
   * @param {Object} planData - Datos del plan
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  createPlanVenta: async (planData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validar datos requeridos
    if (!planData.nombre || !planData.vendedorId || !planData.montoMeta || !planData.inicio || !planData.fin) {
      return {
        success: false,
        message: 'Campos requeridos: nombre, vendedorId, montoMeta, inicio, fin',
        status: 400
      };
    }

    // Validar formato de fechas (DD/MM/YYYY)
    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!fechaRegex.test(planData.inicio) || !fechaRegex.test(planData.fin)) {
      return {
        success: false,
        message: 'Las fechas deben estar en formato DD/MM/YYYY',
        status: 400
      };
    }

    const newPlan = {
      id: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      nombre: planData.nombre,
      vendedorId: planData.vendedorId,
      montoMeta: Number(planData.montoMeta),
      montoActual: 0,
      inicio: planData.inicio,
      fin: planData.fin,
      descripcion: planData.descripcion || '',
      estado: 'ACTIVO'
    };

    // Crear una nueva copia del array con el nuevo plan
    mockPlanes = [...mockPlanes, newPlan];

    return {
      success: true,
      result: {
        id: newPlan.id,
        nombre: newPlan.nombre,
        vendedorId: newPlan.vendedorId,
        montoMeta: newPlan.montoMeta,
        inicio: newPlan.inicio,
        fin: newPlan.fin,
        descripcion: newPlan.descripcion
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Simulación de obtener planes por vendedor
   * @param {string} vendedorId - ID del vendedor
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  getPlanesByVendedor: async (vendedorId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const planes = mockPlanes.filter(plan => plan.vendedorId === vendedorId);
    
    return {
      success: true,
      result: planes,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Simulación de obtener todos los planes
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  getAllPlanes: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      result: [...mockPlanes], // Devolver una copia del array
      timestamp: new Date().toISOString()
    };
  }
};

export default mockPlanesVentaService;
