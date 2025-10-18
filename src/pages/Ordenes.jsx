import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Ordenes() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Órdenes de Compra
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Gestiona las órdenes de compra, desde la creación hasta la recepción,
            con un seguimiento detallado del estado y un historial completo.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Ordenes;
