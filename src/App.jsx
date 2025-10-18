import { useState, useMemo, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import getTheme from "./theme/theme";
import "./App.css";

// Contexto para gestionar el modo oscuro/claro
export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light'
});

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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
