/**
 * Implementación simulada de servicios de proveedores para desarrollo
 */

// Datos de ejemplo para proveedores
const mockProveedores = [
  { 
    id: '1', 
    nombre: 'FarmaLatam', 
    pais: 'CO',
    numeroIdentificacion: '901234567',
    email: 'contacto@farmalatam.com',
    contactoPrincipal: {
      nombre: 'Carlos Gutiérrez',
      telefono: '+57 315 789 4561'
    }
  },
  { 
    id: '2', 
    nombre: 'CareTech', 
    pais: 'PE',
    numeroIdentificacion: '56789123',
    email: 'info@caretech.com.pe',
    contactoPrincipal: {
      nombre: 'María Rojas',
      telefono: '+51 987 654 321'
    }
  },
  { 
    id: '3', 
    nombre: 'SaludGlobal', 
    pais: 'MX',
    numeroIdentificacion: '1011112131',
    email: 'contacto@saludglobal.mx',
    contactoPrincipal: {
      nombre: 'Roberto Méndez',
      telefono: '+52 55 1234 5678'
    }
  },
  { 
    id: '4', 
    nombre: 'MediSupply', 
    pais: 'CL',
    numeroIdentificacion: '456788012',
    email: 'info@medisupply.cl',
    contactoPrincipal: {
      nombre: 'Alejandra Vargas',
      telefono: '+56 9 8765 4321'
    }
  },
];

// Servicio simulado
const mockProveedoresService = {
  // Obtener todos los proveedores
  getProveedores: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          result: mockProveedores,
          message: 'Proveedores obtenidos correctamente'
        });
      }, 600); // Simular latencia
    });
  },
  
  // Obtener un proveedor por ID
  getProveedorById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const proveedor = mockProveedores.find(p => p.id === id);
        
        if (proveedor) {
          resolve({
            success: true,
            result: proveedor,
            message: 'Proveedor encontrado'
          });
        } else {
          reject({
            success: false,
            message: 'Proveedor no encontrado'
          });
        }
      }, 300);
    });
  },
  
  // Crear un nuevo proveedor
  createProveedor: async (proveedorData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validar que todos los campos requeridos estén presentes y no vacíos
    const requiredFields = [
      'nombreProveedor',
      'numeroIdentificacion',
      'pais',
      'email',
      'contactoPrincipal',
      'telefonoContacto',
      'tipoIdentificacion'
    ];

    const missingFields = requiredFields.filter(field => {
      const value = proveedorData[field];
      return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
      console.log('Campos faltantes:', missingFields);
      console.log('Datos recibidos:', proveedorData);
      return {
        success: false,
        message: `Campos requeridos faltantes: ${missingFields.join(', ')}`,
        status: 400
      };
    }

    // Si la validación pasa, retornar respuesta exitosa
    return {
      success: true,
      result: {
        id: Date.now().toString(),
        nombreProveedor: proveedorData.nombreProveedor,
        email: proveedorData.email,
        pais: proveedorData.pais
      },
      timestamp: new Date().toISOString()
    };
  },
};

export default mockProveedoresService;
