/**
 * Servicio de vendedores simulado para desarrollo
 */

// Mock data para vendedores por país
const mockVendedoresPorPais = {
  '10': [ // Colombia
    { 
      id: '123456', 
      nombre: 'Edwin Gutiérrez', 
      email: 'edwin@example.com',
      paisId: '10'
    },
    { 
      id: '123457', 
      nombre: 'Maria Rodriguez', 
      email: 'maria@example.com',
      paisId: '10'
    },
    { 
      id: '123458', 
      nombre: 'Martin Lopez', 
      email: 'martin@example.com',
      paisId: '10'
    },
    { 
      id: '123459', 
      nombre: 'Dolores Hernandez', 
      email: 'dolores@example.com',
      paisId: '10'
    },
    { 
      id: '123460', 
      nombre: 'Ana Martinez', 
      email: 'ana@example.com',
      paisId: '10'
    }
  ],
  '20': [ // México
    { 
      id: '485aea2c-f7a9-4be8-ac50-995be21b3e1b', 
      nombre: 'Juan Mexico', 
      email: 'vendedormexico@correo.com.co',
      paisId: '20'
    },
    { 
      id: '7984f866-1b6d-4bba-99ae-2ad727df6db0', 
      nombre: 'Test', 
      email: 'testemexico1@correo.com.co',
      paisId: '20'
    },
    { 
      id: '8586d56a-b307-4266-9157-4f5c1cda1506', 
      nombre: 'Test', 
      email: 'testemexico@correo.com.co',
      paisId: '20'
    },
    { 
      id: '7748bb9d-8eab-47c1-ada8-522dd7765478', 
      nombre: 'Vendedor Mexico', 
      email: 'vendedorm@gmail.com.co',
      paisId: '20'
    }
  ]
};

/**
 * Servicio de vendedores mock
 */
const mockVendedoresService = {
  /**
   * Simulación de crear un nuevo vendedor
   * @param {Object} vendedorData - Datos del vendedor
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  createVendedor: async (vendedorData) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validar datos requeridos
    if (!vendedorData.nombre || !vendedorData.email || !vendedorData.identificacion || !vendedorData.tipoIdentificacion) {
      return {
        success: false,
        message: 'Todos los campos son requeridos',
        status: 400
      };
    }

    // Obtener país del token
    const token = localStorage.getItem('access_token');
    let paisCreacion = '10'; // Default Colombia
    
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        paisCreacion = decodedPayload.pais || '10';
      } catch (error) {
        console.error('Error al decodificar token:', error);
      }
    }

    return {
      success: true,
      result: {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        email: vendedorData.email,
        nombre: vendedorData.nombre,
        paisCreacion: paisCreacion
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Simulación de obtener vendedores por país
   * @param {string} paisId - ID del país
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  getVendedoresByPais: async (paisId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Obtener vendedores del país especificado
    const vendedores = mockVendedoresPorPais[paisId] || [];
    
    return {
      success: true,
      result: vendedores,
      timestamp: new Date().toISOString()
    };
  }
};

export default mockVendedoresService;
