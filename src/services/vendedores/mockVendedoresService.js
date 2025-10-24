/**
 * Servicio de vendedores simulado para desarrollo
 */

// Mock data para vendedores
const mockVendedores = [
  { id: '123456', nombre: 'Edwin', territorio: 'Colombia', visitasCompletadas: 15, visitasProgramadas: 20, pais: '10', email: 'edwin@example.com' },
  { id: '123457', nombre: 'Maria', territorio: 'Colombia', visitasCompletadas: 18, visitasProgramadas: 20, pais: '10', email: 'maria@example.com' },
  { id: '123458', nombre: 'Martin', territorio: 'Colombia', visitasCompletadas: 10, visitasProgramadas: 15, pais: '10', email: 'martin@example.com' },
  { id: '123459', nombre: 'Dolores', territorio: 'Colombia', visitasCompletadas: 12, visitasProgramadas: 15, pais: '10', email: 'dolores@example.com' },
  { id: '123460', nombre: 'Ana', territorio: 'Colombia', visitasCompletadas: 20, visitasProgramadas: 20, pais: '10', email: 'ana@example.com' },
  { id: '234567', nombre: 'Juan', territorio: 'México', visitasCompletadas: 8, visitasProgramadas: 15, pais: '20', email: 'juan@example.com' },
  { id: '345678', nombre: 'Carlos', territorio: 'Argentina', visitasCompletadas: 12, visitasProgramadas: 18, pais: '10', email: 'carlos@example.com' },
  { id: '456789', nombre: 'Sofía', territorio: 'Perú', visitasCompletadas: 7, visitasProgramadas: 10, pais: '10', email: 'sofia@example.com' },
  { id: '567890', nombre: 'Valentina', territorio: 'Chile', visitasCompletadas: 14, visitasProgramadas: 15, pais: '10', email: 'valentina@example.com' },
  { id: '678901', nombre: 'Ricardo', territorio: 'México', visitasCompletadas: 6, visitasProgramadas: 12, pais: '20', email: 'ricardo@example.com' },
];

// Obtener el token JWT del localStorage
const getTokenPais = () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) return '10'; // Default to Colombia (10) if no token exists

    // Extraer la parte de datos del token
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.pais || '10'; // Default a Colombia si no existe
  } catch (error) {
    console.error('Error al decodificar token:', error);
    return '10'; // Default a Colombia en caso de error
  }
};

/**
 * Servicio de vendedores mock
 */
const mockVendedoresService = {
  /**
   * Simulación de crear un nuevo vendedor
   * @param {Object} vendedorData - Datos del vendedor (nombre, email)
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  createVendedor: async (vendedorData) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia

    // Validar datos requeridos
    if (!vendedorData.nombre || !vendedorData.email || !vendedorData.identificacion || !vendedorData.tipoIdentificacion) {
      return {
        success: false,
        message: 'Todos los campos son requeridos',
        status: 400
      };
    }

    const paisCreacion = getTokenPais();

    // Simulación de respuesta exitosa
    return {
      success: true,
      result: {
        email: vendedorData.email,
        paisCreacion: paisCreacion
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Simulación de obtener lista de vendedores
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  getVendedores: async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia
    
    const userPais = getTokenPais();
    
    // Si es admin o no tiene país definido, devolver todos los vendedores
    if (!userPais) {
      return {
        success: true,
        result: mockVendedores,
        timestamp: new Date().toISOString()
      };
    }
    
    // Filtrar vendedores por país del usuario
    const filteredVendedores = mockVendedores.filter(
      vendedor => vendedor.pais === userPais
    );
    
    return {
      success: true,
      result: filteredVendedores,
      timestamp: new Date().toISOString()
    };
  }
};

export default mockVendedoresService;
