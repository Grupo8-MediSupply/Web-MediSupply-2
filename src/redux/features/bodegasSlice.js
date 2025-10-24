import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inventariosService from '../../services/inventarios';

// Async thunks for data fetching
export const fetchBodegas = createAsyncThunk(
  'bodegas/fetchBodegas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await inventariosService.getBodegas();
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener bodegas');
      }
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBodegaDetails = createAsyncThunk(
  'bodegas/fetchBodegaDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await inventariosService.getBodegaDetails(id);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener detalle de bodega');
      }
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductosInBodega = createAsyncThunk(
  'bodegas/fetchProductosInBodega',
  async (id, { rejectWithValue }) => {
    try {
      const response = await inventariosService.getProductosInBodega(id);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener productos');
      }
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  bodegas: [],
  currentBodega: null,
  currentProductos: [],
  status: {
    bodegas: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    bodegaDetails: 'idle',
    productos: 'idle'
  },
  error: {
    bodegas: null,
    bodegaDetails: null,
    productos: null
  },
  filtros: {
    ciudad: '',
    bodega: ''
  }
};

// Create the slice
const bodegasSlice = createSlice({
  name: 'bodegas',
  initialState,
  reducers: {
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    clearFiltros: (state) => {
      state.filtros = { ciudad: '', bodega: '' };
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchBodegas
      .addCase(fetchBodegas.pending, (state) => {
        state.status.bodegas = 'loading';
      })
      .addCase(fetchBodegas.fulfilled, (state, action) => {
        state.status.bodegas = 'succeeded';
        state.bodegas = action.payload;
      })
      .addCase(fetchBodegas.rejected, (state, action) => {
        state.status.bodegas = 'failed';
        state.error.bodegas = action.error.message;
      })
      
      // Handle fetchBodegaDetails
      .addCase(fetchBodegaDetails.pending, (state) => {
        state.status.bodegaDetails = 'loading';
      })
      .addCase(fetchBodegaDetails.fulfilled, (state, action) => {
        state.status.bodegaDetails = 'succeeded';
        state.currentBodega = action.payload;
      })
      .addCase(fetchBodegaDetails.rejected, (state, action) => {
        state.status.bodegaDetails = 'failed';
        state.error.bodegaDetails = action.payload || action.error.message;
      })
      
      // Handle fetchProductosInBodega
      .addCase(fetchProductosInBodega.pending, (state) => {
        state.status.productos = 'loading';
      })
      .addCase(fetchProductosInBodega.fulfilled, (state, action) => {
        state.status.productos = 'succeeded';
        state.currentProductos = action.payload;
      })
      .addCase(fetchProductosInBodega.rejected, (state, action) => {
        state.status.productos = 'failed';
        state.error.productos = action.error.message;
      });
  }
});

// Export actions
export const { setFiltros, clearFiltros } = bodegasSlice.actions;

// Export selectors
export const selectAllBodegas = (state) => state.bodegas.bodegas;
export const selectBodegasStatus = (state) => state.bodegas.status.bodegas;
export const selectBodegasError = (state) => state.bodegas.error.bodegas;
export const selectCurrentBodega = (state) => state.bodegas.currentBodega;
export const selectBodegaDetailsStatus = (state) => state.bodegas.status.bodegaDetails;
export const selectBodegaDetailsError = (state) => state.bodegas.error.bodegaDetails;
export const selectCurrentProductos = (state) => state.bodegas.currentProductos;
export const selectProductosStatus = (state) => state.bodegas.status.productos;
export const selectProductosError = (state) => state.bodegas.error.productos;
export const selectFiltros = (state) => state.bodegas.filtros;

// Selector for filtered bodegas
export const selectFilteredBodegas = (state) => {
  const { bodegas } = state.bodegas;
  const { ciudad, bodega } = state.bodegas.filtros;
  
  return bodegas.filter(item => {
    const ciudadMatch = !ciudad || item.ciudad === ciudad;
    const bodegaMatch = !bodega || item.nombre === bodega;
    return ciudadMatch && bodegaMatch;
  });
};

export default bodegasSlice.reducer;
