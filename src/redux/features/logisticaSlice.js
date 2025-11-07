import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logisticaService from '../../services/logistica';

// Thunks asíncronos
export const fetchPedidosEntregar = createAsyncThunk(
  'logistica/fetchPedidosEntregar',
  async ({ fechaInicio, fechaFin }, { rejectWithValue }) => {
    try {
      const response = await logisticaService.getPedidosEntregar(fechaInicio, fechaFin);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener pedidos');
      }

      // Verificar que la respuesta tenga el formato esperado
      if (!response.result || !Array.isArray(response.result)) {
        return rejectWithValue('Formato de respuesta inválido');
      }

      return response;
    } catch (error) {
      console.error('Error en fetchPedidosEntregar:', error);
      return rejectWithValue(error.message || 'Error al obtener pedidos');
    }
  }
);

export const generateRutas = createAsyncThunk(
  'logistica/generateRutas',
  async (pedidos, { rejectWithValue }) => {
    try {
      const response = await logisticaService.generateRutas(pedidos);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al generar rutas');
      }

      // Validar estructura de la respuesta
      if (!response.result || !Array.isArray(response.result)) {
        return rejectWithValue('Formato de respuesta inválido');
      }

      // Validar que cada ruta tenga la estructura esperada
      const rutasValidas = response.result.filter(ruta => {
        if (!ruta.vehiculoId || !ruta.ordenesIds || !Array.isArray(ruta.ordenesIds)) {
          console.warn('Ruta con estructura incompleta:', ruta);
          return false;
        }
        return true;
      });

      if (rutasValidas.length < response.result.length) {
        console.warn(
          `${response.result.length - rutasValidas.length} ruta(s) descartada(s) por estructura inválida`
        );
      }

      return {
        ...response,
        result: rutasValidas
      };
    } catch (error) {
      console.error('Error en generateRutas:', error);
      return rejectWithValue(error.message || 'Error al generar rutas');
    }
  }
);

const initialState = {
  pedidosEntregar: [],
  pedidosSeleccionados: [],
  rutas: [],
  loading: false,
  error: null,
  filtros: {
    fechaInicio: null,
    fechaFin: null
  },
  rutasGeneradas: false
};

const logisticaSlice = createSlice({
  name: 'logistica',
  initialState,
  reducers: {
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    togglePedidoSeleccionado: (state, action) => {
      const pedido = action.payload;
      const index = state.pedidosSeleccionados.findIndex(
        p => p.orden.id === pedido.orden.id
      );
      if (index >= 0) {
        state.pedidosSeleccionados.splice(index, 1);
      } else {
        state.pedidosSeleccionados.push(pedido);
      }
    },
    clearPedidosSeleccionados: (state) => {
      state.pedidosSeleccionados = [];
    },
    clearRutas: (state) => {
      state.rutas = [];
      state.rutasGeneradas = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchPedidosEntregar
      .addCase(fetchPedidosEntregar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPedidosEntregar.fulfilled, (state, action) => {
        state.loading = false;
        state.pedidosEntregar = action.payload.result || [];
        state.pedidosSeleccionados = [];
        state.rutas = [];
        state.rutasGeneradas = false;
      })
      .addCase(fetchPedidosEntregar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al cargar pedidos';
      })
      // generateRutas
      .addCase(generateRutas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRutas.fulfilled, (state, action) => {
        state.loading = false;
        state.rutas = action.payload.result || [];
        state.rutasGeneradas = true;
      })
      .addCase(generateRutas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al generar rutas';
      });
  }
});

export const {
  setFiltros,
  togglePedidoSeleccionado,
  clearPedidosSeleccionados,
  clearRutas,
  clearError
} = logisticaSlice.actions;

// Selectores
export const selectPedidosEntregar = (state) => state.logistica.pedidosEntregar;
export const selectPedidosSeleccionados = (state) => state.logistica.pedidosSeleccionados;
export const selectRutas = (state) => state.logistica.rutas;
export const selectLogisticaLoading = (state) => state.logistica.loading;
export const selectLogisticaError = (state) => state.logistica.error;
export const selectRutasGeneradas = (state) => state.logistica.rutasGeneradas;

export default logisticaSlice.reducer;
