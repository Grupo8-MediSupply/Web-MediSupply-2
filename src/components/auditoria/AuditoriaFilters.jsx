import React from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

/**
 * Componente reutilizable de filtros para auditoría
 * @param {Object} props
 * @param {Object} props.filters - Valores actuales de los filtros
 * @param {Function} props.onFilterChange - Callback cuando cambia un filtro
 * @param {Function} props.onClearFilters - Callback para limpiar filtros
 * @param {Array} props.modules - Lista de módulos disponibles
 * @returns {JSX.Element}
 */
const AuditoriaFilters = ({ 
  filters = {}, 
  onFilterChange, 
  onClearFilters,
  modules = ['Auth', 'Productos', 'Ordenes', 'Usuarios', 'Inventarios', 'Proveedores', 'Ventas']
}) => {
  const handleChange = (campo) => (event) => {
    if (onFilterChange) {
      onFilterChange(campo, event.target.value);
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== null);

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            size="small"
            label="Módulo"
            select
            value={filters.modulo || ''}
            onChange={handleChange('modulo')}
          >
            <MenuItem value="">Todos</MenuItem>
            {modules.map(module => (
              <MenuItem key={module} value={module}>
                {module}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            size="small"
            label="Acción"
            value={filters.accion || ''}
            onChange={handleChange('accion')}
            placeholder="Buscar acción..."
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            size="small"
            label="Severidad"
            select
            value={filters.severidad || ''}
            onChange={handleChange('severidad')}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="BAJA">Baja</MenuItem>
            <MenuItem value="MEDIA">Media</MenuItem>
            <MenuItem value="ALTA">Alta</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            value={filters.email || ''}
            onChange={handleChange('email')}
            placeholder="Buscar usuario..."
          />
        </Grid>

        {hasActiveFilters && (
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={onClearFilters}
              size="small"
            >
              Limpiar
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AuditoriaFilters;
