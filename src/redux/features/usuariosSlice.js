import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usuariosService from '../../services/usuarios';

// Acción asíncrona para obtener usuarios
export const fetchUsuarios = createAsyncThunk(
  'usuarios/fetchUsuarios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usuariosService.getUsuarios();
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al obtener usuarios');
      }
      
      return response.result;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener usuarios');
    }
  }
);

// Acción asíncrona para actualizar estado de usuario
export const updateUsuarioEstado = createAsyncThunk(
  'usuarios/updateUsuarioEstado',
  async ({ idUsuario, activo }, { rejectWithValue }) => {
    try {
      const response = await usuariosService.updateUsuarioEstado(idUsuario, activo);
      
      if (!response.success) {
        return rejectWithValue(response.message || 'Error al actualizar usuario');
      }
      
      return { idUsuario, activo };
    } catch (error) {
      return rejectWithValue(error.message || 'Error al actualizar usuario');
    }
  }
);

const initialState = {
  usuarios: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  updateStatus: 'idle',
  updateError: null,
  filtros: {
    email: '',
    rolId: '',
    activo: '',
    identificacion: ''
  }
};

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    setFiltros: (state, action) => {
      state.filtros = { ...state.filtros, ...action.payload };
    },
    clearFiltros: (state) => {
      state.filtros = {
        email: '',
        rolId: '',
        activo: '',
        identificacion: ''
      };
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle';
      state.updateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch usuarios
      .addCase(fetchUsuarios.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usuarios = action.payload;
        state.error = null;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Update usuario estado
      .addCase(updateUsuarioEstado.pending, (state) => {
        state.updateStatus = 'loading';
        state.updateError = null;
      })
      .addCase(updateUsuarioEstado.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        // Actualizar el usuario en el estado local
        const { idUsuario, activo } = action.payload;
        const usuario = state.usuarios.find(u => u.id === idUsuario);
        if (usuario) {
          usuario.activo = activo;
        }
        state.updateError = null;
      })
      .addCase(updateUsuarioEstado.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.updateError = action.payload || action.error.message;
      });
  }
});

export const { setFiltros, clearFiltros, resetUpdateStatus } = usuariosSlice.actions;

// Selectores
export const selectAllUsuarios = (state) => state.usuarios.usuarios;
export const selectUsuariosStatus = (state) => state.usuarios.status;
export const selectUsuariosError = (state) => state.usuarios.error;
export const selectUpdateStatus = (state) => state.usuarios.updateStatus;
export const selectUpdateError = (state) => state.usuarios.updateError;
export const selectFiltros = (state) => state.usuarios.filtros;

// Selector para usuarios filtrados
export const selectFilteredUsuarios = (state) => {
  const usuarios = state.usuarios?.usuarios || [];
  const filtros = state.usuarios?.filtros || {};
  
  return usuarios.filter(usuario => {
    if (filtros.email && !usuario.email.toLowerCase().includes(filtros.email.toLowerCase())) {
      return false;
    }
    if (filtros.rolId && usuario.rolId.toString() !== filtros.rolId.toString()) {
      return false;
    }
    if (filtros.activo !== '' && usuario.activo.toString() !== filtros.activo) {
      return false;
    }
    if (filtros.identificacion && !usuario.identificacion.includes(filtros.identificacion)) {
      return false;
    }
    
    return true;
  });
};

// Selector para estadísticas
export const selectUsuariosStats = (state) => {
  const usuarios = state.usuarios?.usuarios || [];
  
  return {
    total: usuarios.length,
    activos: usuarios.filter(u => u.activo).length,
    inactivos: usuarios.filter(u => !u.activo).length,
    porRol: usuarios.reduce((acc, usuario) => {
      acc[usuario.rolId] = (acc[usuario.rolId] || 0) + 1;
      return acc;
    }, {})
  };
};

export default usuariosSlice.reducer;
