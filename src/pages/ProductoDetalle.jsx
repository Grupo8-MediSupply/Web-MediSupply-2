import React, { useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  Card,
  CardContent,
  IconButton,
  Stack,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WallpaperIcon from '@mui/icons-material/Wallpaper';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';

// Redux actions y selectors
import { 
  fetchProductoById, 
  selectProductoDetalle, 
  selectProductoDetalleStatus, 
  selectProductoDetalleError,
  clearProductoDetalle 
} from '../redux/features/catalogoSlice';

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
  
  const producto = useSelector(selectProductoDetalle);
  const status = useSelector(selectProductoDetalleStatus);
  const error = useSelector(selectProductoDetalleError);
  
  // Si no hay producto seleccionado, buscar en el catálogo por ID
  useEffect(() => {
    if (id) {
      dispatch(fetchProductoById(id));
    }
    
    return () => {
      dispatch(clearProductoDetalle());
    };
  }, [id, dispatch]);

  // Navegación para breadcrumbs
  const breadcrumbsItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' }
  ];

  // Función para formatear precios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Estado de carga
  if (status === 'loading') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <LinearProgress />
      </Container>
    );
  }

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
          El producto no se encuentra disponible.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navegación de migas de pan */}
      <BreadcrumbsNav items={breadcrumbsItems} currentPage={producto.nombre} />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Sección de encabezado */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            {/* Columna izquierda - Marcador de posición de imagen */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: 300,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  border: '1px dashed',
                  borderColor: 'grey.300'
                }}
              >
                <WallpaperIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Imagen del producto
                </Typography>
              </Box>
            </Grid>

            {/* Columna derecha - Información básica */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {producto.nombre}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip 
                      label={`SKU: ${producto.sku}`}
                      variant="outlined"
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {producto.categoria}
                    </Typography>
                  </Stack>
                </Box>
                
                <Stack direction="row" spacing={1}>
                  <IconButton color="primary" size="small" title="Compartir">
                    <ShareIcon />
                  </IconButton>
                  <IconButton color="primary" size="small" title="Descargar ficha">
                    <DownloadIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                  >
                    Editar producto
                  </Button>
                </Stack>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                  {producto.descripcion}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Precio base
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {formatCurrency(producto.precio)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Precio sin IVA
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Stock actual
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Typography variant="h4">
                          {producto.stock.disponible}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          de {producto.stock.total} unidades
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="warning.main">
                        {producto.stock.reservado} unidades reservadas
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Sección de información detallada */}
        <Grid container spacing={4}>
          {/* Columna izquierda - Especificaciones */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Especificaciones
            </Typography>
            
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Condiciones de almacenamiento
                      </Typography>
                      <Stack spacing={1}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Temperatura
                          </Typography>
                          <Typography variant="body2">
                            {producto.condicionesAlmacenamiento.temperatura}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Humedad relativa
                          </Typography>
                          <Typography variant="body2">
                            {producto.condicionesAlmacenamiento.humedad}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Cadena de frío
                      </Typography>
                      <Chip 
                        label={producto.cadenaFrio ? "Requiere refrigeración" : "No requiere"} 
                        color={producto.cadenaFrio ? "primary" : "default"}
                        size="small"
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Proveedor
                      </Typography>
                      <Typography variant="body2">
                        {producto.proveedor?.nombre || 'No especificado'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {producto.proveedor?.pais || 'País no especificado'}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Estado del producto
                      </Typography>
                      <Chip 
                        label={producto.estado}
                        color={producto.estado === 'Activo' ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Sección de documentación normativa */}
            {producto.normativa.tiene && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Documentación normativa
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      {producto.normativa.documentos.map(doc => (
                        <Box key={doc.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">{doc.nombre}</Typography>
                          <Button
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => console.log(`Downloading ${doc.archivo}`)}
                          >
                            Descargar
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Grid>

          {/* Columna derecha - Detalles de inventario */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Ubicaciones
            </Typography>
            
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  {producto.ubicaciones.map((ubicacion, index) => (
                    <Box key={index}>
                      <Typography variant="subtitle2" gutterBottom>
                        {ubicacion.bodega}
                      </Typography>
                      <Typography variant="h6">
                        {ubicacion.cantidad} unidades
                      </Typography>
                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))}
                </Stack>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<InventoryIcon />}
                  sx={{ mt: 2 }}
                >
                  Ver detalle de inventario
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductoDetalle;
