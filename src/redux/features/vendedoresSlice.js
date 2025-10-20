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

// Simular la adición de un nuevo vendedor
const addVendedorAPI = (vendedor) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generar un ID único para el nuevo vendedor
      const newVendedor = {
        ...vendedor,
        id: Math.random().toString(36).substr(2, 6),
        visitasCompletadas: 0,
        visitasProgramadas: 0
      };
      resolve(newVendedor);
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

// Acción asíncrona para añadir un nuevo vendedor
export const addVendedor = createAsyncThunk(
  'vendedores/addVendedor',
  async (vendedor) => {
    const response = await addVendedorAPI(vendedor);
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
