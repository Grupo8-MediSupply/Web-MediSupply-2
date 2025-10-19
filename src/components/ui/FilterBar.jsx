import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

/**
 * Barra de filtros reutilizable
 * @param {Array} filters - Array de configuración de filtros
 * @param {Function} onChange - Función para manejar cambios en los filtros
 */
function FilterBar({ filters, onChange }) {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {filters.map((filter) => (
        <FormControl key={filter.name} sx={{ width: filter.width || '250px' }}>
          <InputLabel id={`${filter.name}-select-label`} shrink>
            {filter.label}
          </InputLabel>
          <Select
            labelId={`${filter.name}-select-label`}
            id={`${filter.name}-select`}
            value={filter.value}
            label={filter.label}
            name={filter.name}
            onChange={onChange}
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
              <em>{filter.emptyOptionText}</em>
            </MenuItem>
            {filter.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
}

export default FilterBar;
