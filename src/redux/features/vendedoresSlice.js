import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Acción asíncrona para obtener vendedores por país
export const fetchVendedores = createAsyncThunk(
  'vendedores/fetchVendedores',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Obtener el paisId desde la configuración del estado
      const state = getState();
      const paisId = state.configuracion?.pais?.id;
      
      if (!paisId) {
        return rejectWithValue('No se pudo obtener el ID del país desde la configuración. Por favor, recargue la página.');
      }
      
      const response = await api.vendedores.getVendedoresByPais(paisId);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener vendedores');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener vendedores');
    }
  }
);

// Acción asíncrona para añadir un nuevo vendedor
export const addVendedor = createAsyncThunk(
  'vendedores/addVendedor',
  async (vendedorData, { rejectWithValue, getState }) => {
    try {
      const response = await api.vendedores.createVendedor(vendedorData);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear vendedor');
      }
      
      // Obtener paisId de la configuración
      const state = getState();
      const paisId = state.configuracion?.pais?.id || response.result.paisCreacion;
      
      // Crear un objeto vendedor completo para el estado local
      const newVendedor = {
        id: response.result.id || `temp-${Date.now()}`,
        nombre: vendedorData.nombre,
        email: response.result.email,
        paisId: paisId
      };
      
      return newVendedor;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear vendedor');
    }
  }
);

const initialState = {
  vendedores: [],
  status: 'idle',
  error: null,
  filtros: {
    nombre: ''
  },
  addStatus: 'idle'
};

const vendedoresSlice = createSlice({
  name: 'vendedores',
  initialState,
  reducers: {
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    clearFiltros: (state) => {
      state.filtros = { nombre: '' };
    },
    resetAddStatus: (state) => {
      state.addStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Manejar fetchVendedores
      .addCase(fetchVendedores.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVendedores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendedores = action.payload;
        state.error = null;
      })
      .addCase(fetchVendedores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Manejar addVendedor
      .addCase(addVendedor.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addVendedor.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.vendedores.push(action.payload);
      })
      .addCase(addVendedor.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { setFiltros, clearFiltros, resetAddStatus } = vendedoresSlice.actions;

// Selectores
export const selectAllVendedores = (state) => state.vendedores.vendedores;
export const selectVendedoresStatus = (state) => state.vendedores.status;
export const selectVendedoresError = (state) => state.vendedores.error;
export const selectFiltros = (state) => state.vendedores.filtros;

// Selector para vendedores filtrados
export const selectFilteredVendedores = (state) => {
  const vendedores = state.vendedores?.vendedores || [];
  const filtros = state.vendedores?.filtros || { nombre: '' };
  const { nombre } = filtros;
  
  if (!nombre || nombre.trim() === '') {
    return vendedores;
  }
  
  const lowercaseNombre = nombre.toLowerCase();
  return vendedores.filter(vendedor => 
    vendedor.nombre?.toLowerCase().includes(lowercaseNombre) ||
    vendedor.email?.toLowerCase().includes(lowercaseNombre)
  );
};

export const selectAddVendedorStatus = (state) => state.vendedores.addStatus;

export default vendedoresSlice.reducer;
