import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

function FiltroFechas({ onBuscar, disabled }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleBuscar = () => {
    if (fechaInicio && fechaFin) {
      // Convertir de YYYY-MM-DD (input date) a YYYY/MM/DD (formato API)
      const inicio = fechaInicio.replace(/-/g, '/');
      const fin = fechaFin.replace(/-/g, '/');
      
      console.log('📅 Fechas formateadas para API:', {
        original: { fechaInicio, fechaFin },
        formateado: { inicio, fin },
        formatoEsperado: 'YYYY/MM/DD'
      });
      
      console.log('🔗 URL que se generará:', 
        `/pedidos/entregar?fechaInicio=${inicio}&fechaFin=${fin}`
      );
      
      onBuscar(inicio, fin);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="Fecha Inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
            inputProps={{
              'aria-label': 'Fecha de inicio para filtrar pedidos'
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="Fecha Fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
            inputProps={{
              'aria-label': 'Fecha fin para filtrar pedidos'
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleBuscar}
            disabled={!fechaInicio || !fechaFin || disabled}
            aria-label="Buscar pedidos en el rango de fechas"
          >
            Buscar Pedidos
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FiltroFechas;
