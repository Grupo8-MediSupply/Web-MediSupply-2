import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import catalogoService from '../../services/catalogo';

// Acción asíncrona para obtener el catálogo
export const fetchCatalogo = createAsyncThunk(
  'catalogo/fetchCatalogo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await catalogoService.getProductos();
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add cargaMasiva thunk
export const cargaMasiva = createAsyncThunk(
  'catalogo/cargaMasiva',
  async (archivo, { rejectWithValue }) => {
    try {
      const response = await catalogoService.cargaMasiva(archivo);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add cargarNormativas thunk
export const cargarNormativas = createAsyncThunk(
  'catalogo/cargarNormativas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await catalogoService.cargarNormativas();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  productos: [],
  status: 'idle',
  error: null,
  categorias: ['MEDICAMENTO', 'INSUMO', 'DISPOSITIVO', 'EQUIPO'],
  proveedores: [],
  paises: ['CO', 'MX', 'PE', 'CL', 'AR'], // Add countries array
  estados: ['ACTIVO', 'INACTIVO', 'AGOTADO'],
  filtros: {
    tipo: '',
    nombre: ''
  },
  productoSeleccionado: null,
  loadingCargaMasiva: false,
  loadingNormativas: false
};

const catalogoSlice = createSlice({
  name: 'catalogo',
  initialState,
  reducers: {
    setFiltro: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    limpiarFiltros: (state) => {
      state.filtros = {
        tipo: '',
        nombre: ''
      };
    },
    selectProducto: (state, action) => {
      state.productoSeleccionado = action.payload;
    },
    clearProductoSeleccionado: (state) => {
      state.productoSeleccionado = null;
    },
    clearNotificacion: (state) => {
      state.notificacion = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Manejar fetchCatalogo
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
      })
      // Add cargaMasiva cases
      .addCase(cargaMasiva.pending, (state) => {
        state.loadingCargaMasiva = true;
      })
      .addCase(cargaMasiva.fulfilled, (state, action) => {
        state.loadingCargaMasiva = false;
        state.notificacion = {
          tipo: 'success',
          mensaje: `Se cargaron ${action.payload.result.count} productos correctamente`
        };
      })
      .addCase(cargaMasiva.rejected, (state, action) => {
        state.loadingCargaMasiva = false;
        state.notificacion = {
          tipo: 'error',
          mensaje: action.payload || 'Error al cargar los productos'
        };
      })
      // Add cargarNormativas cases
      .addCase(cargarNormativas.pending, (state) => {
        state.loadingNormativas = true;
      })
      .addCase(cargarNormativas.fulfilled, (state, action) => {
        state.loadingNormativas = false;
        state.notificacion = {
          tipo: 'success',
          mensaje: 'Normativas cargadas correctamente'
        };
      })
      .addCase(cargarNormativas.rejected, (state, action) => {
        state.loadingNormativas = false;
        state.notificacion = {
          tipo: 'error',
          mensaje: action.payload || 'Error al cargar normativas'
        };
      });
  }
});

export const { 
  setFiltro, 
  limpiarFiltros, 
  selectProducto, 
  clearProductoSeleccionado,
  clearNotificacion
} = catalogoSlice.actions;

// Selector para obtener datos básicos
export const selectCatalogoStatus = state => state.catalogo.status;
export const selectCatalogoError = state => state.catalogo.error;
export const selectNotificacion = state => state.catalogo.notificacion;

// Selectores para obtener opciones únicas para los filtros
export const selectTipos = state => {
  return [...new Set(state.catalogo.productos.map(p => p.tipo))];
};

export const selectCategorias = state => state.catalogo.categorias;
export const selectProveedores = state => state.catalogo.proveedores;
export const selectProductos = state => state.catalogo.productos;

export const selectFilteredProductos = (state) => {
  const { productos, filtros } = state.catalogo;
  return productos.filter(producto => {
    const tipoMatch = !filtros.tipo || producto.tipo === filtros.tipo;
    const nombreMatch = !filtros.nombre || 
      producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    return tipoMatch && nombreMatch;
  });
};

// Add estados selector
export const selectEstados = state => state.catalogo.estados;
// Add paises selector
export const selectPaises = state => state.catalogo.paises;

export default catalogoSlice.reducer;
