import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Ventas() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Ventas
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Administra el proceso completo de ventas, desde cotizaciones y órdenes
            hasta la facturación y seguimiento de pagos.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Ventas;
