const mockPedidos = [
  {
    orden: {
      id: 'bbfbfc62-c3c6-49f7-854b-3dacf4b8c6cf',
      estado: 'RECIBIDO',
      cliente: {
        id: '7a89b952-aa5b-4f16-95d5-30e845111c9f',
        nombre: 'Hospital Central',
        ubicacion: { lat: 4.6533, lng: -74.0836 }
      },
      bodegasOrigen: [
        {
          id: 'f084da73-6d8f-4cd0-be3e-71c6f0aadce6',
          ubicacion: { lat: 4.6700, lng: -74.0900 }
        }
      ]
    },
    vehiculoAsignado: {
      id: '7e64d3e7-a555-4ef1-867a-d3259e91bd2f',
      placa: 'ABC-123',
      modelo: 'Furgón Mercedes',
      pais: 10,
      ubicacionGeografica: { lat: 4.6650, lng: -74.0870 },
      createdAt: '2025-11-06T02:59:45.656Z',
      updatedAt: '2025-11-06T02:59:45.656Z'
    }
  },
  {
    orden: {
      id: 'c2d4e6f8-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
      estado: 'RECIBIDO',
      cliente: {
        id: '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
        nombre: 'Clínica del Norte',
        ubicacion: { lat: 4.6900, lng: -74.0500 }
      },
      bodegasOrigen: [
        {
          id: 'f084da73-6d8f-4cd0-be3e-71c6f0aadce6',
          ubicacion: { lat: 4.6700, lng: -74.0900 }
        }
      ]
    },
    vehiculoAsignado: {
      id: '9f0a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c',
      placa: 'XYZ-789',
      modelo: 'Camioneta Toyota',
      pais: 10,
      ubicacionGeografica: { lat: 4.6750, lng: -74.0750 },
      createdAt: '2025-11-06T03:15:22.123Z',
      updatedAt: '2025-11-06T03:15:22.123Z'
    }
  },
  {
    orden: {
      id: 'd3e4f5a6-b7c8-d9e0-f1a2-b3c4d5e6f7a8',
      estado: 'EN_PROCESO',
      cliente: {
        id: 'e4f5a6b7-c8d9-e0f1-a2b3-c4d5e6f7a8b9',
        nombre: 'Farmacia Generica',
        ubicacion: { lat: 4.583109, lng: -74.083432 }
      },
      bodegasOrigen: [
        {
          id: 'd4c30897-e898-42d4-b890-96ff8af955d0',
          ubicacion: { lat: 4.6600, lng: -74.0950 }
        }
      ]
    },
    vehiculoAsignado: {
      id: 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6',
      placa: 'DEF-456',
      modelo: 'Nissan NP300',
      pais: 10,
      ubicacionGeografica: { lat: 4.6580, lng: -74.0920 },
      createdAt: '2025-11-06T04:20:33.456Z',
      updatedAt: '2025-11-06T04:20:33.456Z'
    }
  }
];

const mockLogisticaService = {
  getPedidosEntregar: async (fechaInicio, fechaFin) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filtrar pedidos por rango de fechas
    const inicio = new Date(fechaInicio.replace(/\//g, '-'));
    const fin = new Date(fechaFin.replace(/\//g, '-'));
    
    // Para los mocks, simplemente devolver todos si el rango incluye fechas recientes
    const hoy = new Date();
    const esRangoValido = inicio <= hoy && fin >= inicio;
    
    const pedidosFiltrados = esRangoValido ? mockPedidos : [];
    
    return {
      success: true,
      result: pedidosFiltrados,
      timestamp: new Date().toISOString()
    };
  },

  generateRutas: async (pedidos) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (pedidos.length === 0) {
      return {
        success: false,
        message: 'Debe seleccionar al menos un pedido'
      };
    }

    const rutasGeneradas = pedidos.map((pedido) => ({
      vehiculoId: pedido.vehiculoAsignado.id,
      ordenesIds: [pedido.orden.id],
      distancia: 3000 + Math.random() * 5000,
      duracion: `${600 + Math.floor(Math.random() * 1200)}s`,
      polilinea: 'u{|~Fzs{kM?A?A?A?A?A?A?A?A',
      legs: [
        {
          distanceMeters: 2000 + Math.random() * 3000,
          duration: `${400 + Math.floor(Math.random() * 800)}s`,
          steps: [
            {
              distanceMeters: 1000 + Math.random() * 1000,
              duration: `${200 + Math.floor(Math.random() * 400)}s`,
              startLocation: pedido.vehiculoAsignado.ubicacionGeografica,
              endLocation: pedido.bodegasOrigen[0].ubicacion,
              navigationInstruction: 'Diríjase hacia la bodega de origen'
            },
            {
              distanceMeters: 1000 + Math.random() * 1000,
              duration: `${200 + Math.floor(Math.random() * 400)}s`,
              startLocation: pedido.bodegasOrigen[0].ubicacion,
              endLocation: pedido.orden.cliente.ubicacion,
              navigationInstruction: 'Continúe hacia el destino final'
            }
          ]
        }
      ]
    }));

    return {
      success: true,
      result: rutasGeneradas,
      timestamp: new Date().toISOString()
    };
  }
};

export default mockLogisticaService;
