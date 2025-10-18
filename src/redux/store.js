import { configureStore } from '@reduxjs/toolkit';
import inventarioReducer from './features/inventarioSlice';
import authReducer from './features/authSlice';
import catalogoReducer from './features/catalogoSlice';

export const store = configureStore({
  reducer: {
    inventario: inventarioReducer,
    auth: authReducer,
    catalogo: catalogoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora algunas acciones no serializables si es necesario
        ignoredActions: ['auth/loginSuccess'],
      },
    }),
});
