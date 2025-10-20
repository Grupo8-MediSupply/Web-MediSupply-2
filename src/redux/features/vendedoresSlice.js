import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Countries } from '../../constants/auth';

// Acción asíncrona para obtener vendedores
export const fetchVendedores = createAsyncThunk(
  'vendedores/fetchVendedores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.vendedores.getVendedores();
      
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
  async (vendedorData, { rejectWithValue }) => {
    try {
      const response = await api.vendedores.createVendedor(vendedorData);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear vendedor');
      }
      
      // Crear un objeto vendedor completo para el estado local
      // usando los datos enviados y la respuesta de la API
      const newVendedor = {
        id: Math.random().toString(36).substr(2, 6), // ID temporal para UI
        nombre: vendedorData.nombre,
        email: response.result.email,
        pais: response.result.paisCreacion,
        territorio: response.result.paisCreacion === '10' ? 'Colombia' : 'México',
        visitasCompletadas: 0,
        visitasProgramadas: 0,
      };
      
      return newVendedor;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear vendedor');
    }
  }
);

const initialState = {
  vendedores: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filtros: {
    territorio: '',
    equipo: ''
  },
  addStatus: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const vendedoresSlice = createSlice({
  name: 'vendedores',
  initialState,
  reducers: {
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    clearFiltros: (state) => {
      state.filtros = { territorio: '', equipo: '' };
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
      })
      .addCase(fetchVendedores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendedores = action.payload;
      })
      .addCase(fetchVendedores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  }
});

export const { setFiltros, clearFiltros, resetAddStatus } = vendedoresSlice.actions;

// Selector para obtener todos los vendedores
export const selectAllVendedores = (state) => state.vendedores.vendedores;

// Selector para el estado de carga
export const selectVendedoresStatus = (state) => state.vendedores.status;

// Selector para mensajes de error
export const selectVendedoresError = (state) => state.vendedores.error;

// Selector para filtros activos
export const selectFiltros = (state) => state.vendedores.filtros;

// Selector para vendedores filtrados
export const selectFilteredVendedores = (state) => {
  const { vendedores } = state.vendedores;
  const { territorio, equipo } = state.vendedores.filtros;
  
  return vendedores.filter(item => {
    const territorioMatch = !territorio || item.territorio === territorio;
    const equipoMatch = !equipo || item.equipo === equipo; // Asumiendo que se añadirá un campo 'equipo' en el futuro
    return territorioMatch && equipoMatch;
  });
};

// Obtener territorios únicos para los filtros
export const selectTerritorios = (state) => {
  const territorios = [...new Set(state.vendedores.vendedores.map(v => v.territorio))];
  return territorios;
};

// Selector para el estado de añadir vendedor
export const selectAddVendedorStatus = (state) => state.vendedores.addStatus;

export default vendedoresSlice.reducer;
