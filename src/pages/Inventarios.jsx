import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Inventarios() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Inventarios
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Aquí podrás gestionar el inventario de suministros médicos, incluyendo entradas, 
            salidas, transferencias y ajustes de inventario.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Inventarios;
