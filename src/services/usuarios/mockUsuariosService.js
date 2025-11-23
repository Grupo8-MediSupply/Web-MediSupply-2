/**
 * Servicio mock de usuarios para desarrollo local
 */

// Datos mock de usuarios
let mockUsuarios = [
  {
    id: "70ec6e42-0bd4-4855-92b5-eb39ce5ee6c0",
    email: "gcp10@correo.com.co",
    rolId: 40,
    activo: true,
    tipoIdentificacion: 2,
    identificacion: "1098722211"
  },
  {
    id: "5950e0fd-a13f-4cba-812e-d4d4bcdc0efd",
    email: "gcp1020@correo.com.co",
    rolId: 40,
    activo: true,
    tipoIdentificacion: 2,
    identificacion: "00000000"
  },
  {
    id: "cd8b76b4-3402-47fc-b12d-fdb1a5793f66",
    email: "testedgar@admin.com",
    rolId: 40,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "88888888"
  },
  {
    id: "ff53c207-1e84-4e3b-bab5-df06b2bfe8cb",
    email: "ed.admin@test.com",
    rolId: 40,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "888888888"
  },
  {
    id: "6c3b2b1b-8bd9-4064-b066-4987157c2615",
    email: "contacto1@clinicasanjose.example",
    rolId: 30,
    activo: true,
    tipoIdentificacion: 2,
    identificacion: "1234567890"
  },
  {
    id: "874467a4-4254-4bc5-9102-564930248798",
    email: "admin.colombia@example.com",
    rolId: 1,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "800000001"
  },
  {
    id: "579eb5ba-f990-425d-87a2-4336f657190b",
    email: "eduar@labuenadosis.co",
    rolId: 30,
    activo: true,
    tipoIdentificacion: 2,
    identificacion: "8899765"
  },
  {
    id: "7a89b952-aa5b-4f16-95d5-30e845111c9f",
    email: "edgartest@clinicasanjose.example",
    rolId: 30,
    activo: true,
    tipoIdentificacion: 2,
    identificacion: "987654321"
  },
  {
    id: "d655b4c6-d4f5-4f23-a6ec-4a7c1f63e60c",
    email: "testeo0399@correo.com.co",
    rolId: 20,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "1098334"
  },
  {
    id: "1581ec87-cb65-423c-a582-7e71632542c2",
    email: "testemexico22@correo.com.co",
    rolId: 20,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "109833422"
  },
  {
    id: "a84c7968-5885-4769-abc5-b74cfcfd6ad6",
    email: "vendedortest2@correo.com.co",
    rolId: 20,
    activo: true,
    tipoIdentificacion: 3,
    identificacion: "6273892"
  },
  {
    id: "7c5cb4bd-1064-4ca5-9c32-04cc258067bc",
    email: "edgar@test.com",
    rolId: 20,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "00000000"
  },
  {
    id: "5240c2fe-9641-4c9d-b438-df7c6ec144be",
    email: "edgartest2@test.com",
    rolId: 20,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "0000000"
  },
  {
    id: "4cf75bd0-de1e-4ac9-9f2a-953e74012178",
    email: "test2410@admin.com",
    rolId: 20,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "999999999"
  },
  {
    id: "0d5fdae6-342e-4f70-b641-0f8abcabed57",
    email: "contacto@imbogota.com.co",
    rolId: 40,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "CO9001001"
  },
  {
    id: "154ab403-bd70-4dd8-a316-588b6bed538c",
    email: "ventas@proveedoraandina.com.co",
    rolId: 40,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "CO9001003"
  },
  {
    id: "6c5c3509-8108-4b68-8b3f-4a2ca89f9051",
    email: "ventas@dccaribe.com.co",
    rolId: 40,
    activo: true,
    tipoIdentificacion: 1,
    identificacion: "CO9001005"
  },
  {
    id: "45800d22-e22d-4fd7-8f08-a32056a414f9",
    email: "vendedorcolobmia@correo.com.co",
    rolId: 20,
    activo: false,
    tipoIdentificacion: 1,
    identificacion: "1098334"
  },
  {
    id: "955d164d-0e4c-4393-9c35-6ef732e26411",
    email: "contacto@clinicasanjose.example",
    rolId: 30,
    activo: true,
    tipoIdentificacion: 2,
    identificacion: "1234567890"
  },
  {
    id: "86a5caa2-46e2-40fc-a743-da8c74f5102a",
    email: "test@mail.com",
    rolId: 30,
    activo: true,
    tipoIdentificacion: 2,
    identificacion: "7777777"
  }
];

/**
 * Simula un delay de red
 */
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

/**
 * Servicio mock de usuarios
 */
const mockUsuariosService = {
  /**
   * Obtener todos los usuarios
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  getUsuarios: async () => {
    await simulateDelay();
    
    return {
      success: true,
      result: mockUsuarios,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Actualizar estado activo de un usuario
   * @param {string} idUsuario - ID del usuario
   * @param {boolean} activo - Nuevo estado activo
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  updateUsuarioEstado: async (idUsuario, activo) => {
    await simulateDelay();

    const usuarioIndex = mockUsuarios.findIndex(u => u.id === idUsuario);
    
    if (usuarioIndex === -1) {
      return {
        success: false,
        message: 'Usuario no encontrado',
        timestamp: new Date().toISOString()
      };
    }

    mockUsuarios[usuarioIndex].activo = activo;

    return {
      success: true,
      timestamp: new Date().toISOString()
    };
  }
};

export default mockUsuariosService;
