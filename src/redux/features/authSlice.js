import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { jwtDecode } from 'jwt-decode'; // Corrección de la importación

// Acción asíncrona para el login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.auth.login({
        email: credentials.username, // Adaptamos el username a email para la API
        password: credentials.password
      });
      
      if (!response || !response.success || !response.result?.access_token) {
        return rejectWithValue(response?.message || 'Error en la autenticación');
      }
      
      // Guardar token en localStorage
      localStorage.setItem('access_token', response.result.access_token);
      
      // Decodificar el token para obtener información del usuario
      let userData = {};
      try {
        userData = jwtDecode(response.result.access_token); // Usamos la función importada correctamente
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
      
      return {
        token: response.result.access_token,
        user: {
          id: userData.sub || '',
          role: userData.role || '',
          pais: userData.pais || ''
        }
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Error en la autenticación');
    }
  }
);

// Verificar token almacenado y obtener información del usuario
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }
      
      // Decodificar el token para verificar que no esté expirado
      let userData = {};
      try {
        userData = jwtDecode(token); // Usamos la función importada correctamente
        
        // Verificar si el token ha expirado
        const currentTime = Date.now() / 1000;
        if (userData.exp && userData.exp < currentTime) {
          localStorage.removeItem('access_token');
          return rejectWithValue('Token expirado');
        }
        
      } catch (error) {
        localStorage.removeItem('access_token');
        return rejectWithValue('Token inválido');
      }
      
      return {
        token,
        user: {
          id: userData.sub || '',
          role: userData.role || '',
          pais: userData.pais || ''
        }
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Error al verificar autenticación');
    }
  }
);

// Estado inicial
const initialState = {
  user: null,
  token: localStorage.getItem('access_token') || null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Manejar verificación de autenticación
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
