import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Datos de ejemplo para el catálogo adaptados al mockup
const fakeCatalogoData = [
  { 
    id: 'MED-001', 
    nombre: 'Amoxicilina 500mg', 
    descripcion: 'Antibiótico de amplio espectro',
    precio: 12500,
    proveedor: 'FarmaLatam',
    pais: 'CO',
    stock: 320,
    cadenaFrio: true,
    estado: 'Activo',
    categoria: 'Medicamentos',
    normativa: true,
    esInsumo: false
  },
  { 
    id: 'MED-014', 
    nombre: 'Vacuna Influenza', 
    descripcion: 'Vacuna contra la influenza estacional',
    precio: 58000,
    proveedor: 'SaludGlobal',
    pais: 'MX',
    stock: 45,
    cadenaFrio: true,
    estado: 'Activo',
    categoria: 'Vacunas',
    normativa: true,
    esInsumo: false
  },
  { 
    id: 'INS-220', 
    nombre: 'Guantes Nitrilo M', 
    descripcion: 'Guantes de nitrilo talla M, caja x100',
    precio: 1900,
    proveedor: 'MediSupply',
    pais: 'CO',
    stock: 1200,
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Protección',
    normativa: false,
    esInsumo: true
  },
  { 
    id: 'EQP-030', 
    nombre: 'Monitor Signos V', 
    descripcion: 'Monitor de signos vitales avanzado',
    precio: 2450000,
    proveedor: 'CareTech',
    pais: 'PE',
    stock: 12,
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Equipamiento',
    normativa: true,
    esInsumo: false
  },
  { 
    id: 'MED-099', 
    nombre: 'Metformina 850mg', 
    descripcion: 'Medicamento para diabetes tipo 2',
    precio: 9800,
    proveedor: 'MediSupply',
    pais: 'CO',
    stock: 640,
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Medicamentos',
    normativa: true,
    esInsumo: false
  },
  { 
    id: 'INS-045', 
    nombre: 'Jeringa 5 ml', 
    descripcion: 'Jeringa desechable de 5ml',
    precio: 750,
    proveedor: 'FarmaLatam',
    pais: 'CL',
    stock: 4600,
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Insumos',
    normativa: false,
    esInsumo: true
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

// Acción asíncrona para cargar normativas
export const cargarNormativas = createAsyncThunk(
  'catalogo/cargarNormativas',
  async (_, { rejectWithValue }) => {
    try {
      // Simulación de carga de normativas
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Normativas cargadas correctamente' };
    } catch (error) {
      return rejectWithValue('Error al cargar normativas');
    }
  }
);

// Acción asíncrona para carga masiva de productos
export const cargaMasiva = createAsyncThunk(
  'catalogo/cargaMasiva',
  async (archivo, { rejectWithValue }) => {
    try {
      // Simulación de carga masiva
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, message: 'Productos cargados correctamente', count: 5 };
    } catch (error) {
      return rejectWithValue('Error en la carga masiva de productos');
    }
  }
);

const initialState = {
  productos: [],
  status: 'idle',
  error: null,
  notificacion: null,
  filtros: {
    categoria: '',
    proveedor: '',
    pais: '',
    estado: '',
    cadenaFrio: '',
    normativa: '',
    esInsumo: ''
  },
  productoSeleccionado: null,
  loadingNormativas: false,
  loadingCargaMasiva: false
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
        categoria: '',
        proveedor: '',
        pais: '',
        estado: '',
        cadenaFrio: '',
        normativa: '',
        esInsumo: ''
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
      // Manejar cargarNormativas
      .addCase(cargarNormativas.pending, (state) => {
        state.loadingNormativas = true;
      })
      .addCase(cargarNormativas.fulfilled, (state, action) => {
        state.loadingNormativas = false;
        state.notificacion = {
          tipo: 'success',
          mensaje: action.payload.message
        };
      })
      .addCase(cargarNormativas.rejected, (state, action) => {
        state.loadingNormativas = false;
        state.notificacion = {
          tipo: 'error',
          mensaje: action.payload || 'Error al cargar normativas'
        };
      })
      // Manejar cargaMasiva
      .addCase(cargaMasiva.pending, (state) => {
        state.loadingCargaMasiva = true;
      })
      .addCase(cargaMasiva.fulfilled, (state, action) => {
        state.loadingCargaMasiva = false;
        state.notificacion = {
          tipo: 'success',
          mensaje: `${action.payload.message}: ${action.payload.count} productos`
        };
      })
      .addCase(cargaMasiva.rejected, (state, action) => {
        state.loadingCargaMasiva = false;
        state.notificacion = {
          tipo: 'error',
          mensaje: action.payload || 'Error en la carga masiva'
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

// Selector para filtrar productos
export const selectFilteredProductos = (state) => {
  const { productos, filtros } = state.catalogo;
  return productos.filter(producto => {
    const categoriaMatch = !filtros.categoria || producto.categoria === filtros.categoria;
    const proveedorMatch = !filtros.proveedor || producto.proveedor === filtros.proveedor;
    const paisMatch = !filtros.pais || producto.pais === filtros.pais;
    const estadoMatch = !filtros.estado || producto.estado === filtros.estado;
    
    // Para cadena de frío, normativa y esInsumo, comparamos con strings ya que vienen de un select
    const cadenaFrioMatch = filtros.cadenaFrio === '' || 
      (filtros.cadenaFrio === 'true' && producto.cadenaFrio) || 
      (filtros.cadenaFrio === 'false' && !producto.cadenaFrio);
    
    const normativaMatch = filtros.normativa === '' || 
      (filtros.normativa === 'true' && producto.normativa) || 
      (filtros.normativa === 'false' && !producto.normativa);
    
    const insumoMatch = filtros.esInsumo === '' || 
      (filtros.esInsumo === 'true' && producto.esInsumo) || 
      (filtros.esInsumo === 'false' && !producto.esInsumo);
    
    return categoriaMatch && proveedorMatch && paisMatch && 
           estadoMatch && cadenaFrioMatch && normativaMatch && insumoMatch;
  });
};

// Selectores para obtener opciones únicas para los filtros
export const selectCategorias = state => {
  return [...new Set(state.catalogo.productos.map(p => p.categoria))];
};

export const selectProveedores = state => {
  return [...new Set(state.catalogo.productos.map(p => p.proveedor))];
};

export const selectPaises = state => {
  return [...new Set(state.catalogo.productos.map(p => p.pais))];
};

export const selectEstados = state => {
  return [...new Set(state.catalogo.productos.map(p => p.estado))];
};

export default catalogoSlice.reducer;
