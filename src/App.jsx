import { useState, useMemo, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

// Páginas y componentes
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import { Roles } from "./constants/auth";
import getTheme from "./theme/theme";
import "./App.css";

// Importar páginas para las nuevas rutas
import Inventarios from "./pages/Inventarios";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle"; // Añadimos la importación
import Proveedores from "./pages/Proveedores";
import Ordenes from "./pages/Ordenes";
import Logisticas from "./pages/Logisticas";
import Ventas from "./pages/Ventas";
import Clientes from "./pages/Clientes";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";
import Auditoria from "./pages/configuracion/Auditoria";
import Usuarios from "./pages/configuracion/Usuarios";
import ApiModeIndicator from "./components/ApiModeIndicator";

// Importar página de vendedores
import Vendedores from "./pages/ventas/Vendedores";
import ReportesVentas from "./pages/ventas/ReportesVentas";
import PlanesVenta from "./pages/ventas/PlanesVenta";

// Importar página de detalle de bodega
import BodegaDetalle from "./pages/BodegaDetalle";

// Importar el componente MainAppBar
import MainAppBar from './components/layout/MainAppBar';

// Contexto para gestionar el modo oscuro/claro
export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light'
});

// Ancho del drawer
const drawerWidth = 240;

function App() {
  // Detectar preferencia de color del sistema o usar una guardada
  const getInitialMode = () => {
    const savedMode = localStorage.getItem('colorMode');
    if (savedMode) {
      return savedMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [mode, setMode] = useState(getInitialMode);

  // Guardar el modo seleccionado en localStorage
  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  // Función para alternar entre modos claro/oscuro
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Crear el tema según el modo actual
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Verificar si el usuario está autenticado para mostrar un layout diferente
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {isAuthenticated ? (
            // Layout para usuarios autenticados con Navbar
            <Box sx={{ display: 'flex' }}>
              <Navbar />
              <MainAppBar />
              <Box
                component="main"
                sx={{ 
                  flexGrow: 1, 
                  px: { xs: 2, sm: 3 },
                  py: { xs: 2, sm: 3 },
                  width: { sm: `calc(100% - ${drawerWidth}px)` }, 
                  ml: { sm: `${drawerWidth}px` },
                  mt: '64px', // Añadir margen superior para el AppBar
                  transition: theme => theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                  overflowX: 'hidden',
                  minHeight: 'calc(100vh - 64px)', // Ajustar para el AppBar
                  boxSizing: 'border-box'
                }}
              >
                {/* Espaciado para dispositivos móviles con AppBar */}
                <Box sx={{ height: { xs: '64px', sm: '0px' }, display: { sm: 'none' } }} />
                <Routes>
                  {/* Rutas protegidas */}
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                  <Route path="/inventarios" element={<ProtectedRoute><Inventarios /></ProtectedRoute>} />
                  <Route path="/inventarios/bodegas/:id" element={<ProtectedRoute><BodegaDetalle /></ProtectedRoute>} />
                  <Route path="/catalogo" element={<ProtectedRoute><Catalogo /></ProtectedRoute>} />
                  <Route path="/catalogo/productos/:id" element={<ProtectedRoute><ProductoDetalle /></ProtectedRoute>} />
                  <Route path="/proveedores" element={<ProtectedRoute><Proveedores /></ProtectedRoute>} />
                  <Route path="/ordenes" element={<ProtectedRoute><Ordenes /></ProtectedRoute>} />
                  <Route path="/logisticas" element={<ProtectedRoute><Logisticas /></ProtectedRoute>} />
                  
                  {/* Rutas de Ventas - Solo para ADMIN */}
                  <Route 
                    path="/ventas" 
                    element={
                      <ProtectedRoute>
                        <RoleBasedRoute allowedRoles={[Roles.ADMIN]}>
                          <Ventas />
                        </RoleBasedRoute>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/ventas/vendedores" 
                    element={
                      <ProtectedRoute>
                        <RoleBasedRoute allowedRoles={[Roles.ADMIN]}>
                          <Vendedores />
                        </RoleBasedRoute>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/ventas/planes" 
                    element={
                      <ProtectedRoute>
                        <RoleBasedRoute allowedRoles={[Roles.ADMIN]}>
                          <PlanesVenta />
                        </RoleBasedRoute>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/ventas/reportes" 
                    element={
                      <ProtectedRoute>
                        <RoleBasedRoute allowedRoles={[Roles.ADMIN]}>
                          <ReportesVentas />
                        </RoleBasedRoute>
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
                  <Route path="/configuracion" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />
                  <Route 
                    path="/configuracion/auditoria" 
                    element={
                      <ProtectedRoute>
                        <RoleBasedRoute allowedRoles={[Roles.ADMIN]}>
                          <Auditoria />
                        </RoleBasedRoute>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/configuracion/usuarios" 
                    element={
                      <ProtectedRoute>
                        <RoleBasedRoute allowedRoles={[Roles.ADMIN]}>
                          <Usuarios />
                        </RoleBasedRoute>
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Redirigir la ruta /login a / si ya está autenticado */}
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  
                  {/* Ruta para cualquier otra dirección */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Box>
              {/* Indicador de modo API */}
              {import.meta.env.DEV && <ApiModeIndicator />}
            </Box>
          ) : (
            // Layout para usuarios no autenticados
            <>
              <Routes>
                <Route path="/login" element={<Login />} />
                {/* Redirigir cualquier otra ruta a /login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
              {/* Indicador de modo API */}
              {import.meta.env.DEV && <ApiModeIndicator />}
            </>
          )}
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
