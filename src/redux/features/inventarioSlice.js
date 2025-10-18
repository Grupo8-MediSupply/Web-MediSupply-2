import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulación de datos de API
const fakeInventarioData = [
  { id: 1, nombre: 'Jeringas desechables', cantidad: 500, categoria: 'Inyectables', ubicacion: 'Bodega A' },
  { id: 2, nombre: 'Vendas elásticas', cantidad: 200, categoria: 'Primeros auxilios', ubicacion: 'Bodega B' },
  { id: 3, nombre: 'Guantes de látex', cantidad: 1000, categoria: 'Protección', ubicacion: 'Bodega A' },
  { id: 4, nombre: 'Alcohol antiséptico', cantidad: 150, categoria: 'Desinfección', ubicacion: 'Bodega C' },
];

// Simulación de una llamada API para obtener datos de inventario
const fetchInventarioApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeInventarioData);
    }, 800);
  });
};

// Acción asíncrona para cargar datos de inventario
export const fetchInventario = createAsyncThunk(
  'inventario/fetchInventario',
  async () => {
    const response = await fetchInventarioApi();
    return response;
  }
);

// Acción asíncrona para agregar un nuevo item
export const addInventarioItem = createAsyncThunk(
  'inventario/addItem',
  async (newItem) => {
    // En una app real, aquí harías una llamada a la API para guardar el item
    return { ...newItem, id: Date.now() };
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filtro: {
    categoria: '',
    ubicacion: ''
  }
};

const inventarioSlice = createSlice({
  name: 'inventario',
  initialState,
  reducers: {
    updateFiltro: (state, action) => {
      state.filtro = { ...state.filtro, ...action.payload };
    },
    updateItemCantidad: (state, action) => {
      const { id, cantidad } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.cantidad = cantidad;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventario.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventario.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventario.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addInventarioItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export const { updateFiltro, updateItemCantidad } = inventarioSlice.actions;

// Selector para filtrar items
export const selectFilteredItems = (state) => {
  const { items, filtro } = state.inventario;
  return items.filter(item => {
    const categoriaMatch = !filtro.categoria || item.categoria === filtro.categoria;
    const ubicacionMatch = !filtro.ubicacion || item.ubicacion === filtro.ubicacion;
    return categoriaMatch && ubicacionMatch;
  });
};

export default inventarioSlice.reducer;
