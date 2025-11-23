/**
 * Servicio de auditoría simulado para desarrollo
 */

const mockAuditorias = [
  {
    id: "82169918-2a93-48b9-8750-7b6d69e644e7",
    createdAt: "2025-11-23T22:06:43.997Z",
    updatedAt: "2025-11-23T22:06:48.516Z",
    accion: "Login",
    email: "admin.colombia@example.com",
    ip: "179.5.64.95",
    detalles: { status: "SUCCESS" },
    modulo: "Auth",
    severidad: "BAJA"
  },
  {
    id: "3e9414f0-f8bc-48c7-880c-102690b5a5bf",
    createdAt: "2025-11-23T18:23:06.122Z",
    updatedAt: "2025-11-23T22:06:48.516Z",
    accion: "Login",
    email: "contacto@clinicasanjose.example",
    ip: "179.5.64.95",
    detalles: { status: "SUCCESS" },
    modulo: "Auth",
    severidad: "BAJA"
  },
  {
    id: "620c6510-7232-4cbf-93ea-d220a51ba29d",
    createdAt: "2025-11-14T01:01:20.342Z",
    updatedAt: "2025-11-23T22:06:48.517Z",
    accion: "Actualizar Producto",
    email: "admin.colombia@example.com",
    ip: "181.55.23.188",
    userId: "874467a4-4254-4bc5-9102-564930248798",
    detalles: {
      tipo: "equipo",
      nombre: "Test edicion",
      precio: 290000,
      descripcion: "Medicamento para el malestar general",
      productoRegionalId: "bf30aa4f-0eab-4767-a14c-f86b7ce4e3a1"
    },
    modulo: "Productos",
    severidad: "MEDIA"
  },
  {
    id: "b8f0c1d1-e812-4e9e-98b4-c3b983c3519d",
    createdAt: "2025-11-14T00:37:40.188Z",
    updatedAt: "2025-11-23T22:06:48.517Z",
    accion: "Crear Producto",
    email: "admin.colombia@example.com",
    ip: "181.55.23.188",
    userId: "874467a4-4254-4bc5-9102-564930248798",
    detalles: {
      sku: "MED-009",
      tipo: "medicamento",
      nombre: "Noxpirin",
      precio: 10000,
      descripcion: "Medicamento para el malestar general"
    },
    modulo: "Productos",
    severidad: "MEDIA"
  },
  {
    id: "b3821a53-c054-4f4d-8d8b-20dda8a21685",
    createdAt: "2025-11-16T23:11:48.517Z",
    updatedAt: "2025-11-23T22:06:48.517Z",
    accion: "Crear Orden por Vendedor",
    email: "admin.colombia@example.com",
    ip: "181.55.23.188",
    userId: "874467a4-4254-4bc5-9102-564930248798",
    detalles: {
      id: "31de402d-61bb-4fab-bf95-f1a1952d4ad2",
      estado: "PROCESANDO"
    },
    modulo: "Ordenes",
    severidad: "ALTA"
  }
];

/**
 * Servicio de auditoría mock
 */
const mockAuditoriaService = {
  /**
   * Simulación de obtener auditorías
   * @returns {Promise} - Promesa con la respuesta simulada
   */
  getAuditorias: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      result: mockAuditorias,
      timestamp: new Date().toISOString()
    };
  }
};

export default mockAuditoriaService;
