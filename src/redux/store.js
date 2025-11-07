import { configureStore } from '@reduxjs/toolkit';
import inventarioReducer from './features/inventarioSlice';
import authReducer from './features/authSlice';
import catalogoReducer from './features/catalogoSlice';
import bodegasReducer from './features/bodegasSlice';
import vendedoresReducer from './features/vendedoresSlice';
import proveedoresReducer from './features/proveedoresSlice';
import configuracionReducer from './features/configuracionSlice';
import reportesReducer from './features/reportesSlice';
import logisticaReducer from './features/logisticaSlice';

export const store = configureStore({
  reducer: {
    inventario: inventarioReducer,
    auth: authReducer,
    catalogo: catalogoReducer,
    bodegas: bodegasReducer,
    vendedores: vendedoresReducer,
    proveedores: proveedoresReducer,
    configuracion: configuracionReducer,
    reportes: reportesReducer,
    logistica: logisticaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora algunas acciones no serializables si es necesario
        ignoredActions: ['auth/loginSuccess'],
      },
    }),
});
