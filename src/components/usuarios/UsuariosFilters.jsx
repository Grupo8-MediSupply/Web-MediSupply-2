import React from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { ROLES } from './RoleBadge';

/**
 * Componente reutilizable de filtros para usuarios
 * @param {Object} props
 * @param {Object} props.filters - Valores actuales de los filtros
 * @param {Function} props.onFilterChange - Callback cuando cambia un filtro
 * @param {Function} props.onClearFilters - Callback para limpiar filtros
 * @returns {JSX.Element}
 */
const UsuariosFilters = ({ 
  filters = {}, 
  onFilterChange, 
  onClearFilters 
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
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            value={filters.email || ''}
            onChange={handleChange('email')}
            placeholder="Buscar por email..."
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            size="small"
            label="Rol"
            select
            value={filters.rolId || ''}
            onChange={handleChange('rolId')}
          >
            <MenuItem value="">Todos</MenuItem>
            {Object.entries(ROLES).map(([id, rol]) => (
              <MenuItem key={id} value={id}>
                {rol.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            size="small"
            label="Estado"
            select
            value={filters.activo || ''}
            onChange={handleChange('activo')}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="true">Activos</MenuItem>
            <MenuItem value="false">Inactivos</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2.5}>
          <TextField
            fullWidth
            size="small"
            label="Identificación"
            value={filters.identificacion || ''}
            onChange={handleChange('identificacion')}
            placeholder="Buscar por ID..."
          />
        </Grid>

        {hasActiveFilters && (
          <Grid item xs={12} sm={6} md={1.5}>
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

export default UsuariosFilters;
