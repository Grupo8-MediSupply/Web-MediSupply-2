import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auditoriaService from '../../services/auditoria';

// Acción asíncrona para obtener auditorías
export const fetchAuditorias = createAsyncThunk(
  'auditoria/fetchAuditorias',
  async (_, { rejectWithValue }) => {
    try {
      const response = await auditoriaService.getAuditorias();
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener auditorías');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener auditorías');
    }
  }
);

const initialState = {
  auditorias: [],
  status: 'idle',
  error: null,
  filtros: {
    modulo: '',
    accion: '',
    severidad: '',
    email: '',
    fechaInicio: null,
    fechaFin: null
  }
};

const auditoriaSlice = createSlice({
  name: 'auditoria',
  initialState,
  reducers: {
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    clearFiltros: (state) => {
      state.filtros = {
        modulo: '',
        accion: '',
        severidad: '',
        email: '',
        fechaInicio: null,
        fechaFin: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditorias.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAuditorias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.auditorias = action.payload;
        state.error = null;
      })
      .addCase(fetchAuditorias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { setFiltros, clearFiltros } = auditoriaSlice.actions;

// Selectores
export const selectAllAuditorias = (state) => state.auditoria.auditorias;
export const selectAuditoriasStatus = (state) => state.auditoria.status;
export const selectAuditoriasError = (state) => state.auditoria.error;
export const selectFiltros = (state) => state.auditoria.filtros;

// Selector para auditorías filtradas
export const selectFilteredAuditorias = (state) => {
  const auditorias = state.auditoria?.auditorias || [];
  const filtros = state.auditoria?.filtros || {};
  
  return auditorias.filter(auditoria => {
    if (filtros.modulo && auditoria.modulo !== filtros.modulo) return false;
    if (filtros.accion && !auditoria.accion.toLowerCase().includes(filtros.accion.toLowerCase())) return false;
    if (filtros.severidad && auditoria.severidad !== filtros.severidad) return false;
    if (filtros.email && !auditoria.email.toLowerCase().includes(filtros.email.toLowerCase())) return false;
    
    if (filtros.fechaInicio) {
      const fechaAuditoria = new Date(auditoria.createdAt);
      const fechaInicio = new Date(filtros.fechaInicio);
      if (fechaAuditoria < fechaInicio) return false;
    }
    
    if (filtros.fechaFin) {
      const fechaAuditoria = new Date(auditoria.createdAt);
      const fechaFin = new Date(filtros.fechaFin);
      if (fechaAuditoria > fechaFin) return false;
    }
    
    return true;
  });
};

export default auditoriaSlice.reducer;
