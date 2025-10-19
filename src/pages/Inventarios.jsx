import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import BodegasTable from '../components/inventarios/BodegasTable';

// Redux actions and selectors
import { 
  fetchBodegas, 
  selectFilteredBodegas,
  selectBodegasStatus,
  selectBodegasError,
  setFiltros,
  clearFiltros,
  selectFiltros
} from '../redux/features/bodegasSlice';

// Navegación para el breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Inventarios', path: '/inventarios' },
];

function Inventarios() {
  const dispatch = useDispatch();
  const bodegas = useSelector(selectFilteredBodegas);
  const status = useSelector(selectBodegasStatus);
  const error = useSelector(selectBodegasError);
  const filtros = useSelector(selectFiltros);
  
  // Extraer ciudades y nombres de bodegas únicos para filtros
  const allBodegas = useSelector(state => state.bodegas.bodegas);
  const ciudades = [...new Set(allBodegas.map(item => item.ciudad))];
  const nombresBodegas = [...new Set(allBodegas.map(item => item.nombre))];
  
  // Configuración de filtros
  const filterConfig = [
    {
      name: 'bodega',
      label: 'Bodega',
      value: filtros.bodega,
      options: nombresBodegas,
      emptyOptionText: 'Todas',
      width: '250px'
    },
    {
      name: 'ciudad',
      label: 'Ciudad',
      value: filtros.ciudad,
      options: ciudades,
      emptyOptionText: 'Todas',
      width: '250px'
    }
  ];

  // Cargar bodegas al montar el componente
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBodegas());
    }
  }, [status, dispatch]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    // Para este ejemplo, la búsqueda por nombre se podría implementar con un filtro adicional
    // o directamente en el componente utilizando la tabla
    console.log("Búsqueda:", e.target.value);
  };
  
  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFiltros({ [name]: value }));
  };

  // Ejecutar búsqueda (placeholder para funcionalidad futura)
  const executeSearch = () => {
    console.log("Ejecutando búsqueda");
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
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
        Error al cargar las bodegas: {error}
      </Alert>
    );
  } else {
    content = <BodegasTable bodegas={bodegas} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navegación de migas de pan */}
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Bodegas"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bodegas
        </Typography>
        
        {/* Barra de búsqueda y filtros */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {/* Barra de búsqueda con botones */}
          <SearchBar
            value=""
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
        
        {/* Tabla de Bodegas con estado de carga */}
        {content}
      </Paper>
    </Container>
  );
}

export default Inventarios;
