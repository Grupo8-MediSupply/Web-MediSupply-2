/**
 * Servicio de mock para simular respuestas de API durante desarrollo
 */

// Simulación de usuarios válidos para login
const mockUsers = [
  {
    email: "admin@medisupply.com",
    password: "admin123",
    role: "20",
    userId: "00854bb1-488a-4a2d-ba62-e90004b5d462"
  },
  {
    email: "test20@correo.com.co",
    password: "deploy1",
    role: "20",
    userId: "12345678-488a-4a2d-ba62-e90004b5d462"
  }
];

// Genera un token JWT simulado
const generateMockToken = (userId, role) => {
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({
      sub: userId,
      role: role,
      pais: "10",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    })
  )}.mockSignature123456789`;
};

/**
 * Simula una petición a la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones de fetch
 * @returns {Promise} - Promesa con la respuesta simulada
 */
export const mockApiRequest = async (endpoint, options = {}) => {
  console.log(`Mock API Request to: ${endpoint}`, options);
  
  // Simular tiempo de respuesta de la API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Procesamiento de endpoints específicos
  if (endpoint === '/api/login') {
    return handleMockLogin(options);
  }
  
  // Si no es un endpoint conocido, devolver error
  return {
    success: false,
    timestamp: new Date().toISOString(),
    path: endpoint,
    method: options.method || 'GET',
    status: 404,
    message: 'Endpoint not found in mock API'
  };
};

/**
 * Maneja el mock del endpoint de login
 * @param {Object} options - Opciones de la petición
 * @returns {Object} - Respuesta simulada
 */
const handleMockLogin = (options) => {
  try {
    const body = JSON.parse(options.body);
    const { email, password } = body;
    
    // Buscar usuario
    const user = mockUsers.find(u => u.email === email);
    
    // Si no se encuentra el usuario
    if (!user) {
      return {
        success: false,
        timestamp: new Date().toISOString(),
        path: '/api/login',
        method: 'POST',
        status: 401,
        message: 'Usuario no encontrado'
      };
    }
    
    // Si la contraseña es incorrecta
    if (user.password !== password) {
      return {
        success: false,
        timestamp: new Date().toISOString(),
        path: '/api/login',
        method: 'POST',
        status: 401,
        message: 'Contraseña incorrecta'
      };
    }
    
    // Generar token
    const token = generateMockToken(user.userId, user.role);
    
    // Login exitoso
    return {
      success: true,
      result: {
        access_token: token
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      path: '/api/login',
      method: 'POST',
      status: 400,
      message: 'Invalid request body'
    };
  }
};

export default mockApiRequest;
