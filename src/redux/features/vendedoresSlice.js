import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data para vendedores
const mockVendedores = [
  { id: '123456', nombre: 'Edwin', territorio: 'Colombia', visitasCompletadas: 15, visitasProgramadas: 20 },
  { id: '123456', nombre: 'Maria', territorio: 'Colombia', visitasCompletadas: 18, visitasProgramadas: 20 },
  { id: '123456', nombre: 'Martin', territorio: 'Colombia', visitasCompletadas: 10, visitasProgramadas: 15 },
  { id: '123456', nombre: 'Dolores', territorio: 'Colombia', visitasCompletadas: 12, visitasProgramadas: 15 },
  { id: '123456', nombre: 'Ana', territorio: 'Colombia', visitasCompletadas: 20, visitasProgramadas: 20 },
  { id: '234567', nombre: 'Juan', territorio: 'México', visitasCompletadas: 8, visitasProgramadas: 15 },
  { id: '345678', nombre: 'Carlos', territorio: 'Argentina', visitasCompletadas: 12, visitasProgramadas: 18 },
  { id: '456789', nombre: 'Sofía', territorio: 'Perú', visitasCompletadas: 7, visitasProgramadas: 10 },
  { id: '567890', nombre: 'Valentina', territorio: 'Chile', visitasCompletadas: 14, visitasProgramadas: 15 },
  { id: '678901', nombre: 'Ricardo', territorio: 'México', visitasCompletadas: 6, visitasProgramadas: 12 },
];

// Simulación de API
const fetchVendedoresAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVendedores);
    }, 500);
  });
};

// Acción asíncrona para obtener vendedores
export const fetchVendedores = createAsyncThunk(
  'vendedores/fetchVendedores',
  async () => {
    const response = await fetchVendedoresAPI();
    return response;
  }
);

const initialState = {
  vendedores: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filtros: {
    territorio: '',
    equipo: ''
  }
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
    }
  },
  extraReducers: (builder) => {
    builder
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
      });
  }
});

export const { setFiltros, clearFiltros } = vendedoresSlice.actions;

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

export default vendedoresSlice.reducer;
