import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Catalogo() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Catálogo de Productos
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Explora y gestiona el catálogo completo de productos médicos, incluyendo información 
            detallada, categorías, y especificaciones técnicas.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Catalogo;
