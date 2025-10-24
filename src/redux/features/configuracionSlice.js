import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import configuracionService from '../../services/configuracion';

export const fetchConfiguracion = createAsyncThunk(
  'configuracion/fetchConfiguracion',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return rejectWithValue('No hay token disponible');
      }

      const userData = jwtDecode(token);
      const response = await configuracionService.getConfiguracion();
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }

      return response.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  pais: null,
  tiposIdentificacion: [],
  status: 'idle',
  error: null
};

const configuracionSlice = createSlice({
  name: 'configuracion',
  initialState,
  reducers: {
    clearConfiguracion: (state) => {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfiguracion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConfiguracion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pais = action.payload.pais;
        state.tiposIdentificacion = action.payload.tiposIdentificacion;
      })
      .addCase(fetchConfiguracion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearConfiguracion } = configuracionSlice.actions;

// Selectores
export const selectPaisConfig = state => state.configuracion?.pais || null;
export const selectTiposIdentificacion = state => state.configuracion?.tiposIdentificacion || [];
export const selectConfigStatus = state => state.configuracion?.status || 'idle';

export default configuracionSlice.reducer;
