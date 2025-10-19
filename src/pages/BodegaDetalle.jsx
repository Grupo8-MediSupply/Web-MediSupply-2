import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import ProductosTable from '../components/inventarios/ProductosTable';

// Redux actions and selectors
import {
  fetchBodegaDetails,
  fetchProductosInBodega,
  selectCurrentBodega,
  selectBodegaDetailsStatus,
  selectBodegaDetailsError,
  selectCurrentProductos,
  selectProductosStatus,
  selectProductosError
} from '../redux/features/bodegasSlice';

// Función de filtrado para los productos (local)
const filterProductos = (data, search, filters) => {
  let filtered = data;

  if (search) {
    filtered = filtered.filter(item => 
      item.producto.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filters.lote) {
    filtered = filtered.filter(item => item.lote === filters.lote);
  }

  if (filters.vencimiento) {
    filtered = filtered.filter(item => item.vencimiento.includes(filters.vencimiento));
  }

  return filtered;
};

function BodegaDetalle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Estados locales
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilters, setLocalFilters] = useState({});
  const [filteredProductos, setFilteredProductos] = useState([]);
  
  // Seleccionar datos del store de Redux
  const bodega = useSelector(selectCurrentBodega);
  const bodegaStatus = useSelector(selectBodegaDetailsStatus);
  const bodegaError = useSelector(selectBodegaDetailsError);
  const productos = useSelector(selectCurrentProductos);
  const productosStatus = useSelector(selectProductosStatus);
  const productosError = useSelector(selectProductosError);

  // Cargar detalles de la bodega y productos al montar el componente
  useEffect(() => {
    dispatch(fetchBodegaDetails(id));
    dispatch(fetchProductosInBodega(id));
  }, [dispatch, id]);

  // Actualizar productos filtrados cuando cambian los productos, búsqueda o filtros
  useEffect(() => {
    setFilteredProductos(filterProductos(productos, searchTerm, localFilters));
  }, [productos, searchTerm, localFilters]);

  // Extraer lotes y fechas de vencimiento para filtros (si hay productos)
  const lotes = productos.length > 0 ? 
    [...new Set(productos.map(item => item.lote))] : [];
  
  const vencimientos = productos.length > 0 ? 
    [...new Set(productos.map(item => item.vencimiento.split('/')[2]))] : []; // Años de vencimiento
  
  // Configuración de filtros
  const filterConfig = [
    {
      name: 'lote',
      label: 'Lote',
      value: localFilters.lote || '',
      options: lotes,
      emptyOptionText: 'Todos',
      width: '250px'
    },
    {
      name: 'vencimiento',
      label: 'Vencimiento',
      value: localFilters.vencimiento || '',
      options: vencimientos,
      emptyOptionText: 'Todos',
      width: '250px'
    }
  ];

  // Navegación para breadcrumbs
  const breadcrumbsItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Inventarios', path: '/inventarios' },
    { label: 'Bodegas', path: '/inventarios' }
  ];

  // Manejadores de eventos
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const executeSearch = () => {
    setFilteredProductos(filterProductos(productos, searchTerm, localFilters));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocalFilters({});
    setFilteredProductos(productos);
  };

  // Si está cargando los detalles de la bodega
  if (bodegaStatus === 'loading') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Si hay error al cargar los detalles
  if (bodegaStatus === 'failed') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error al cargar los detalles: {bodegaError}
        </Alert>
        <Button 
          component={RouterLink} 
          to="/inventarios" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Volver a Bodegas
        </Button>
      </Container>
    );
  }

  // Si no encuentra la bodega
  if (!bodega) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5">Bodega no encontrada</Typography>
        <Button 
          component={RouterLink} 
          to="/inventarios" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          variant="outlined"
        >
          Volver a Bodegas
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage={bodega.nombre}
      />
      
      {/* Botón para volver */}
      <Button 
        component={RouterLink} 
        to="/inventarios" 
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Volver a Bodegas
      </Button>
      
      {/* Título y ciudad */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {bodega.nombre}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {bodega.ciudad}
        </Typography>
      </Box>
      
      {/* Tarjetas de capacidad y estado */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Capacidad total
              </Typography>
              <Typography variant="h5">
                {bodega.capacidad}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Estado
              </Typography>
              <Typography variant="h5">
                {bodega.estado}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs de navegación */}
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="opciones de bodega"
          >
            <Tab label="Productos disponibles" />
            <Tab label="Historial de movimientos" />
            <Tab label="Estadísticas" />
          </Tabs>
        </Box>

        {/* Contenido de la tab seleccionada */}
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <>
              <Typography variant="h5" gutterBottom>
                Productos disponibles
              </Typography>
              
              {/* Barra de búsqueda y filtros */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                {/* Barra de búsqueda */}
                <SearchBar
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onSearch={executeSearch}
                  onClear={clearFilters}
                />
                
                {/* Barra de filtros */}
                <FilterBar
                  filters={filterConfig}
                  onChange={handleFilterChange}
                />
              </Box>
              
              {/* Estado de carga de productos */}
              {productosStatus === 'loading' ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : productosStatus === 'failed' ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Error al cargar los productos: {productosError}
                </Alert>
              ) : (
                /* Tabla de productos */
                <ProductosTable productos={filteredProductos} />
              )}
            </>
          )}
          
          {tabValue === 1 && (
            <Typography variant="body1">
              Historial de movimientos no disponible en este momento.
            </Typography>
          )}
          
          {tabValue === 2 && (
            <Typography variant="body1">
              Estadísticas no disponibles en este momento.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default BodegaDetalle;
