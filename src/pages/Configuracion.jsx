import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Configuracion() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configuración del Sistema
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Personaliza los ajustes del sistema, gestiona usuarios y permisos,
            y configura parámetros generales de la aplicación.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Configuracion;
