import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button, 
  CircularProgress,
  Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

// Componentes personalizados
import BreadcrumbsNav from '../../components/ui/BreadcrumbsNav';
import SearchBar from '../../components/ui/SearchBar';
import FilterBar from '../../components/ui/FilterBar';
import VendedoresTable from '../../components/ventas/VendedoresTable';

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
  
  // Estado local para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendedores, setFilteredVendedores] = useState([]);
  
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
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/ventas/vendedores/nuevo"
          >
            Nuevo Vendedor
          </Button>
        </Box>
        
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
    </Container>
  );
}

export default Vendedores;
