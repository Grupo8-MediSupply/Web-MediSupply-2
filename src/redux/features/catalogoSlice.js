import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Datos de ejemplo para el catálogo adaptados al mockup
const fakeCatalogoData = [
  { 
    id: 'MED-001', 
    nombre: 'Amoxicilina 500mg',
    sku: 'MED-001',  // Added SKU
    descripcion: 'Antibiótico de amplio espectro',
    precio: 12500,
    proveedor: 'FarmaLatam',
    pais: 'CO',
    stock: {
      total: 320,
      reservado: 40,
      disponible: 280
    },
    condicionesAlmacenamiento: {
      temperatura: '2-8°C',
      humedad: '30-65%',
      requiereRefrigeracion: true
    },
    cadenaFrio: true,
    estado: 'Activo',
    categoria: 'Medicamentos',
    normativa: {
      tiene: true,
      documentos: [
        { id: 1, nombre: 'Registro INVIMA', archivo: 'invima-med-001.pdf' },
        { id: 2, nombre: 'Ficha técnica', archivo: 'ficha-med-001.pdf' }
      ]
    },
    esInsumo: false,
    ubicaciones: [
      { bodega: 'Bodega Central', cantidad: 200 },
      { bodega: 'Bodega Norte', cantidad: 120 }
    ]
  },
  { 
    id: 'MED-014', 
    nombre: 'Vacuna Influenza', 
    descripcion: 'Vacuna contra la influenza estacional',
    precio: 58000,
    proveedor: 'SaludGlobal',
    pais: 'MX',
    stock: {
      total: 45,
      reservado: 5,
      disponible: 40
    },
    condicionesAlmacenamiento: {
      temperatura: '2-8°C',
      humedad: '30-65%',
      requiereRefrigeracion: true
    },
    cadenaFrio: true,
    estado: 'Activo',
    categoria: 'Vacunas',
    normativa: {
      tiene: true,
      documentos: [
        { id: 1, nombre: 'Registro VACUNAS', archivo: 'registro-vacuna-014.pdf' },
        { id: 2, nombre: 'Instrucciones de uso', archivo: 'instrucciones-vacuna-014.pdf' }
      ]
    },
    esInsumo: false,
    ubicaciones: [
      { bodega: 'Bodega Sur', cantidad: 25 },
      { bodega: 'Bodega Este', cantidad: 20 }
    ]
  },
  { 
    id: 'INS-220', 
    nombre: 'Guantes Nitrilo M', 
    descripcion: 'Guantes de nitrilo talla M, caja x100',
    precio: 1900,
    proveedor: 'MediSupply',
    pais: 'CO',
    stock: {
      total: 1200,
      reservado: 300,
      disponible: 900
    },
    condicionesAlmacenamiento: {
      temperatura: '10-30°C',
      humedad: '40-60%',
      requiereRefrigeracion: false
    },
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Protección',
    normativa: false,
    esInsumo: true,
    ubicaciones: [
      { bodega: 'Bodega Central', cantidad: 600 },
      { bodega: 'Bodega Norte', cantidad: 600 }
    ]
  },
  { 
    id: 'EQP-030', 
    nombre: 'Monitor Signos V', 
    descripcion: 'Monitor de signos vitales avanzado',
    precio: 2450000,
    proveedor: 'CareTech',
    pais: 'PE',
    stock: {
      total: 12,
      reservado: 2,
      disponible: 10
    },
    condicionesAlmacenamiento: {
      temperatura: '15-25°C',
      humedad: '30-50%',
      requiereRefrigeracion: false
    },
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Equipamiento',
    normativa: true,
    esInsumo: false,
    ubicaciones: [
      { bodega: 'Bodega Equipos', cantidad: 5 },
      { bodega: 'Bodega Sur', cantidad: 7 }
    ]
  },
  { 
    id: 'MED-099', 
    nombre: 'Metformina 850mg', 
    descripcion: 'Medicamento para diabetes tipo 2',
    precio: 9800,
    proveedor: 'MediSupply',
    pais: 'CO',
    stock: {
      total: 640,
      reservado: 80,
      disponible: 560
    },
    condicionesAlmacenamiento: {
      temperatura: '10-30°C',
      humedad: '40-60%',
      requiereRefrigeracion: false
    },
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Medicamentos',
    normativa: true,
    esInsumo: false,
    ubicaciones: [
      { bodega: 'Bodega Central', cantidad: 320 },
      { bodega: 'Bodega Norte', cantidad: 320 }
    ]
  },
  { 
    id: 'INS-045', 
    nombre: 'Jeringa 5 ml', 
    descripcion: 'Jeringa desechable de 5ml',
    precio: 750,
    proveedor: 'FarmaLatam',
    pais: 'CL',
    stock: {
      total: 4600,
      reservado: 600,
      disponible: 4000
    },
    condicionesAlmacenamiento: {
      temperatura: '10-30°C',
      humedad: '40-60%',
      requiereRefrigeracion: false
    },
    cadenaFrio: false,
    estado: 'Activo',
    categoria: 'Insumos',
    normativa: false,
    esInsumo: true,
    ubicaciones: [
      { bodega: 'Bodega Insumos', cantidad: 2300 },
      { bodega: 'Bodega Sur', cantidad: 2300 }
    ]
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
