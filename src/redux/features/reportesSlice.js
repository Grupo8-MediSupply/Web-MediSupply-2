import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Acción asíncrona para obtener KPIs de un vendedor
export const fetchVendedorKPIs = createAsyncThunk(
  'reportes/fetchVendedorKPIs',
  async (vendedorId, { rejectWithValue }) => {
    try {
      if (!vendedorId) {
        return rejectWithValue('ID de vendedor requerido');
      }
      
      const response = await api.reportes.getVendedorKPIs(vendedorId);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener KPIs');
      }
      
      return response.result[0]; // La API retorna un array con un elemento
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener KPIs del vendedor');
    }
  }
);

const initialState = {
  vendedorKPIs: null,
  vendedorSeleccionado: null,
  status: 'idle',
  error: null
};

const reportesSlice = createSlice({
  name: 'reportes',
  initialState,
  reducers: {
    setVendedorSeleccionado: (state, action) => {
      state.vendedorSeleccionado = action.payload;
    },
    clearVendedorKPIs: (state) => {
      state.vendedorKPIs = null;
      state.vendedorSeleccionado = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Manejar fetchVendedorKPIs
      .addCase(fetchVendedorKPIs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVendedorKPIs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vendedorKPIs = action.payload;
        state.error = null;
      })
      .addCase(fetchVendedorKPIs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { setVendedorSeleccionado, clearVendedorKPIs } = reportesSlice.actions;

// Selectores
export const selectVendedorKPIs = (state) => state.reportes.vendedorKPIs;
export const selectVendedorSeleccionado = (state) => state.reportes.vendedorSeleccionado;
export const selectReportesStatus = (state) => state.reportes.status;
export const selectReportesError = (state) => state.reportes.error;

export default reportesSlice.reducer;
