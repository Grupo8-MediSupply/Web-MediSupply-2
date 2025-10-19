import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import BodegasTable from '../components/inventarios/BodegasTable';

// Hook personalizado para búsqueda y filtrado
import useSearch from '../hooks/useSearch';

// Mock data para las bodegas
const mockBodegas = [
  { id: 1, nombre: 'Centro Norte', ciudad: 'Bogotá', capacidad: '5.000', estado: 'Activo' },
  { id: 2, nombre: 'Centro Urbano', ciudad: 'Medellín', capacidad: '5.500', estado: 'Activo' },
  { id: 3, nombre: 'Centro Industrial', ciudad: 'Cúcuta', capacidad: '4.000', estado: 'Inactivo' },
  { id: 4, nombre: 'Centro Oriente', ciudad: 'Cali', capacidad: '6.000', estado: 'Activo' },
];

// Mock data para filtros
const ciudades = ['Bogotá', 'Medellín', 'Cúcuta', 'Cali'];
const bodegas = ['Centro Norte', 'Centro Urbano', 'Centro Industrial', 'Centro Oriente'];

// Navegación para el breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Inventarios', path: '/inventarios' },
];

// Configuración de filtros
const filterConfig = [
  {
    name: 'bodega',
    label: 'Bodega',
    value: '',
    options: bodegas,
    emptyOptionText: 'Todas',
    width: '250px'
  },
  {
    name: 'ciudad',
    label: 'Ciudad',
    value: '',
    options: ciudades,
    emptyOptionText: 'Todas',
    width: '250px'
  }
];

// Función de filtrado para las bodegas
const filterBodegas = (data, search, filters) => {
  let filtered = data;

  if (search) {
    filtered = filtered.filter(item => 
      item.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filters.bodega) {
    filtered = filtered.filter(item => item.nombre === filters.bodega);
  }

  if (filters.ciudad) {
    filtered = filtered.filter(item => item.ciudad === filters.ciudad);
  }

  return filtered;
};

function Inventarios() {
  // Usar hook personalizado para manejar la búsqueda y el filtrado
  const {
    searchTerm,
    filteredData,
    handleSearchChange,
    handleFilterChange,
    executeSearch,
    clearFilters
  } = useSearch(mockBodegas, filterBodegas);

  // Actualizar la configuración de filtros con los valores actuales
  const updatedFilters = filterConfig.map(filter => ({
    ...filter,
    value: filter.name === 'bodega' ? filter.value : filter.name === 'ciudad' ? filter.value : ''
  }));

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
        
        {/* Barra de búsqueda y filtros - REORGANIZADO */}
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
            filters={updatedFilters}
            onChange={handleFilterChange}
          />
        </Box>
        
        {/* Tabla de Bodegas */}
        <BodegasTable bodegas={filteredData} />
      </Paper>
    </Container>
  );
}

export default Inventarios;
