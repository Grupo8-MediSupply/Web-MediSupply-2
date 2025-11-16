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
import AddIcon from '@mui/icons-material/Add';

// Componentes personalizados
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import ProveedoresTable from '../components/proveedores/ProveedoresTable';
import ProveedorForm from '../components/proveedores/ProveedorForm';

// Redux actions y selectors
import { 
  fetchProveedores, 
  selectFilteredProveedores,
  selectProveedoresStatus,
  selectProveedoresError,
  selectFiltros,
  setFiltros,
  clearFiltros,
  selectPaises
} from '../redux/features/proveedoresSlice';
import { selectPaisConfig } from '../redux/features/configuracionSlice';

// Navegación para el breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
];

function Proveedores() {
  const dispatch = useDispatch();
  const proveedores = useSelector(selectFilteredProveedores);
  const status = useSelector(selectProveedoresStatus);
  const error = useSelector(selectProveedoresError);
  const filtros = useSelector(selectFiltros);
  const paises = useSelector(selectPaises);
  const paisConfig = useSelector(selectPaisConfig);
  
  // Estado local para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProveedores, setFilteredProveedores] = useState([]);
  
  // Estado para controlar el modal de nuevo proveedor
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Función para obtener el nombre del país
  const getPaisNombre = (paisId) => {
    if (paisConfig && paisConfig.id === paisId) {
      return paisConfig.nombre;
    }
    return `País ${paisId}`;
  };
  
  // Transformar códigos de país a nombres para el filtro
  const paisesOptions = paises.map(pais => ({
    value: pais,
    label: getPaisNombre(pais)
  }));
  
  // Configuración de filtros
  const filterConfig = [
    {
      name: 'pais',
      label: 'País',
      value: filtros.pais,
      options: paisesOptions.map(p => p.label),
      values: paisesOptions.map(p => p.value),
      emptyOptionText: 'Todos',
      width: '250px'
    }
  ];

  // Cargar proveedores al montar el componente
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProveedores());
    }
  }, [status, dispatch]);

  // Filtrar por búsqueda
  useEffect(() => {
    if (!proveedores) return;
    
    if (searchTerm.trim() === '') {
      setFilteredProveedores(proveedores);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = proveedores.filter(proveedor => 
        proveedor.nombreProveedor?.toLowerCase().includes(lowercaseSearch) ||
        proveedor.identificacion?.includes(searchTerm) ||
        proveedor.email?.toLowerCase().includes(lowercaseSearch) ||
        getPaisNombre(proveedor.pais).toLowerCase().includes(lowercaseSearch)
      );
      setFilteredProveedores(filtered);
    }
  }, [proveedores, searchTerm, paisConfig]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // Buscar el valor real del filtro (código de país)
    if (name === 'pais') {
      const index = filterConfig[0].options.findIndex(option => option === value);
      const realValue = value ? filterConfig[0].values[index] : '';
      dispatch(setFiltros({ [name]: realValue }));
    } else {
      dispatch(setFiltros({ [name]: value }));
    }
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

  // Abrir el formulario de nuevo proveedor
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };
  
  // Cerrar el formulario de nuevo proveedor
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
        Error al cargar los proveedores: {error}
      </Alert>
    );
  } else {
    content = <ProveedoresTable proveedores={filteredProveedores} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Navegación de migas de pan */}
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Proveedores"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Encabezado con título y botón de nuevo proveedor */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Proveedores
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
          >
            Nuevo proveedor
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
            placeholder="Buscar por nombre, país o número de identificación..."
          />
          
          {/* Barra de filtros */}
          <FilterBar
            filters={filterConfig}
            onChange={handleFilterChange}
          />
        </Box>
        
        {/* Tabla de Proveedores */}
        {content}
      </Paper>
      
      {/* Modal de Nuevo Proveedor */}
      <ProveedorForm 
        open={isFormOpen}
        onClose={handleCloseForm}
      />
    </Container>
  );
}

export default Proveedores;
