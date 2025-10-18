import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Datos de ejemplo para el catálogo
const fakeCatalogoData = [
  { 
    id: 1, 
    nombre: 'Jeringa desechable 10ml', 
    descripcion: 'Jeringa estéril de un solo uso de 10ml',
    precio: 0.5,
    categoria: 'Inyectables',
    proveedor: 'MedicalSupplies Inc.',
    imagen: 'jeringa.jpg'
  },
  { 
    id: 2, 
    nombre: 'Venda elástica 5cm', 
    descripcion: 'Venda elástica de 5cm x 5m',
    precio: 2.3,
    categoria: 'Primeros auxilios',
    proveedor: 'BandageWorld',
    imagen: 'venda.jpg'
  },
  { 
    id: 3, 
    nombre: 'Guantes de látex talla M', 
    descripcion: 'Caja de 100 guantes de látex desechables',
    precio: 8.75,
    categoria: 'Protección',
    proveedor: 'SafetyFirst',
    imagen: 'guantes.jpg'
  },
];

// Simulación de API
const fetchCatalogoApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeCatalogoData);
    }, 800);
  });
};

// Acción asíncrona para obtener el catálogo
export const fetchCatalogo = createAsyncThunk(
  'catalogo/fetchCatalogo',
  async () => {
    const response = await fetchCatalogoApi();
    return response;
  }
);

const initialState = {
  productos: [],
  status: 'idle',
  error: null,
  filtro: {
    categoria: '',
    proveedor: ''
  },
  productoSeleccionado: null
};

const catalogoSlice = createSlice({
  name: 'catalogo',
  initialState,
  reducers: {
    setFiltro: (state, action) => {
      state.filtro = { ...state.filtro, ...action.payload };
    },
    selectProducto: (state, action) => {
      state.productoSeleccionado = action.payload;
    },
    clearProductoSeleccionado: (state) => {
      state.productoSeleccionado = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatalogo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos = action.payload;
      })
      .addCase(fetchCatalogo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setFiltro, selectProducto, clearProductoSeleccionado } = catalogoSlice.actions;

// Selector para filtrar productos
export const selectFilteredProductos = (state) => {
  const { productos, filtro } = state.catalogo;
  return productos.filter(producto => {
    const categoriaMatch = !filtro.categoria || producto.categoria === filtro.categoria;
    const proveedorMatch = !filtro.proveedor || producto.proveedor === filtro.proveedor;
    return categoriaMatch && proveedorMatch;
  });
};

export default catalogoSlice.reducer;
