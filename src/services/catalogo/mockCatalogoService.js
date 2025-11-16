const mockCatalogoService = {
  getProductos: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      result: [
        {
          productoRegionalId: "03700796-ef17-4923-8368-22d718c5a5cd",
          sku: "MED-20",
          nombre: "Paracetamol 800mg",
          descripcion: "Analgésico y antipirético",
          tipo: "MEDICAMENTO",
          precio: 80000,
          medicamento: {
            principioActivo: "Paracetamol",
            concentracion: "800mg",
            formaFarmaceutica: "Tableta"
          }
        },
        {
          productoRegionalId: "315b0fef-cbf0-4631-8665-aeeb18501863",
          sku: "MED-201",
          nombre: "Loratadina 500mg",
          descripcion: "Antihistamínico de segunda generación",
          tipo: "MEDICAMENTO",
          precio: 20000,
          medicamento: {
            principioActivo: "Loratadina",
            concentracion: "500mg",
            formaFarmaceutica: "Tableta"
          }
        },
        {
          productoRegionalId: "med-003",
          sku: "MED-003",
          nombre: "Ibuprofeno 600mg",
          descripcion: "Antiinflamatorio no esteroideo",
          tipo: "MEDICAMENTO",
          precio: 35000,
          medicamento: {
            principioActivo: "Ibuprofeno",
            concentracion: "600mg",
            formaFarmaceutica: "Tableta"
          }
        },
        {
          productoRegionalId: "eb4f201e-8584-4823-a472-e76a9a5963f2",
          sku: "INS-001",
          nombre: "Guantes de nitrilo",
          descripcion: "Guantes desechables esterilizados",
          tipo: "INSUMO",
          precio: 5000,
          insumoMedico: {
            material: "Nitrilo",
            esteril: true,
            usoUnico: true
          }
        },
        {
          productoRegionalId: "ins-002",
          sku: "INS-002",
          nombre: "Jeringas 10ml",
          descripcion: "Jeringas desechables con aguja",
          tipo: "INSUMO",
          precio: 3500,
          insumoMedico: {
            material: "Plástico",
            esteril: true,
            usoUnico: true
          }
        },
        {
          productoRegionalId: "ins-003",
          sku: "INS-003",
          nombre: "Vendas elásticas",
          descripcion: "Vendas reutilizables de algodón",
          tipo: "INSUMO",
          precio: 8000,
          insumoMedico: {
            material: "Algodón",
            esteril: false,
            usoUnico: false
          }
        },
        {
          productoRegionalId: "fc39e714-202e-4cd4-adbf-514cd93d5c70",
          sku: "EQP-001",
          nombre: "Centrifugadora",
          descripcion: "Centrifugadora de laboratorio para plasma",
          tipo: "EQUIPO",
          precio: 5000000,
          equipoMedico: {
            marca: "Acme Medical",
            modelo: "CM-232FSD",
            vidaUtil: 10,
            requiereMantenimiento: true
          }
        },
        {
          productoRegionalId: "eqp-002",
          sku: "EQP-002",
          nombre: "Nebulizador ultrasónico",
          descripcion: "Nebulizador para terapia respiratoria",
          tipo: "EQUIPO",
          precio: 350000,
          equipoMedico: {
            marca: "Philips",
            modelo: "InnoSpire Go",
            vidaUtil: 5,
            requiereMantenimiento: true
          }
        },
        {
          productoRegionalId: "eqp-003",
          sku: "EQP-003",
          nombre: "Tensiómetro digital",
          descripcion: "Tensiómetro automático de brazo",
          tipo: "EQUIPO",
          precio: 120000,
          equipoMedico: {
            marca: "Omron",
            modelo: "HEM-7120",
            vidaUtil: 7,
            requiereMantenimiento: false
          }
        }
      ],
      timestamp: new Date().toISOString()
    };
  },

  createProducto: async (productoData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockResponse = {
      success: true,
      result: {
        productoRegionalId: `${productoData.tipo.toLowerCase()}-${Date.now()}`,
        sku: productoData.sku,
        nombre: productoData.nombre,
        descripcion: productoData.descripcion,
        tipo: productoData.tipo,
        precio: productoData.precioVenta,
        proveedorId: productoData.proveedorId,
        ...(productoData.medicamento && { medicamento: productoData.medicamento }),
        ...(productoData.insumoMedico && { insumoMedico: productoData.insumoMedico }),
        ...(productoData.equipoMedico && { equipoMedico: productoData.equipoMedico })
      },
      timestamp: new Date().toISOString()
    };
    return mockResponse;
  },

  getProductoById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Datos de prueba completos para cada tipo
    const productos = {
      // MEDICAMENTO 1 - Paracetamol
      "03700796-ef17-4923-8368-22d718c5a5cd": {
        producto_info: {
          id: "03700796-ef17-4923-8368-22d718c5a5cd",
          createdAt: "2025-11-07T04:44:19.397Z",
          updatedAt: "2025-11-07T04:44:19.397Z",
          sku: "MED-20",
          nombre: "Paracetamol 800mg",
          descripcion: "Analgésico y antipirético de uso común para el alivio del dolor y la fiebre",
          principioActivo: "Paracetamol",
          concentracion: "800mg",
          formaFarmaceutica: "Tableta"
        },
        tipo: "MEDICAMENTO",
        precio: 80000,
        proveedor: {
          id: "18c1a721-39f6-4f55-9b83-51cee9cfb96e",
          nombre: "FarmaLatam S.A.",
          pais: "Colombia"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [
              { loteId: "ce471079-7433-4e11-b238-750c006aaff3", cantidad: 3000 },
              { loteId: "lote-002", cantidad: 1500 }
            ]
          },
          {
            bodegaId: "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
            bodegaNombre: "Occidente",
            lotes: [{ loteId: "lote-003", cantidad: 2000 }]
          }
        ]
      },
      
      // MEDICAMENTO 2 - Loratadina
      "315b0fef-cbf0-4631-8665-aeeb18501863": {
        producto_info: {
          id: "315b0fef-cbf0-4631-8665-aeeb18501863",
          createdAt: "2025-11-07T04:44:19.397Z",
          updatedAt: "2025-11-07T04:44:19.397Z",
          sku: "MED-201",
          nombre: "Loratadina 500mg",
          descripcion: "Antihistamínico de segunda generación para alergias",
          principioActivo: "Loratadina",
          concentracion: "500mg",
          formaFarmaceutica: "Tableta"
        },
        tipo: "MEDICAMENTO",
        precio: 20000,
        proveedor: {
          id: "18c1a721-39f6-4f55-9b83-51cee9cfb96e",
          nombre: "FarmaLatam S.A.",
          pais: "Colombia"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
            bodegaNombre: "Occidente",
            lotes: [{ loteId: "ee2ab508-97b5-4397-b686-68922c3e451a", cantidad: 4500 }]
          }
        ]
      },
      
      // MEDICAMENTO 3 - Ibuprofeno
      "med-003": {
        producto_info: {
          id: "med-003",
          createdAt: "2025-11-07T04:44:19.397Z",
          updatedAt: "2025-11-07T04:44:19.397Z",
          sku: "MED-003",
          nombre: "Ibuprofeno 600mg",
          descripcion: "Antiinflamatorio no esteroideo (AINE)",
          principioActivo: "Ibuprofeno",
          concentracion: "600mg",
          formaFarmaceutica: "Tableta recubierta"
        },
        tipo: "MEDICAMENTO",
        precio: 35000,
        proveedor: {
          id: "18c1a721-39f6-4f55-9b83-51cee9cfb96e",
          nombre: "FarmaLatam S.A.",
          pais: "Colombia"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [{ loteId: "lote-ibu-001", cantidad: 2500 }]
          }
        ]
      },
      
      // INSUMO 1 - Guantes
      "eb4f201e-8584-4823-a472-e76a9a5963f2": {
        producto_info: {
          id: "eb4f201e-8584-4823-a472-e76a9a5963f2",
          createdAt: "2025-11-07T05:45:17.550Z",
          updatedAt: "2025-11-07T05:45:17.550Z",
          sku: "INS-001",
          nombre: "Guantes de nitrilo",
          descripcion: "Guantes desechables esterilizados, talla M",
          material: "Nitrilo",
          esteril: true,
          usoUnico: true
        },
        tipo: "INSUMO",
        precio: 5000,
        proveedor: {
          id: "prov-002",
          nombre: "MediSupply Internacional",
          pais: "México"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [
              { loteId: "lote-guantes-001", cantidad: 15000 },
              { loteId: "lote-guantes-002", cantidad: 8000 }
            ]
          },
          {
            bodegaId: "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
            bodegaNombre: "Occidente",
            lotes: [{ loteId: "lote-guantes-003", cantidad: 12000 }]
          }
        ]
      },
      
      // INSUMO 2 - Jeringas
      "ins-002": {
        producto_info: {
          id: "ins-002",
          createdAt: "2025-11-07T05:45:17.550Z",
          updatedAt: "2025-11-07T05:45:17.550Z",
          sku: "INS-002",
          nombre: "Jeringas 10ml",
          descripcion: "Jeringas desechables con aguja calibre 21G",
          material: "Plástico médico",
          esteril: true,
          usoUnico: true
        },
        tipo: "INSUMO",
        precio: 3500,
        proveedor: {
          id: "prov-003",
          nombre: "CareTech Solutions",
          pais: "Perú"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [{ loteId: "lote-jer-001", cantidad: 5000 }]
          }
        ]
      },
      
      // INSUMO 3 - Vendas
      "ins-003": {
        producto_info: {
          id: "ins-003",
          createdAt: "2025-11-07T05:45:17.550Z",
          updatedAt: "2025-11-07T05:45:17.550Z",
          sku: "INS-003",
          nombre: "Vendas elásticas",
          descripcion: "Vendas reutilizables de algodón, 10cm x 4.5m",
          material: "Algodón elástico",
          esteril: false,
          usoUnico: false
        },
        tipo: "INSUMO",
        precio: 8000,
        proveedor: {
          id: "prov-002",
          nombre: "MediSupply Internacional",
          pais: "México"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
            bodegaNombre: "Occidente",
            lotes: [{ loteId: "lote-ven-001", cantidad: 800 }]
          }
        ]
      },
      
      // EQUIPO 1 - Centrifugadora
      "fc39e714-202e-4cd4-adbf-514cd93d5c70": {
        producto_info: {
          id: "fc39e714-202e-4cd4-adbf-514cd93d5c70",
          createdAt: "2025-11-07T05:22:01.322Z",
          updatedAt: "2025-11-07T05:22:01.322Z",
          sku: "EQP-001",
          nombre: "Centrifugadora de laboratorio",
          descripcion: "Centrifugadora de mesa para separación de plasma y suero, 6 tubos",
          marca: "Acme Medical",
          modelo: "CM-232FSD",
          vidaUtil: 10,
          requiereMantenimiento: true
        },
        tipo: "EQUIPO",
        precio: 5000000,
        proveedor: {
          id: "prov-004",
          nombre: "Equipos Médicos Avanzados",
          pais: "Chile"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [{ loteId: "lote-cent-001", cantidad: 3 }]
          }
        ]
      },
      
      // EQUIPO 2 - Nebulizador
      "eqp-002": {
        producto_info: {
          id: "eqp-002",
          createdAt: "2025-11-07T05:22:01.322Z",
          updatedAt: "2025-11-07T05:22:01.322Z",
          sku: "EQP-002",
          nombre: "Nebulizador ultrasónico",
          descripcion: "Nebulizador portátil para terapia respiratoria domiciliaria",
          marca: "Philips",
          modelo: "InnoSpire Go",
          vidaUtil: 5,
          requiereMantenimiento: true
        },
        tipo: "EQUIPO",
        precio: 350000,
        proveedor: {
          id: "prov-004",
          nombre: "Equipos Médicos Avanzados",
          pais: "Chile"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [{ loteId: "lote-neb-001", cantidad: 25 }]
          },
          {
            bodegaId: "f084da73-6d8f-4cd0-be3e-71c6f0aadce6",
            bodegaNombre: "Occidente",
            lotes: [{ loteId: "lote-neb-002", cantidad: 15 }]
          }
        ]
      },
      
      // EQUIPO 3 - Tensiómetro
      "eqp-003": {
        producto_info: {
          id: "eqp-003",
          createdAt: "2025-11-07T05:22:01.322Z",
          updatedAt: "2025-11-07T05:22:01.322Z",
          sku: "EQP-003",
          nombre: "Tensiómetro digital",
          descripcion: "Tensiómetro automático de brazo con tecnología Intellisense",
          marca: "Omron",
          modelo: "HEM-7120",
          vidaUtil: 7,
          requiereMantenimiento: false
        },
        tipo: "EQUIPO",
        precio: 120000,
        proveedor: {
          id: "prov-004",
          nombre: "Equipos Médicos Avanzados",
          pais: "Chile"
        },
        productoPaisId: "10",
        bodegas: [
          {
            bodegaId: "d4c30897-e898-42d4-b890-96ff8af955d0",
            bodegaNombre: "Central",
            lotes: [{ loteId: "lote-tens-001", cantidad: 50 }]
          }
        ]
      }
    };
    
    return {
      success: true,
      result: productos[id] || productos["03700796-ef17-4923-8368-22d718c5a5cd"],
      timestamp: new Date().toISOString()
    };
  },

  solicitarLote: async (productosLote) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validar que el array no esté vacío
    if (!Array.isArray(productosLote) || productosLote.length === 0) {
      return {
        success: false,
        message: 'Debe incluir al menos un producto en la solicitud',
        status: 400,
        timestamp: new Date().toISOString()
      };
    }

    // Validar estructura de cada producto
    for (const producto of productosLote) {
      if (!producto.sku || typeof producto.sku !== 'string') {
        return {
          success: false,
          message: 'Cada producto debe tener un SKU válido',
          status: 400,
          timestamp: new Date().toISOString()
        };
      }

      if (!producto.cantidad || typeof producto.cantidad !== 'number' || producto.cantidad <= 0) {
        return {
          success: false,
          message: `La cantidad para el producto ${producto.sku} debe ser un número mayor a 0`,
          status: 400,
          timestamp: new Date().toISOString()
        };
      }
    }

    // Simular éxito
    console.log('📦 Mock - Solicitud de lote procesada:', productosLote);
    
    return {
      success: true,
      timestamp: new Date().toISOString()
    };
  }
};

export default mockCatalogoService;
