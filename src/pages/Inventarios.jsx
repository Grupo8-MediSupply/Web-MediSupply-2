import React, { useEffect, useState } from 'react';
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
  
  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado local para las bodegas filtradas por búsqueda
  const [filteredBodegas, setFilteredBodegas] = useState([]);
  
  // Extraer ciudades y nombres de bodegas únicos para filtros
  const allBodegas = useSelector(state => state.bodegas.bodegas || []);
  const ciudades = [...new Set(allBodegas.filter(item => item?.ubicacion).map(item => item.ubicacion))];
  const nombresBodegas = [...new Set(allBodegas.filter(item => item?.nombre).map(item => item.nombre))];
  
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

  // Actualizar bodegas filtradas cuando cambian las bodegas de Redux o el término de búsqueda
  useEffect(() => {
    if (!bodegas || !Array.isArray(bodegas)) {
      setFilteredBodegas([]);
      return;
    }
    
    if (searchTerm.trim() === '') {
      setFilteredBodegas(bodegas);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = bodegas.filter(bodega => {
        // Validar que bodega y sus propiedades existan antes de acceder a ellas
        const nombre = bodega?.nombre || '';
        const ubicacion = bodega?.ubicacion || bodega?.ciudad || '';
        
        return nombre.toLowerCase().includes(lowercaseSearch) ||
               ubicacion.toLowerCase().includes(lowercaseSearch);
      });
      setFilteredBodegas(filtered);
    }
  }, [bodegas, searchTerm]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFiltros({ [name]: value }));
  };

  // Ejecutar búsqueda (ahora realmente filtra por nombre)
  const executeSearch = () => {
    // La búsqueda ya se ejecuta automáticamente en el useEffect
    // Esta función se mantiene por si se necesita alguna lógica adicional
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
        Error al cargar las bodegas: {error}
      </Alert>
    );
  } else {
    content = <BodegasTable bodegas={filteredBodegas} />;
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
        
        {/* Tabla de Bodegas con estado de carga */}
        {content}
      </Paper>
    </Container>
  );
}

export default Inventarios;
