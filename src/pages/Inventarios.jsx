import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';

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

function Inventarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBodegas, setFilteredBodegas] = useState(mockBodegas);
  const [selectedBodega, setSelectedBodega] = useState('');
  const [selectedCiudad, setSelectedCiudad] = useState('');

  // Manejar cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    // Filtrar bodegas según el término de búsqueda y filtros seleccionados
    filterBodegas(value, selectedBodega, selectedCiudad);
  };

  // Manejar cambio en los filtros
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'bodega') {
      setSelectedBodega(value);
      filterBodegas(searchTerm, value, selectedCiudad);
    } else if (name === 'ciudad') {
      setSelectedCiudad(value);
      filterBodegas(searchTerm, selectedBodega, value);
    }
  };

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedBodega('');
    setSelectedCiudad('');
    setFilteredBodegas(mockBodegas);
  };

  // Filtrar bodegas según criterios
  const filterBodegas = (search, bodega, ciudad) => {
    let filtered = mockBodegas;

    if (search) {
      filtered = filtered.filter(item => 
        item.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (bodega) {
      filtered = filtered.filter(item => item.nombre === bodega);
    }

    if (ciudad) {
      filtered = filtered.filter(item => item.ciudad === ciudad);
    }

    setFilteredBodegas(filtered);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Inicio
        </Link>
        <Link component={RouterLink} to="/inventarios" underline="hover" color="inherit">
          Inventarios
        </Link>
        <Typography color="text.primary">Bodegas</Typography>
      </Breadcrumbs>
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bodegas
        </Typography>
        
        {/* Barra de búsqueda y filtros - REORGANIZADO */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {/* Primera fila: Campo de búsqueda y botones */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Campo de búsqueda */}
            <TextField
              variant="outlined"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            {/* Botones junto al campo de búsqueda */}
            <Button variant="contained" onClick={() => filterBodegas(searchTerm, selectedBodega, selectedCiudad)}>
              Buscar
            </Button>
            
            <Button variant="outlined" onClick={handleClearFilters}>
              Limpiar filtros
            </Button>
          </Box>
          
          {/* Segunda fila: Filtros con ancho limitado */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Filtro de Bodega */}
            <FormControl sx={{ width: '250px' }}>
              <InputLabel id="bodega-select-label" shrink>
                Bodega
              </InputLabel>
              <Select
                labelId="bodega-select-label"
                id="bodega-select"
                value={selectedBodega}
                label="Bodega"
                name="bodega"
                onChange={handleFilterChange}
                displayEmpty
                notched
                sx={{ 
                  '& .MuiSelect-select': { 
                    paddingTop: '8px',
                    paddingBottom: '8px',
                  },
                  '& .MuiInputLabel-shrink': {
                    top: 0
                  }
                }}
                renderValue={(selected) => {
                  return selected ? selected : "";
                }}
              >
                <MenuItem value="">
                  <em>Todas</em>
                </MenuItem>
                {bodegas.map((bodega) => (
                  <MenuItem key={bodega} value={bodega}>{bodega}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {/* Filtro de Ciudad */}
            <FormControl sx={{ width: '250px' }}>
              <InputLabel id="ciudad-select-label" shrink>
                Ciudad
              </InputLabel>
              <Select
                labelId="ciudad-select-label"
                id="ciudad-select"
                value={selectedCiudad}
                label="Ciudad"
                name="ciudad"
                onChange={handleFilterChange}
                displayEmpty
                notched
                sx={{ 
                  '& .MuiSelect-select': { 
                    paddingTop: '8px',
                    paddingBottom: '8px',
                  },
                  '& .MuiInputLabel-shrink': {
                    top: 0
                  }
                }}
                renderValue={(selected) => {
                  return selected ? selected : "";
                }}
              >
                <MenuItem value="">
                  <em>Todas</em>
                </MenuItem>
                {ciudades.map((ciudad) => (
                  <MenuItem key={ciudad} value={ciudad}>{ciudad}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        {/* Tabla de Bodegas */}
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bodega</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Capacidad total</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBodegas.map((bodega) => (
                <TableRow key={bodega.id}>
                  <TableCell>{bodega.nombre}</TableCell>
                  <TableCell>{bodega.ciudad}</TableCell>
                  <TableCell>{bodega.capacidad}</TableCell>
                  <TableCell>
                    <Chip 
                      label={bodega.estado} 
                      color={bodega.estado === 'Activo' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      component={RouterLink} 
                      to={`/inventarios/bodegas/${bodega.id}`}
                      variant="outlined"
                      size="small"
                    >
                      Ver detalle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBodegas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No se encontraron bodegas</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default Inventarios;
