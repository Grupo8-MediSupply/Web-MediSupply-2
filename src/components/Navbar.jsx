import { useState, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../App';

// Importaciones de Material UI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importaciones de íconos
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Importar el logo
import logo from '../assets/logo_medisupply.png';

const drawerWidth = 240;

function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Inventarios', path: '/inventarios' },
    { text: 'Catálogo', path: '/catalogo' },
    { text: 'Proveedores', path: '/proveedores' },
    { text: 'Ordenes', path: '/ordenes' },
    { text: 'Logisticas', path: '/logisticas' },
    { text: 'Ventas', path: '/ventas' },
    { text: 'Clientes', path: '/clientes' },
    { text: 'Reportes', path: '/reportes' },
    { text: 'Configuración', path: '/configuracion' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start', // Cambio de 'center' a 'flex-start' para alinear a la izquierda
          py: 1.5,
          pl: 3, // Añadido padding izquierdo para que no esté pegado al borde
        }}
      >
        <Box 
          component="img"
          src={logo}
          alt="MediSupply Logo"
          sx={{ 
            height: 32, // Tamaño reducido del logo
            objectFit: 'contain'
          }}
        />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={isActive}
                sx={{
                  bgcolor: isActive ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  borderRadius: '0 20px 20px 0',
                  mr: 1,
                  pl: 3, // Padding izquierdo aumentado para compensar la falta de iconos
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'primary.main' : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            display: { sm: 'none' }
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box 
              component="img"
              src={logo}
              alt="MediSupply Logo"
              sx={{ 
                height: 24, // También reducido el tamaño aquí para consistencia
                objectFit: 'contain'
              }}
            />
          </Toolbar>
        </AppBar>
      )}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu opciones"
      >
        {/* Drawer para dispositivos móviles */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejor rendimiento en dispositivos móviles
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.mode === 'light' ? 'background.default' : 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Drawer permanente para dispositivos de escritorio */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.mode === 'light' ? 'background.default' : 'background.paper',
              borderRight: `1px solid ${theme.palette.divider}`,
              height: '100vh',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
