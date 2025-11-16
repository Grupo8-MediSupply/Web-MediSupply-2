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
        return rejectWithValue('No se pudo obtener el ID del país desde la configuración');
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

const initialState = {
  proveedores: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filtros: {
    pais: '',
  },
  addStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  addError: null
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
      });
  }
});

export const { setFiltros, clearFiltros, resetAddStatus } = proveedoresSlice.actions;

// Selector para obtener todos los proveedores
export const selectAllProveedores = (state) => state.proveedores.proveedores;

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
