import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import ArticleIcon from '@mui/icons-material/Article';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import ProductosTable from '../components/catalogo/ProductosTable';
import NuevoProductoForm from '../components/catalogo/NuevoProductoForm';
import CargaMasivaDialog from '../components/catalogo/CargaMasivaDialog';
import NormativasDialog from '../components/catalogo/NormativasDialog';
import SolicitarLoteDialog from '../components/catalogo/SolicitarLoteDialog';

// Redux actions y selectors
import { 
  fetchCatalogo,
  setFiltro,
  limpiarFiltros,
  cargarNormativas,
  cargaMasiva,
  selectFilteredProductos,
  selectCatalogoStatus,
  selectCatalogoError,
  selectCategorias,
  selectProveedores,
  selectPaises,
  selectEstados,
  selectNotificacion,
  clearNotificacion
} from '../redux/features/catalogoSlice';

// Navegación para el breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' }
];

// Mapeo de códigos de países
const PAISES = {
  'CO': 'Colombia',
  'MX': 'México',
  'PE': 'Perú',
  'CL': 'Chile',
  'AR': 'Argentina'
};

function Catalogo() {
  const dispatch = useDispatch();
  const productos = useSelector(selectFilteredProductos);
  const status = useSelector(selectCatalogoStatus);
  const error = useSelector(selectCatalogoError);
  const notificacion = useSelector(selectNotificacion);
  const categorias = useSelector(selectCategorias);
  const proveedores = useSelector(selectProveedores);
  const paises = useSelector(selectPaises);
  const estados = useSelector(selectEstados);
  const filtros = useSelector(state => state.catalogo.filtros);
  
  // Estados locales para controlar diálogos y búsquedas
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [isNuevoProductoOpen, setIsNuevoProductoOpen] = useState(false);
  const [isCargaMasivaOpen, setIsCargaMasivaOpen] = useState(false);
  const [isNormativasOpen, setIsNormativasOpen] = useState(false);
  const [isSolicitarLoteOpen, setIsSolicitarLoteOpen] = useState(false);

  // Obtener productos al cargar el componente
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCatalogo());
    }
  }, [status, dispatch]);

  // Filtrar productos por término de búsqueda
  useEffect(() => {
    if (!productos) {
      setFilteredProductos([]);
      return;
    }
    
    if (!searchTerm || searchTerm.trim() === '') {
      setFilteredProductos(productos);
      return;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    const filtered = productos.filter(producto => {
      const nombreMatch = producto.nombre?.toLowerCase().includes(lowercaseSearch) || false;
      const skuMatch = producto.sku?.toLowerCase().includes(lowercaseSearch) || false;
      const descripcionMatch = producto.descripcion?.toLowerCase().includes(lowercaseSearch) || false;
      
      return nombreMatch || skuMatch || descripcionMatch;
    });
    
    setFilteredProductos(filtered);
  }, [productos, searchTerm]);

  // Manejadores de eventos
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const executeSearch = () => {
    // La búsqueda ya se actualiza en el useEffect
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFiltro({ [name]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    dispatch(limpiarFiltros());
  };

  // Manejadores para modales
  const handleOpenNuevoProducto = () => {
    setIsNuevoProductoOpen(true);
  };

  const handleCloseNuevoProducto = () => {
    setIsNuevoProductoOpen(false);
  };

  const handleOpenCargaMasiva = () => {
    setIsCargaMasivaOpen(true);
  };

  const handleCloseCargaMasiva = () => {
    setIsCargaMasivaOpen(false);
  };

  const handleOpenNormativas = () => {
    setIsNormativasOpen(true);
  };

  const handleCloseNormativas = () => {
    setIsNormativasOpen(false);
  };

  const handleOpenSolicitarLote = () => {
    setIsSolicitarLoteOpen(true);
  };

  const handleCloseSolicitarLote = () => {
    setIsSolicitarLoteOpen(false);
  };

  // Manejar carga de archivos
  const handleSubmitCargaMasiva = (archivo) => {
    dispatch(cargaMasiva(archivo));
    setIsCargaMasivaOpen(false);
  };

  const handleCargarNormativas = () => {
    dispatch(cargarNormativas());
    setIsNormativasOpen(false);
  };

  // Cerrar notificaciones
  const handleCloseNotificacion = () => {
    dispatch(clearNotificacion());
  };

  // Configuración de filtros actualizada
  const filterConfig = [
    {
      name: 'tipo',
      label: 'Tipo',
      value: filtros.tipo || '',
      options: ['MEDICAMENTO', 'INSUMO', 'DISPOSITIVO'], // Tipos disponibles en la API
      emptyOptionText: 'Todos',
      width: '200px'
    }
  ];

  // Renderizado condicional según el estado
  let content;
  if (status === 'loading') {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  } else if (status === 'failed') {
    content = (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar los productos: {error}
      </Alert>
    );
  } else {
    content = <ProductosTable productos={filteredProductos} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navegación de migas de pan */}
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Catálogo"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Encabezado con título y botones de acción */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Catálogo de productos
          </Typography>
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<UploadIcon />}
              onClick={handleOpenCargaMasiva}
            >
              Carga Masiva
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArticleIcon />}
              onClick={handleOpenNormativas}
            >
              Normativas
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LocalShippingIcon />}
              onClick={handleOpenSolicitarLote}
            >
              Solicitar lote
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenNuevoProducto}
            >
              Nuevo producto
            </Button>
          </Stack>
        </Box>
        
        {/* Barra de búsqueda y filtros */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {/* Barra de búsqueda - Simplificada para usar completamente el componente SearchBar */}
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onSearch={executeSearch}
            onClear={clearFilters}
            placeholder="Buscar por nombre..."
          />
          
          {/* Barra de filtros */}
          <FilterBar
            filters={filterConfig}
            onChange={handleFilterChange}
          />
        </Box>
        
        {/* Tabla de Productos */}
        {content}
      </Paper>
      
      {/* Modales y diálogos */}
      <NuevoProductoForm
        open={isNuevoProductoOpen}
        onClose={handleCloseNuevoProducto}
      />
      
      <CargaMasivaDialog
        open={isCargaMasivaOpen}
        onClose={handleCloseCargaMasiva}
        onSubmit={handleSubmitCargaMasiva}
        loading={useSelector(state => state.catalogo.loadingCargaMasiva)}
      />
      
      <NormativasDialog
        open={isNormativasOpen}
        onClose={handleCloseNormativas}
        onCargar={handleCargarNormativas}
        loading={useSelector(state => state.catalogo.loadingNormativas)}
      />
      
      <SolicitarLoteDialog
        open={isSolicitarLoteOpen}
        onClose={handleCloseSolicitarLote}
        productosDisponibles={productos}
      />
      
      {/* Notificaciones */}
      <Snackbar
        open={!!notificacion}
        autoHideDuration={6000}
        onClose={handleCloseNotificacion}
      >
        {notificacion && (
          <Alert 
            onClose={handleCloseNotificacion} 
            severity={notificacion.tipo}
            sx={{ width: '100%' }}
          >
            {notificacion.mensaje}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
}

export default Catalogo;
