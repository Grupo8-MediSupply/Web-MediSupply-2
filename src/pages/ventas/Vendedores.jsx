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
  clearFiltros,
  selectTerritorios
} from '../../redux/features/vendedoresSlice';

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
  const territorios = useSelector(selectTerritorios);
  const authState = useSelector(state => state.auth || {});
  const user = authState.user || null;
  
  // Estado local para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendedores, setFilteredVendedores] = useState([]);
  
  // Estado para controlar el modal de nuevo vendedor
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Configuración de filtros
  const filterConfig = [
    {
      name: 'territorio',
      label: 'Territorio',
      value: filtros.territorio,
      options: territorios,
      emptyOptionText: 'Todos',
      width: '250px'
    },
    {
      name: 'equipo',
      label: 'Equipo',
      value: filtros.equipo,
      options: ['Equipo A', 'Equipo B', 'Equipo C'], // Ejemplo, en producción vendría de la API
      emptyOptionText: 'Todos',
      width: '250px'
    }
  ];

  // Cargar vendedores al montar el componente
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVendedores());
    }
  }, [status, dispatch]);

  // Mostrar información de filtrado basada en el rol y país del usuario
  const getUserContextInfo = () => {
    if (!user) return null;
    
    const roleName = RoleNames[user.role] || `Rol ${user.role}`;
    const paisName = CountryNames[user.pais] || `País ${user.pais}`;
    
    return (
      <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2">Mostrando datos para:</Typography>
        <Chip size="small" label={roleName} color="primary" />
        <Chip size="small" label={paisName} color="secondary" />
      </Box>
    );
  };

  // Filtrar por búsqueda
  useEffect(() => {
    if (!vendedores) return;
    
    if (searchTerm.trim() === '') {
      setFilteredVendedores(vendedores);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = vendedores.filter(vendedor => 
        vendedor.nombre.toLowerCase().includes(lowercaseSearch) ||
        vendedor.id.toLowerCase().includes(lowercaseSearch) ||
        vendedor.territorio.toLowerCase().includes(lowercaseSearch)
      );
      setFilteredVendedores(filtered);
    }
  }, [vendedores, searchTerm]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFiltros({ [name]: value }));
  };

  // Ejecutar búsqueda
  const executeSearch = () => {
    // La búsqueda ya se ejecuta automáticamente en el useEffect
  };

  // Limpiar todos los filtros y la búsqueda
  const clearFilters = () => {
    setSearchTerm('');
    dispatch(clearFiltros());
  };

  // Abrir el formulario de nuevo vendedor
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };
  
  // Cerrar el formulario de nuevo vendedor
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

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
        Error al cargar los vendedores: {error}
      </Alert>
    );
  } else {
    content = <VendedoresTable vendedores={filteredVendedores} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navegación de migas de pan */}
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Vendedores"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Encabezado con título y botón de nuevo vendedor */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Vendedores
          </Typography>
          
          <RoleBasedComponent roles={[Roles.ADMIN, Roles.VENDEDOR]} fallback={null}>
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
        
        {/* Mostrar contexto del usuario actual */}
        {getUserContextInfo()}
        
        {/* Barra de búsqueda y filtros */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {/* Barra de búsqueda */}
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onSearch={executeSearch}
            onClear={clearFilters}
            placeholder="Buscar por nombre, ID o territorio..."
          />
          
          {/* Barra de filtros */}
          <FilterBar
            filters={filterConfig}
            onChange={handleFilterChange}
          />
        </Box>
        
        {/* Tabla de Vendedores */}
        {content}
      </Paper>
      
      {/* Modal de Nuevo Vendedor */}
      <VendedorForm 
        open={isFormOpen}
        onClose={handleCloseForm}
      />
    </Container>
  );
}

export default Vendedores;
