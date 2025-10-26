import { useState, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../App';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';

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
import Button from '@mui/material/Button';

// Importaciones de íconos
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';

// Importar logos para modo claro y oscuro
import logoLight from '../assets/logo_medisupply.png';
import logoDark from '../assets/logo_medisupply_dark.svg';

const drawerWidth = 240;

function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Seleccionar el logo correcto según el modo
  const currentLogo = theme.palette.mode === 'dark' ? logoDark : logoLight;

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
          justifyContent: 'flex-start',
          py: 1.5,
          pl: 3,
        }}
      >
        <Box 
          component="img"
          src={currentLogo}
          alt="MediSupply Logo"
          sx={{ 
            height: 32,
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
      
      {/* Solo mantener el botón de tema */}
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
          elevation={0}  // Eliminamos la sombra para un diseño más limpio
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            display: { sm: 'none' },
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.divider}`
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
              src={currentLogo}
              alt="MediSupply Logo"
              sx={{ 
                height: 24,
                objectFit: 'contain'
              }}
            />
          </Toolbar>
        </AppBar>
      )}
      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          // Aseguramos que el drawer no afecte al flujo del documento
          position: 'fixed',
          height: '100%',
          zIndex: theme.zIndex.drawer
        }}
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
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
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
              borderTopRightRadius: 24,
              borderBottomRightRadius: 24,
              boxShadow: 3,
              overflow: 'hidden',
              // Asegurar que el drawer siempre esté visible
              zIndex: theme.zIndex.drawer
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
