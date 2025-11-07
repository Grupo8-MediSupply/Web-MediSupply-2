import api from "./api";

export interface Ubicacion {
  lat: number;
  lng: number;
}

export interface Cliente {
  id: string;
  ubicacion: Ubicacion;
  nombre: string;
}

export interface Bodega {
  id: string;
  ubicacion: Ubicacion;
}

export interface Orden {
  id: string;
  estado: string;
  cliente: Cliente;
  bodegasOrigen: Bodega[];
}

export interface Vehiculo {
  id: string;
  placa: string;
  modelo: string;
  ubicacionGeografica: Ubicacion;
  pais: number;
}

export interface OrdenParaEntregar {
  orden: Orden;
  vehiculoAsignado: Vehiculo;
}

export interface RutaGenerada {
  vehiculoId: string;
  ordenesIds: string[];
  distancia: number;
  duracion: string;
  polilinea: string;
  legs: any[];
  rutaId: string;
}

export interface ObtenerOrdenesResponse {
  success: boolean;
  result: OrdenParaEntregar[];
  timestamp: string;
}

export interface GenerarRutasResponse {
  success: boolean;
  result: RutaGenerada[];
  timestamp: string;
}

export const rutasService = {
  // Obtener órdenes pendientes de entrega
  obtenerOrdenesParaEntregar: async (
    fechaInicio: string,
    fechaFin: string
  ): Promise<ObtenerOrdenesResponse> => {
    const response = await api.get("/pedidos/entregar", {
      params: {
        fechaInicio,
        fechaFin,
      },
    });
    return response.data;
  },

  // Generar rutas optimizadas
  generarRutas: async (
    ordenes: OrdenParaEntregar[]
  ): Promise<GenerarRutasResponse> => {
    const response = await api.post("/pedidos/rutas", ordenes);
    return response.data;
  },
};
