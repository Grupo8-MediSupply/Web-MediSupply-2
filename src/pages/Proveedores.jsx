import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Proveedores() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Proveedores
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Administra la información de tus proveedores, contratos, contactos y evalúa 
            su desempeño para optimizar tus relaciones comerciales.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Proveedores;
