/**
 * Implementación simulada de servicios de proveedores para desarrollo
 */

// Datos de ejemplo para proveedores por país
const mockProveedoresPorPais = {
  '10': [ // Colombia
    { 
      id: '0d5fdae6-342e-4f70-b641-0f8abcabed57',
      nombreProveedor: 'Insumos Médicos Bogotá',
      email: 'contacto@imbogota.com.co',
      pais: '10',
      tipoIdentificacion: '1',
      identificacion: 'CO9001001'
    },
    { 
      id: '154ab403-bd70-4dd8-a316-588b6bed538c',
      nombreProveedor: 'Proveedora Andina',
      email: 'ventas@proveedoraandina.com.co',
      pais: '10',
      tipoIdentificacion: '1',
      identificacion: 'CO9001003'
    },
    { 
      id: '6c5c3509-8108-4b68-8b3f-4a2ca89f9051',
      nombreProveedor: 'Distribuidora Clínica del Caribe',
      email: 'ventas@dccaribe.com.co',
      pais: '10',
      tipoIdentificacion: '1',
      identificacion: 'CO9001005'
    },
    {
      id: 'cd8b76b4-3402-47fc-b12d-fdb1a5793f66',
      nombreProveedor: 'FarmaLatam S.A.',
      email: 'contacto@farmalatam.com',
      pais: '10',
      tipoIdentificacion: '2',
      identificacion: '901234567'
    }
  ],
  '20': [ // México
    { 
      id: 'mx-001',
      nombreProveedor: 'Distribuidora Médica del Norte',
      email: 'contacto@dmn.mx',
      pais: '20',
      tipoIdentificacion: '3',
      identificacion: 'MX9001001'
    },
    { 
      id: 'mx-002',
      nombreProveedor: 'Suministros Clínicos México',
      email: 'ventas@scmexico.mx',
      pais: '20',
      tipoIdentificacion: '3',
      identificacion: 'MX9001002'
    }
  ]
};

// Servicio simulado
const mockProveedoresService = {
  // Obtener proveedores por país
  getProveedores: async (paisId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const proveedores = mockProveedoresPorPais[paisId] || [];
        resolve({
          success: true,
          result: proveedores,
          timestamp: new Date().toISOString()
        });
      }, 600);
    });
  },
  
  // Obtener un proveedor por ID
  getProveedorById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const proveedor = Object.values(mockProveedoresPorPais).flat().find(p => p.id === id);
        
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

    // Crear el nuevo proveedor
    const newProveedor = {
      id: `prov-${Date.now()}`,
      nombreProveedor: proveedorData.nombreProveedor,
      email: proveedorData.email,
      pais: proveedorData.pais,
      tipoIdentificacion: proveedorData.tipoIdentificacion.toString(),
      identificacion: proveedorData.numeroIdentificacion
    };

    // Agregar el proveedor al mock data
    if (!mockProveedoresPorPais[proveedorData.pais]) {
      mockProveedoresPorPais[proveedorData.pais] = [];
    }
    mockProveedoresPorPais[proveedorData.pais].push(newProveedor);

    return {
      success: true,
      result: newProveedor,
      timestamp: new Date().toISOString()
    };
  },
};

export default mockProveedoresService;
