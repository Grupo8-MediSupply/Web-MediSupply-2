import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box
} from '@mui/material';

function Clientes() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Clientes
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Mantén un registro detallado de tus clientes, su historial de compras,
            preferencias y datos de contacto para brindar un mejor servicio.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Clientes;
