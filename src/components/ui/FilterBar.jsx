import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

/**
 * Barra de filtros reutilizable
 * 
 * @param {Object} props
 * @param {Array} props.filters - Array de configuraciones de filtro
 * @param {Function} props.onChange - Función a ejecutar cuando cambia un filtro
 * @returns {JSX.Element}
 */
const FilterBar = ({ filters = [], onChange }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 2,
      alignItems: 'center'
    }}>
      {filters.map((filter, index) => (
        <FormControl 
          key={filter.name || index} 
          size="small" 
          sx={{ minWidth: filter.width || 120 }}
        >
          <InputLabel id={`${filter.name}-label`}>{filter.label}</InputLabel>
          <Select
            labelId={`${filter.name}-label`}
            name={filter.name}
            value={filter.value}
            label={filter.label}
            onChange={onChange}
          >
            <MenuItem value="">
              <em>{filter.emptyOptionText || 'Todos'}</em>
            </MenuItem>
            {filter.options.map((option, i) => (
              <MenuItem 
                key={option} 
                value={filter.values ? filter.values[i] : option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
};

export default FilterBar;
