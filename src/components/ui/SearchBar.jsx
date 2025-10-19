import React from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Barra de búsqueda reutilizable con botones
 * @param {String} value - Valor actual del campo de búsqueda
 * @param {Function} onChange - Función para manejar cambios en el campo
 * @param {Function} onSearch - Función para realizar la búsqueda
 * @param {Function} onClear - Función para limpiar el campo y filtros
 */
function SearchBar({ value, onChange, onSearch, onClear }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        variant="outlined"
        placeholder="Buscar por nombre..."
        value={value}
        onChange={onChange}
        sx={{ flexGrow: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Button variant="contained" onClick={onSearch}>
        Buscar
      </Button>
      
      <Button variant="outlined" onClick={onClear}>
        Limpiar filtros
      </Button>
    </Box>
  );
}

export default SearchBar;
