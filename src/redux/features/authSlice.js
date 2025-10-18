import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulación de una API de autenticación
const simulateApiCall = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        resolve({ 
          user: { 
            id: 1, 
            name: 'Administrador', 
            email: 'admin@medisupply.com',
            role: 'admin'
          }, 
          token: 'fake-jwt-token' 
        });
      } else {
        reject(new Error('Credenciales incorrectas'));
      }
    }, 1000);
  });
};

// Acción asíncrona para el login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await simulateApiCall(credentials);
      // Guardar token en localStorage
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Verificar token almacenado y obtener información del usuario
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return rejectWithValue('No token found');
      }
      
      // Simulación de verificación de token
      // En una app real, harías una llamada a la API para validar el token
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simula que el token es válido y devuelve datos del usuario
          resolve({
            user: {
              id: 1,
              name: 'Administrador',
              email: 'admin@medisupply.com',
              role: 'admin'
            },
            token
          });
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message || 'Error al verificar autenticación');
    }
  }
);

// Estado inicial
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
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
      localStorage.removeItem('token');
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
