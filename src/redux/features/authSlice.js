import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import { fetchConfiguracion } from './configuracionSlice';

// Acción asíncrona para el login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.auth.login({
        email: credentials.username,
        password: credentials.password
      });
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error en el inicio de sesión');
      }

      // Store token in localStorage
      localStorage.setItem('access_token', response.result.access_token);

      // Decode token and extract user info
      const userData = jwtDecode(response.result.access_token);
      
      // After successful login, fetch configuration
      await dispatch(fetchConfiguracion()).unwrap();
      
      return {
        token: response.result.access_token,
        user: {
          id: userData.sub || '',
          email: userData.email || '',
          role: userData.role || '',
          pais: userData.pais || ''
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(
        error.message || 
        (error.response?.message) || 
        'Error en el inicio de sesión'
      );
    }
  }
);

// Verificar token almacenado y obtener información del usuario
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }
      
      // Decodificar el token para verificar que no esté expirado
      let userData = {};
      try {
        userData = jwtDecode(token);
        
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
      
      // En una app real, podríamos intentar refrescar el token
      // const refreshResponse = await api.auth.refreshToken();
      
      return {
        token,
        user: {
          id: userData.sub || '',
          email: userData.email || '',
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
  error: null,
  lastLoginAttempt: null // Add this to track login attempts
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
      state.lastLoginAttempt = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastLoginAttempt = Date.now();
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido en el inicio de sesión';
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
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
