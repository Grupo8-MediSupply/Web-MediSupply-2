const mockPedidos = [
  {
    orden: {
      id: 'bbfbfc62-c3c6-49f7-854b-3dacf4b8c6cf',
      estado: 'RECIBIDO',
      cliente: {
        id: '7a89b952-aa5b-4f16-95d5-30e845111c9f',
        nombre: 'Farmacia Generica',
        ubicacion: { lat: 4.583109, lng: -74.083432 } // Bogotá Sur
      },
      bodegasOrigen: [
        {
          id: 'f084da73-6d8f-4cd0-be3e-71c6f0aadce6',
          ubicacion: { lat: 4.8844608394155316, lng: -75.62827179180347 } // Pereira
        }
      ]
    },
    vehiculoAsignado: {
      id: '7e64d3e7-a555-4ef1-867a-d3259e91bd2f',
      placa: 'ABC-123',
      modelo: 'Furgón Mercedes',
      pais: 10,
      ubicacionGeografica: { lat: 4.81333, lng: -75.69719 }, // Armenia
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
        ubicacion: { lat: 4.7110, lng: -74.0721 } // Bogotá Norte
      },
      bodegasOrigen: [
        {
          id: 'd4c30897-e898-42d4-b890-96ff8af955d0',
          ubicacion: { lat: 4.6533, lng: -74.0836 } // Bogotá Centro
        }
      ]
    },
    vehiculoAsignado: {
      id: '9f0a1b2c-3d4e-5f6a-7b8c-9d0e1f2a3b4c',
      placa: 'XYZ-789',
      modelo: 'Camioneta Toyota',
      pais: 10,
      ubicacionGeografica: { lat: 4.6097, lng: -74.0817 }, // Bogotá Centro
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
        nombre: 'Hospital San Ignacio',
        ubicacion: { lat: 4.6282, lng: -74.0653 } // Bogotá Chapinero
      },
      bodegasOrigen: [
        {
          id: 'f084da73-6d8f-4cd0-be3e-71c6f0aadce6',
          ubicacion: { lat: 6.2518, lng: -75.5636 } // Medellín
        }
      ]
    },
    vehiculoAsignado: {
      id: 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6',
      placa: 'DEF-456',
      modelo: 'Nissan NP300',
      pais: 10,
      ubicacionGeografica: { lat: 6.2442, lng: -75.5812 }, // Medellín
      createdAt: '2025-11-06T04:20:33.456Z',
      updatedAt: '2025-11-06T04:20:33.456Z'
    }
  }
];

const mockLogisticaService = {
  getPedidosEntregar: async (fechaInicio, fechaFin) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log('🧪 Mock - Fechas recibidas:', { fechaInicio, fechaFin });
    console.log('🔍 Mock - Formato esperado: YYYY/MM/DD');
    
    try {
      // Validar que las fechas estén en formato YYYY/MM/DD
      const formatoValido = /^\d{4}\/\d{2}\/\d{2}$/;
      
      if (!formatoValido.test(fechaInicio)) {
        console.error('❌ Mock - Formato de fechaInicio inválido:', fechaInicio);
        return {
          success: false,
          result: [],
          message: `Formato de fecha inicio inválido: ${fechaInicio}. Use YYYY/MM/DD`,
          timestamp: new Date().toISOString()
        };
      }
      
      if (!formatoValido.test(fechaFin)) {
        console.error('❌ Mock - Formato de fechaFin inválido:', fechaFin);
        return {
          success: false,
          result: [],
          message: `Formato de fecha fin inválido: ${fechaFin}. Use YYYY/MM/DD`,
          timestamp: new Date().toISOString()
        };
      }

      // Parsear fechas en formato YYYY/MM/DD
      const parseFecha = (fechaStr) => {
        const [year, month, day] = fechaStr.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      const inicio = parseFecha(fechaInicio);
      const fin = parseFecha(fechaFin);
      
      // Validar que las fechas sean válidas
      if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
        console.error('❌ Mock - Fechas inválidas:', { fechaInicio, fechaFin });
        return {
          success: false,
          result: [],
          message: 'Fechas inválidas',
          timestamp: new Date().toISOString()
        };
      }

      // Validar que fecha inicio sea menor o igual a fecha fin
      if (inicio > fin) {
        console.warn('⚠️ Mock - Fecha inicio es mayor que fecha fin');
        return {
          success: false,
          result: [],
          message: 'La fecha de inicio debe ser anterior o igual a la fecha fin',
          timestamp: new Date().toISOString()
        };
      }
      
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      const esRangoValido = inicio <= hoy && fin >= inicio;
      
      console.log('✅ Mock - Validación completada:', {
        inicio: inicio.toISOString(),
        fin: fin.toISOString(),
        hoy: hoy.toISOString(),
        esRangoValido
      });
      
      const pedidosFiltrados = esRangoValido ? mockPedidos : [];
      
      console.log(`📦 Mock - Retornando ${pedidosFiltrados.length} pedido(s)`);
      
      return {
        success: true,
        result: pedidosFiltrados,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Mock - Error procesando fechas:', error);
      return {
        success: false,
        result: [],
        message: 'Error procesando las fechas. Verifique el formato YYYY/MM/DD',
        timestamp: new Date().toISOString()
      };
    }
  },

  generateRutas: async (pedidos) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (pedidos.length === 0) {
      return {
        success: false,
        message: 'Debe seleccionar al menos un pedido'
      };
    }

    // Generar rutas con estructura similar a Google Routes API
    const rutasGeneradas = pedidos.map((pedido) => {
      const distancia = 3000 + Math.random() * 5000;
      const duracion = 600 + Math.floor(Math.random() * 1200);
      
      // Ubicaciones
      const vehiculoLoc = pedido.vehiculoAsignado.ubicacionGeografica;
      const bodegaLoc = pedido.orden.bodegasOrigen[0].ubicacion;
      const clienteLoc = pedido.orden.cliente.ubicacion;
      
      // Generar polyline simple entre 3 puntos (simulación)
      // En producción, esto vendría de Google Routes API
      const generateSimplePolyline = (start, end, steps = 5) => {
        const points = [];
        for (let i = 0; i <= steps; i++) {
          const ratio = i / steps;
          points.push({
            lat: start.lat + (end.lat - start.lat) * ratio,
            lng: start.lng + (end.lng - start.lng) * ratio
          });
        }
        return encodePolyline(points);
      };
      
      // Función para codificar polyline (inverso de decode)
      const encodePolyline = (coordinates) => {
        let result = '';
        let lastLat = 0;
        let lastLng = 0;

        coordinates.forEach(coord => {
          const lat = Math.round(coord.lat * 1e5);
          const lng = Math.round(coord.lng * 1e5);
          
          const dLat = lat - lastLat;
          const dLng = lng - lastLng;
          
          result += encodeNumber(dLat);
          result += encodeNumber(dLng);
          
          lastLat = lat;
          lastLng = lng;
        });

        return result;
      };
      
      const encodeNumber = (num) => {
        let encoded = '';
        let value = num < 0 ? ~(num << 1) : num << 1;
        
        while (value >= 0x20) {
          encoded += String.fromCharCode((0x20 | (value & 0x1f)) + 63);
          value >>= 5;
        }
        
        encoded += String.fromCharCode(value + 63);
        return encoded;
      };
      
      // Generar polylines para cada tramo
      const polylineVehiculoToBodega = generateSimplePolyline(vehiculoLoc, bodegaLoc, 10);
      const polylineBodegaToCliente = generateSimplePolyline(bodegaLoc, clienteLoc, 10);
      
      return {
        vehiculoId: pedido.vehiculoAsignado.id,
        ordenesIds: [pedido.orden.id],
        distancia: Math.round(distancia),
        duracion: duracion.toString(),
        polilinea: polylineVehiculoToBodega + polylineBodegaToCliente, // Concatenar polylines
        legs: [
          {
            steps: [
              {
                polyline: {
                  polylineType: "encodedPolyline",
                  encodedPolyline: polylineVehiculoToBodega
                },
                travelMode: "DRIVE",
                endLocation: {
                  latLng: bodegaLoc,
                  heading: null
                },
                startLocation: {
                  latLng: vehiculoLoc,
                  heading: null
                },
                distanceMeters: Math.round(distancia * 0.5),
                staticDuration: {
                  nanos: 0,
                  seconds: Math.round(duracion * 0.5).toString()
                },
                transitDetails: null,
                travelAdvisory: null,
                localizedValues: {
                  distance: {
                    text: `${(distancia * 0.5 / 1000).toFixed(1)} km`,
                    languageCode: ""
                  },
                  staticDuration: {
                    text: `${Math.round(duracion * 0.5 / 60)} min`,
                    languageCode: ""
                  }
                },
                navigationInstruction: {
                  maneuver: "DEPART",
                  instructions: "Diríjase hacia la bodega de origen"
                }
              },
              {
                polyline: {
                  polylineType: "encodedPolyline",
                  encodedPolyline: polylineBodegaToCliente
                },
                travelMode: "DRIVE",
                endLocation: {
                  latLng: clienteLoc,
                  heading: null
                },
                startLocation: {
                  latLng: bodegaLoc,
                  heading: null
                },
                distanceMeters: Math.round(distancia * 0.5),
                staticDuration: {
                  nanos: 0,
                  seconds: Math.round(duracion * 0.5).toString()
                },
                transitDetails: null,
                travelAdvisory: null,
                localizedValues: {
                  distance: {
                    text: `${(distancia * 0.5 / 1000).toFixed(1)} km`,
                    languageCode: ""
                  },
                  staticDuration: {
                    text: `${Math.round(duracion * 0.5 / 60)} min`,
                    languageCode: ""
                  }
                },
                navigationInstruction: {
                  maneuver: "STRAIGHT",
                  instructions: "Continúe hacia el destino final"
                }
              }
            ],
            duration: {
              nanos: 0,
              seconds: duracion.toString()
            },
            polyline: {
              polylineType: "encodedPolyline",
              encodedPolyline: polylineVehiculoToBodega + polylineBodegaToCliente
            },
            endLocation: {
              latLng: clienteLoc,
              heading: null
            },
            startLocation: {
              latLng: vehiculoLoc,
              heading: null
            },
            stepsOverview: null,
            distanceMeters: Math.round(distancia),
            staticDuration: {
              nanos: 0,
              seconds: duracion.toString()
            },
            travelAdvisory: null,
            localizedValues: {
              distance: {
                text: `${(distancia / 1000).toFixed(1)} km`,
                languageCode: ""
              },
              duration: {
                text: `${Math.round(duracion / 60)} min`,
                languageCode: ""
              },
              staticDuration: {
                text: `${Math.round(duracion / 60)} min`,
                languageCode: ""
              }
            }
          }
        ],
        rutaId: `ruta-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
    });

    return {
      success: true,
      result: rutasGeneradas,
      timestamp: new Date().toISOString()
    };
  }
};

export default mockLogisticaService;
