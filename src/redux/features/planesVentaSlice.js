import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Acción para crear un plan de venta
export const createPlanVenta = createAsyncThunk(
  'planesVenta/createPlanVenta',
  async (planData, { rejectWithValue }) => {
    try {
      const response = await api.planesVenta.createPlanVenta(planData);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al crear plan de venta');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear plan de venta');
    }
  }
);

// Acción para obtener planes por vendedor
export const fetchPlanesByVendedor = createAsyncThunk(
  'planesVenta/fetchPlanesByVendedor',
  async (vendedorId, { rejectWithValue }) => {
    try {
      const response = await api.planesVenta.getPlanesByVendedor(vendedorId);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener planes');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener planes');
    }
  }
);

// Acción para obtener todos los planes
export const fetchAllPlanes = createAsyncThunk(
  'planesVenta/fetchAllPlanes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.planesVenta.getAllPlanes();
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener planes');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener planes');
    }
  }
);

const initialState = {
  planes: [],
  status: 'idle',
  error: null,
  createStatus: 'idle',
  createError: null
};

const planesVentaSlice = createSlice({
  name: 'planesVenta',
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = 'idle';
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create plan
      .addCase(createPlanVenta.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createPlanVenta.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.planes.push(action.payload);
      })
      .addCase(createPlanVenta.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.payload || action.error.message;
      })
      // Fetch by vendedor
      .addCase(fetchPlanesByVendedor.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPlanesByVendedor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.planes = action.payload;
      })
      .addCase(fetchPlanesByVendedor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Fetch all
      .addCase(fetchAllPlanes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllPlanes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.planes = action.payload;
      })
      .addCase(fetchAllPlanes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { resetCreateStatus } = planesVentaSlice.actions;

// Selectores
export const selectAllPlanes = (state) => state.planesVenta.planes;
export const selectPlanesStatus = (state) => state.planesVenta.status;
export const selectPlanesError = (state) => state.planesVenta.error;
export const selectCreateStatus = (state) => state.planesVenta.createStatus;
export const selectCreateError = (state) => state.planesVenta.createError;

export default planesVentaSlice.reducer;
