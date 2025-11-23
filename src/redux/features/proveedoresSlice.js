import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Acción asíncrona para obtener proveedores
export const fetchProveedores = createAsyncThunk(
  'proveedores/fetchProveedores',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Obtener el paisId desde la configuración del estado
      const state = getState();
      const paisId = state.configuracion?.pais?.id;
      
      if (!paisId) {
        return rejectWithValue('No se pudo obtener el ID del país desde la configuración. Por favor, recargue la página.');
      }
      
      const response = await api.proveedores.getProveedores(paisId);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener proveedores');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener proveedores');
    }
  }
);

// Acción asíncrona para añadir un nuevo proveedor
export const addProveedor = createAsyncThunk(
  'proveedores/addProveedor',
  async (proveedorData, { rejectWithValue }) => {
    try {
      const response = await api.proveedores.createProveedor(proveedorData);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear proveedor');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear proveedor');
    }
  }
);

// Acción asíncrona para obtener el historial de compras de un proveedor
export const fetchHistorialCompras = createAsyncThunk(
  'proveedores/fetchHistorialCompras',
  async ({ proveedorId, fechaInicio, fechaFin }, { rejectWithValue }) => {
    try {
      const response = await api.proveedores.getHistorialCompras({
        proveedorId,
        fechaInicio,
        fechaFin
      });
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener historial de compras');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener historial de compras');
    }
  }
);

const initialState = {
  proveedores: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filtros: {
    pais: '',
  },
  addStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  addError: null,
  historialCompras: [],
  historialStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  historialError: null
};

const proveedoresSlice = createSlice({
  name: 'proveedores',
  initialState,
  reducers: {
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    clearFiltros: (state) => {
      state.filtros = { pais: '' };
    },
    resetAddStatus: (state) => {
      state.addStatus = 'idle';
      state.addError = null;
    },
    clearHistorialCompras: (state) => {
      state.historialCompras = [];
      state.historialStatus = 'idle';
      state.historialError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Manejar fetchProveedores
      .addCase(fetchProveedores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProveedores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.proveedores = action.payload;
      })
      .addCase(fetchProveedores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Manejar addProveedor
      .addCase(addProveedor.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addProveedor.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.proveedores.push(action.payload);
      })
      .addCase(addProveedor.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.addError = action.payload || action.error.message;
      })
      // Manejar fetchHistorialCompras
      .addCase(fetchHistorialCompras.pending, (state) => {
        state.historialStatus = 'loading';
      })
      .addCase(fetchHistorialCompras.fulfilled, (state, action) => {
        state.historialStatus = 'succeeded';
        state.historialCompras = action.payload;
      })
      .addCase(fetchHistorialCompras.rejected, (state, action) => {
        state.historialStatus = 'failed';
        state.historialError = action.payload || action.error.message;
      });
  }
});

export const { setFiltros, clearFiltros, resetAddStatus, clearHistorialCompras } = proveedoresSlice.actions;

// Selector para obtener todos los proveedores
export const selectAllProveedores = (state) => state.proveedores.proveedores;

// Selectores para historial de compras
export const selectHistorialCompras = (state) => state.proveedores.historialCompras;
export const selectHistorialStatus = (state) => state.proveedores.historialStatus;
export const selectHistorialError = (state) => state.proveedores.historialError;

// Selector para el estado de carga
export const selectProveedoresStatus = (state) => state.proveedores.status;

// Selector para mensajes de error
export const selectProveedoresError = (state) => state.proveedores.error;

// Selector para el estado de añadir proveedor
export const selectAddProveedorStatus = (state) => state.proveedores.addStatus;
export const selectAddProveedorError = (state) => state.proveedores.addError;

// Selector para filtros activos
export const selectFiltros = (state) => state.proveedores.filtros;

// Selector para proveedores filtrados
export const selectFilteredProveedores = (state) => {
  const proveedores = state.proveedores?.proveedores || [];
  const filtros = state.proveedores?.filtros || { pais: '' };
  
  return proveedores.filter(item => {
    const paisMatch = !filtros.pais || item.pais === filtros.pais;
    return paisMatch;
  });
};

// Obtener países únicos para los filtros
export const selectPaises = (state) => {
  const paises = [...new Set(state.proveedores.proveedores.map(p => p.pais))];
  return paises;
};

export default proveedoresSlice.reducer;
