import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button, 
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Roles, RoleNames, CountryNames } from '../../constants/auth';

// Componentes personalizados
import BreadcrumbsNav from '../../components/ui/BreadcrumbsNav';
import SearchBar from '../../components/ui/SearchBar';
import FilterBar from '../../components/ui/FilterBar';
import VendedoresTable from '../../components/ventas/VendedoresTable';
import VendedorForm from '../../components/ventas/VendedorForm';
import RoleBasedComponent from '../../components/auth/RoleBasedComponent';

// Redux actions y selectors
import { 
  fetchVendedores, 
  selectFilteredVendedores,
  selectVendedoresStatus,
  selectVendedoresError,
  selectFiltros,
  setFiltros,
  clearFiltros
} from '../../redux/features/vendedoresSlice';
import { fetchConfiguracion, selectConfigStatus } from '../../redux/features/configuracionSlice';

// Navegación para el breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Ventas', path: '/ventas' },
];

function Vendedores() {
  const dispatch = useDispatch();
  const vendedores = useSelector(selectFilteredVendedores);
  const status = useSelector(selectVendedoresStatus);
  const error = useSelector(selectVendedoresError);
  const filtros = useSelector(selectFiltros);
  const authState = useSelector(state => state.auth || {});
  const user = authState.user || null;
  const configuracion = useSelector(state => state.configuracion);
  const configStatus = useSelector(selectConfigStatus);
  
  // Estado local para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Cargar configuración y vendedores al montar el componente
  useEffect(() => {
    const loadData = async () => {
      // Primero cargar la configuración si no está cargada
      if (configStatus === 'idle') {
        await dispatch(fetchConfiguracion()).unwrap();
      }
    };
    
    loadData();
  }, [configStatus, dispatch]);

  // Cargar vendedores solo cuando la configuración esté lista
  useEffect(() => {
    if (configStatus === 'succeeded' && status === 'idle') {
      dispatch(fetchVendedores());
    }
  }, [configStatus, status, dispatch]);

  // Mostrar información de filtrado
  const getUserContextInfo = () => {
    if (!user || !configuracion.pais) return null;
    
    const roleName = RoleNames[user.role] || `Rol ${user.role}`;
    const paisName = configuracion.pais.nombre || CountryNames[user.pais] || `País ${user.pais}`;
    
    return (
      <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2">Mostrando vendedores para:</Typography>
        <Chip size="small" label={roleName} color="primary" />
        <Chip size="small" label={paisName} color="secondary" />
      </Box>
    );
  };

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dispatch(setFiltros({ nombre: e.target.value }));
  };

  const executeSearch = () => {
    // La búsqueda ya se ejecuta automáticamente
  };

  const clearFilters = () => {
    setSearchTerm('');
    dispatch(clearFiltros());
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Renderizado condicional según el estado
  let content;
  if (status === 'loading' || configStatus === 'loading') {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  } else if (configStatus === 'failed') {
    content = (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar la configuración. No se pueden cargar los vendedores.
      </Alert>
    );
  } else if (status === 'failed') {
    content = (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar los vendedores: {error}
      </Alert>
    );
  } else {
    content = <VendedoresTable vendedores={vendedores} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Vendedores"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Vendedores
          </Typography>
          
          <RoleBasedComponent roles={[Roles.ADMIN]} fallback={null}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenForm}
            >
              Nuevo Vendedor
            </Button>
          </RoleBasedComponent>
        </Box>
        
        {getUserContextInfo()}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onSearch={executeSearch}
            onClear={clearFilters}
            placeholder="Buscar por nombre o email..."
          />
        </Box>
        
        {content}
      </Paper>
      
      <VendedorForm 
        open={isFormOpen}
        onClose={handleCloseForm}
      />
    </Container>
  );
}

export default Vendedores;
