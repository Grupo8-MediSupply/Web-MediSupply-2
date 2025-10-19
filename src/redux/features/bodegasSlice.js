import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for warehouses
const mockBodegas = [
  { id: 1, nombre: 'Centro Norte', ciudad: 'Bogotá', capacidad: '5.000', estado: 'Activo' },
  { id: 2, nombre: 'Centro Urbano', ciudad: 'Medellín', capacidad: '5.500', estado: 'Activo' },
  { id: 3, nombre: 'Centro Industrial', ciudad: 'Cúcuta', capacidad: '4.000', estado: 'Inactivo' },
  { id: 4, nombre: 'Centro Oriente', ciudad: 'Cali', capacidad: '6.000', estado: 'Activo' },
];

// Mock data for warehouse details
const mockBodegaDetails = {
  1: { 
    id: 1, 
    nombre: 'Centro Norte', 
    ciudad: 'Bogotá', 
    capacidad: '5.000',
    estado: 'Activo'
  },
  2: { 
    id: 2, 
    nombre: 'Centro Urbano', 
    ciudad: 'Medellín',
    capacidad: '5.500',
    estado: 'Activo'
  },
  3: { 
    id: 3, 
    nombre: 'Centro Industrial', 
    ciudad: 'Cúcuta',
    capacidad: '4.000',
    estado: 'Inactivo'
  },
  4: { 
    id: 4, 
    nombre: 'Centro Oriente', 
    ciudad: 'Cali',
    capacidad: '6.000',
    estado: 'Activo'
  }
};

// Mock data for products in warehouses
const mockProductos = {
  1: [
    { producto: 'Vacuna influenza', lote: 'MED-014-1', cantidad: 400, vencimiento: '31/08/2024' },
    { producto: 'Guantes Nitrilo M', lote: 'INS-220-2', cantidad: 300, vencimiento: '15/07/2025' },
    { producto: 'Amoxicilina 500mg', lote: 'MED-001-5', cantidad: 250, vencimiento: '10/02/2026' },
    { producto: 'Vacuna influenza', lote: 'MED-014-3', cantidad: 180, vencimiento: '24/11/2026' }
  ],
  2: [
    { producto: 'Jeringa 5ml', lote: 'INS-101-2', cantidad: 500, vencimiento: '05/05/2025' },
    { producto: 'Paracetamol 500mg', lote: 'MED-002-1', cantidad: 350, vencimiento: '22/09/2024' }
  ],
  3: [
    { producto: 'Vendas elásticas', lote: 'INS-303-4', cantidad: 120, vencimiento: '18/03/2025' }
  ],
  4: [
    { producto: 'Alcohol 70%', lote: 'INS-405-2', cantidad: 200, vencimiento: '30/06/2026' },
    { producto: 'Mascarillas N95', lote: 'INS-410-1', cantidad: 150, vencimiento: '12/12/2024' }
  ]
};

// Mock API calls
const fetchBodegasAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBodegas);
    }, 500);
  });
};

const fetchBodegaDetailsAPI = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bodega = mockBodegaDetails[id];
      if (bodega) {
        resolve(bodega);
      } else {
        reject(new Error('Bodega no encontrada'));
      }
    }, 300);
  });
};

const fetchProductosInBodegaAPI = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productos = mockProductos[id];
      if (productos) {
        resolve(productos);
      } else {
        resolve([]);
      }
    }, 400);
  });
};

// Async thunks for data fetching
export const fetchBodegas = createAsyncThunk(
  'bodegas/fetchBodegas',
  async () => {
    const response = await fetchBodegasAPI();
    return response;
  }
);

export const fetchBodegaDetails = createAsyncThunk(
  'bodegas/fetchBodegaDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchBodegaDetailsAPI(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductosInBodega = createAsyncThunk(
  'bodegas/fetchProductosInBodega',
  async (id) => {
    const response = await fetchProductosInBodegaAPI(id);
    return response;
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
