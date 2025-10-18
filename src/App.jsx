import { useState, useMemo, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';

// Páginas
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import getTheme from "./theme/theme";
import "./App.css";

// Importar páginas para las nuevas rutas
import Inventarios from "./pages/Inventarios";
import Catalogo from "./pages/Catalogo";
import Proveedores from "./pages/Proveedores";
import Ordenes from "./pages/Ordenes";
import Logisticas from "./pages/Logisticas";
import Ventas from "./pages/Ventas";
import Clientes from "./pages/Clientes";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";

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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box
              component="main"
              sx={{ 
                flexGrow: 1, 
                px: { xs: 2, sm: 3 }, // Padding horizontal diferenciado
                py: { xs: 2, sm: 3 }, // Padding vertical diferenciado
                width: { sm: `calc(100% - ${drawerWidth}px)` }, 
                ml: { sm: `${drawerWidth}px` },
                transition: theme => theme.transitions.create('margin', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                overflowX: 'hidden',
                minHeight: '100vh', // Asegura que el contenido ocupe al menos toda la altura
                boxSizing: 'border-box'
              }}
            >
              {/* Espaciado para dispositivos móviles con AppBar */}
              <Box sx={{ height: { xs: '64px', sm: '0px' }, display: { sm: 'none' } }} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/inventarios" element={<Inventarios />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/proveedores" element={<Proveedores />} />
                <Route path="/ordenes" element={<Ordenes />} />
                <Route path="/logisticas" element={<Logisticas />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/configuracion" element={<Configuracion />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
