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

// Add createProducto thunk
export const createProducto = createAsyncThunk(
  'catalogo/createProducto',
  async (productoData, { rejectWithValue }) => {
    try {
      const response = await catalogoService.createProducto(productoData);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear producto');
      }
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add fetchProductoById thunk
export const fetchProductoById = createAsyncThunk(
  'catalogo/fetchProductoById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await catalogoService.getProductoById(id);
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener producto');
      }
      return response.result;
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
  },
  productoSeleccionado: null,
  loadingCargaMasiva: false,
  loadingNormativas: false,
  createStatus: 'idle',
  createError: null,
  productoDetalle: null,
  productoDetalleStatus: 'idle',
  productoDetalleError: null
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
        tipo: ''
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
    },
    resetCreateStatus: (state) => {
      state.createStatus = 'idle';
      state.createError = null;
    },
    clearProductoDetalle: (state) => {
      state.productoDetalle = null;
      state.productoDetalleStatus = 'idle';
      state.productoDetalleError = null;
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
      })
      // Add createProducto cases
      .addCase(createProducto.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createProducto.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.productos.push(action.payload);
      })
      .addCase(createProducto.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.payload;
      })
      // Add fetchProductoById cases
      .addCase(fetchProductoById.pending, (state) => {
        state.productoDetalleStatus = 'loading';
      })
      .addCase(fetchProductoById.fulfilled, (state, action) => {
        state.productoDetalleStatus = 'succeeded';
        state.productoDetalle = {
          ...action.payload,
          // Add placeholder values for UI fields not in API response
          stock: {
            disponible: 0,
            total: 0,
            reservado: 0
          },
          condicionesAlmacenamiento: {
            temperatura: 'No especificado',
            humedad: 'No especificado'
          },
          cadenaFrio: false,
          estado: 'ACTIVO',
          normativa: {
            tiene: false,
            documentos: []
          },
          ubicaciones: []
        };
      })
      .addCase(fetchProductoById.rejected, (state, action) => {
        state.productoDetalleStatus = 'failed';
        state.productoDetalleError = action.payload;
      });
  }
});

export const { 
  setFiltro, 
  limpiarFiltros, 
  selectProducto, 
  clearProductoSeleccionado,
  clearNotificacion,
  clearProductoDetalle
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
// Add create status selector
export const selectCreateStatus = state => state.catalogo.createStatus;
export const selectCreateError = state => state.catalogo.createError;
// Add producto detalle selectors
export const selectProductoDetalle = (state) => state.catalogo.productoDetalle;
export const selectProductoDetalleStatus = (state) => state.catalogo.productoDetalleStatus;
export const selectProductoDetalleError = (state) => state.catalogo.productoDetalleError;

export default catalogoSlice.reducer;
