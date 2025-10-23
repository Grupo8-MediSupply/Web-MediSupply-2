import React, { useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Chip,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';

// Redux actions y selectors
import { fetchCatalogo, selectProducto } from '../redux/features/catalogoSlice';

// Mapeo de códigos de países
const PAISES = {
  'CO': 'Colombia',
  'MX': 'México',
  'PE': 'Perú',
  'CL': 'Chile',
  'AR': 'Argentina'
};

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const producto = useSelector(state => state.catalogo.productoSeleccionado);
  const catalogoStatus = useSelector(state => state.catalogo.status);
  
  // Si no hay producto seleccionado, buscar en el catálogo por ID
  useEffect(() => {
    if (!producto && catalogoStatus !== 'loading') {
      // Primero cargar el catálogo si no está cargado
      if (catalogoStatus === 'idle') {
        dispatch(fetchCatalogo())
          .then(action => {
            // Una vez cargado el catálogo, buscar el producto por ID
            const foundProduct = action.payload.find(p => p.id === id);
            if (foundProduct) {
              dispatch(selectProducto(foundProduct));
            }
          });
      } else if (catalogoStatus === 'succeeded') {
        // Si el catálogo ya está cargado, buscar el producto
        const productos = useSelector(state => state.catalogo.productos);
        const foundProduct = productos.find(p => p.id === id);
        if (foundProduct) {
          dispatch(selectProducto(foundProduct));
        }
      }
    }
  }, [producto, id, catalogoStatus, dispatch]);

  // Navegación para breadcrumbs
  const breadcrumbsItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' }
  ];

  // Si no hay producto, mostrar mensaje
  if (!producto) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button
          component={RouterLink}
          to="/catalogo"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Volver al Catálogo
        </Button>
        
        <Alert severity="info">
          Cargando producto... Si no se muestra en unos segundos, el producto podría no existir.
        </Alert>
      </Container>
    );
  }

  // Función para formatear precios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'decimal'
    }).format(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navegación de migas de pan */}
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage={producto.nombre}
      />
      
      {/* Botón para volver */}
      <Button
        component={RouterLink}
        to="/catalogo"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Volver al Catálogo
      </Button>
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {producto.nombre}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {producto.id} - {producto.categoria}
            </Typography>
          </Box>
          
          <Box>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ mr: 1 }}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              startIcon={<InventoryIcon />}
            >
              Ver en inventario
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Información del producto
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" width="40%">Descripción</TableCell>
                    <TableCell>{producto.descripcion}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Precio</TableCell>
                    <TableCell>{formatCurrency(producto.precio)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Proveedor</TableCell>
                    <TableCell>{producto.proveedor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">País</TableCell>
                    <TableCell>{PAISES[producto.pais] || producto.pais}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Stock actual</TableCell>
                    <TableCell>{producto.stock} unidades</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Especificaciones
            </Typography>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" width="40%">Categoría</TableCell>
                    <TableCell>{producto.categoria}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Cadena de frío</TableCell>
                    <TableCell>
                      <Chip 
                        label={producto.cadenaFrio ? "Cumple" : "No requiere"} 
                        color={producto.cadenaFrio ? "primary" : "default"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Normativa</TableCell>
                    <TableCell>
                      <Chip 
                        label={producto.normativa ? "Con normativa" : "Sin normativa"} 
                        color={producto.normativa ? "secondary" : "default"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Tipo</TableCell>
                    <TableCell>
                      <Chip 
                        label={producto.esInsumo ? "Insumo" : "Producto"} 
                        color={producto.esInsumo ? "info" : "success"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Estado</TableCell>
                    <TableCell>{producto.estado}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
            {producto.normativa && (
              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="outlined" 
                  color="secondary"
                >
                  Ver documentación normativa
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductoDetalle;
