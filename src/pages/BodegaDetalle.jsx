import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
  Tabs
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import ProductosTable from '../components/inventarios/ProductosTable';

// Hook personalizado para búsqueda y filtrado
import useSearch from '../hooks/useSearch';

// Mock data para mostrar detalles de una bodega específica
const mockBodegaDetails = {
  1: { 
    id: 1, 
    nombre: 'Centro Norte', 
    ciudad: 'Bogotá', 
    capacidad: '5.000',
    estado: 'Activo'
  },
  2: { 
    id: 2, 
    nombre: 'Centro Urbano', 
    ciudad: 'Medellín',
    capacidad: '5.500',
    estado: 'Activo'
  },
  3: { 
    id: 3, 
    nombre: 'Centro Industrial', 
    ciudad: 'Cúcuta',
    capacidad: '4.000',
    estado: 'Inactivo'
  },
  4: { 
    id: 4, 
    nombre: 'Centro Oriente', 
    ciudad: 'Cali',
    capacidad: '6.000',
    estado: 'Activo'
  }
};

// Mock data para productos en bodega
const mockProductos = {
  1: [
    { producto: 'Vacuna influenza', lote: 'MED-014-1', cantidad: 400, vencimiento: '31/08/2024' },
    { producto: 'Guantes Nitrilo M', lote: 'INS-220-2', cantidad: 300, vencimiento: '15/07/2025' },
    { producto: 'Amoxicilina 500mg', lote: 'MED-001-5', cantidad: 250, vencimiento: '10/02/2026' },
    { producto: 'Vacuna influenza', lote: 'MED-014-3', cantidad: 180, vencimiento: '24/11/2026' }
  ],
  2: [
    { producto: 'Jeringa 5ml', lote: 'INS-101-2', cantidad: 500, vencimiento: '05/05/2025' },
    { producto: 'Paracetamol 500mg', lote: 'MED-002-1', cantidad: 350, vencimiento: '22/09/2024' }
  ],
  3: [
    { producto: 'Vendas elásticas', lote: 'INS-303-4', cantidad: 120, vencimiento: '18/03/2025' }
  ],
  4: [
    { producto: 'Alcohol 70%', lote: 'INS-405-2', cantidad: 200, vencimiento: '30/06/2026' },
    { producto: 'Mascarillas N95', lote: 'INS-410-1', cantidad: 150, vencimiento: '12/12/2024' }
  ]
};

// Función de filtrado para los productos
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
  const bodega = mockBodegaDetails[id];
  const productos = mockProductos[id] || [];
  const [tabValue, setTabValue] = useState(0);
  
  // Extraer lotes y fechas de vencimiento únicos para filtros
  const lotes = [...new Set(productos.map(item => item.lote))];
  const vencimientos = [...new Set(productos.map(item => item.vencimiento.split('/')[2]))]; // Años de vencimiento
  
  // Configuración de filtros
  const filterConfig = [
    {
      name: 'lote',
      label: 'Lote',
      value: '',
      options: lotes,
      emptyOptionText: 'Todos',
      width: '250px'
    },
    {
      name: 'vencimiento',
      label: 'Vencimiento',
      value: '',
      options: vencimientos,
      emptyOptionText: 'Todos',
      width: '250px'
    }
  ];
  
  // Usar hook personalizado para manejar la búsqueda y el filtrado
  const {
    searchTerm,
    filteredData,
    handleSearchChange,
    handleFilterChange,
    executeSearch,
    clearFilters
  } = useSearch(productos, filterProductos);

  // Manejar cambio de tabs
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Navegación para breadcrumbs
  const breadcrumbsItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Inventarios', path: '/inventarios' },
    { label: 'Bodegas', path: '/inventarios' }
  ];

  if (!bodega) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5">Bodega no encontrada</Typography>
        <Button 
          component={RouterLink} 
          to="/inventarios" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
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
              
              {/* Tabla de productos */}
              <ProductosTable productos={filteredData} />
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
