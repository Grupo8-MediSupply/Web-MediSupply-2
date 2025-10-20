/**
 * Servicio de autenticación simulado para desarrollo
 */

// Simulación de usuarios válidos para login
const mockUsers = [
  {
    email: "admin@medisupply.com",
    password: "admin123",
    role: "1", // ADMIN
    userId: "00854bb1-488a-4a2d-ba62-e90004b5d462",
    pais: "10" // Colombia
  },
  {
    email: "test20@correo.com.co",
    password: "deploy1",
    role: "20", // VENDEDOR
    userId: "12345678-488a-4a2d-ba62-e90004b5d462",
    pais: "10" // Colombia
  },
  {
    email: "vendedor@mexico.com",
    password: "password123",
    role: "20", // VENDEDOR
    userId: "87654321-488a-4a2d-ba62-e90004b5d462",
    pais: "20" // Mexico
  }
];

// Genera un token JWT simulado
const generateMockToken = (userId, email, role, pais) => {
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({
      sub: userId,
      email: email,
      role: role,
      pais: pais,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      aud: "medi-supply-users",
      iss: "https://autenticacion-863271810141.us-central1.run.app"
    })
  )}.mockSignature123456789`;
};

/**
 * Servicio de autenticación mock
 */
const mockAuthService = {
  /**
   * Simulación de inicio de sesión
   * @param {Object} credentials - Credenciales del usuario (email, password)
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia

    const { email, password } = credentials;
    
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
    
    // Generar token con todos los campos requeridos
    const token = generateMockToken(user.userId, user.email, user.role, user.pais);
    
    // Login exitoso
    return {
      success: true,
      result: {
        access_token: token
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Simulación de refrescar token
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  refreshToken: async () => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simular latencia
    
    // Obtener token actual
    const token = localStorage.getItem('access_token');
    if (!token) {
      return {
        success: false,
        message: 'No hay sesión activa',
        status: 401
      };
    }

    // Generar un nuevo token
    return {
      success: true,
      result: {
        access_token: token // En una implementación real se generaría un nuevo token
      },
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Simulación de cierre de sesión
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simular latencia
    
    return {
      success: true,
      message: 'Sesión cerrada correctamente',
      timestamp: new Date().toISOString()
    };
  }
};

export default mockAuthService;
