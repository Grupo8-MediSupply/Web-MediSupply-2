import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Logisticas() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión Logística
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Controla todos los aspectos logísticos, desde la recepción de mercancías,
            almacenamiento, hasta la distribución a diferentes áreas o sucursales.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Logisticas;
