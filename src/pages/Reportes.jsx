import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Reportes() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reportes y Análisis
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Genera informes detallados sobre inventarios, ventas, compras y más.
            Analiza tendencias y toma decisiones basadas en datos precisos.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Reportes;
