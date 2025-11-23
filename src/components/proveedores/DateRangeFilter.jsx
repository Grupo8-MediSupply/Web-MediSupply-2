import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * Componente reutilizable para filtrar por rango de fechas
 * @param {Object} props - Propiedades del componente
 * @param {string} props.fechaInicio - Fecha de inicio
 * @param {string} props.fechaFin - Fecha de fin
 * @param {Function} props.onFechaInicioChange - Callback cuando cambia la fecha de inicio
 * @param {Function} props.onFechaFinChange - Callback cuando cambia la fecha de fin
 * @param {Function} props.onSearch - Callback para ejecutar búsqueda
 * @param {Function} props.onClear - Callback para limpiar filtros
 * @param {boolean} props.disabled - Si los controles están deshabilitados
 */
const DateRangeFilter = ({
  fechaInicio,
  fechaFin,
  onFechaInicioChange,
  onFechaFinChange,
  onSearch,
  onClear,
  disabled = false
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <TextField
        label="Fecha inicio"
        type="date"
        value={fechaInicio}
        onChange={(e) => onFechaInicioChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
        size="small"
        sx={{ minWidth: 180 }}
      />
      
      <TextField
        label="Fecha fin"
        type="date"
        value={fechaFin}
        onChange={(e) => onFechaFinChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        disabled={disabled}
        size="small"
        sx={{ minWidth: 180 }}
      />
      
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onSearch}
        disabled={disabled}
      >
        {fechaInicio && fechaFin ? 'Filtrar' : 'Cargar Todo'}
      </Button>
      
      {(fechaInicio || fechaFin) && (
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={onClear}
          disabled={disabled}
        >
          Limpiar
        </Button>
      )}
    </Box>
  );
};

export default DateRangeFilter;
