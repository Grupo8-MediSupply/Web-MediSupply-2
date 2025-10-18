import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Breadcrumbs,
  Link,
  Button,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock data para mostrar detalles de una bodega específica
const mockBodegaDetails = {
  1: { 
    id: 1, 
    nombre: 'Centro Norte', 
    ciudad: 'Bogotá', 
    direccion: 'Calle 127 #53-45',
    capacidad: '5.000',
    ocupacion: '3.450',
    estado: 'Activo',
    responsable: 'Carlos Martínez',
    telefono: '601-3456789',
    email: 'centro.norte@medisupply.com'
  },
  2: { 
    id: 2, 
    nombre: 'Centro Urbano', 
    ciudad: 'Medellín',
    direccion: 'Carrera 43 #65-28',
    capacidad: '5.500',
    ocupacion: '4.200',
    estado: 'Activo',
    responsable: 'Ana Gómez',
    telefono: '604-5678912',
    email: 'centro.urbano@medisupply.com'
  },
  3: { 
    id: 3, 
    nombre: 'Centro Industrial', 
    ciudad: 'Cúcuta',
    direccion: 'Av. Industrial #23-15',
    capacidad: '4.000',
    ocupacion: '1.200',
    estado: 'Inactivo',
    responsable: 'Juan Pérez',
    telefono: '607-8912345',
    email: 'centro.industrial@medisupply.com'
  },
  4: { 
    id: 4, 
    nombre: 'Centro Oriente', 
    ciudad: 'Cali',
    direccion: 'Calle 5 #32-18',
    capacidad: '6.000',
    ocupacion: '5.300',
    estado: 'Activo',
    responsable: 'María Rodríguez',
    telefono: '602-2345678',
    email: 'centro.oriente@medisupply.com'
  }
};

function BodegaDetalle() {
  const { id } = useParams();
  const bodega = mockBodegaDetails[id];

  if (!bodega) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5">Bodega no encontrada</Typography>
        <Button 
          component={RouterLink} 
          to="/inventarios" 
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Volver a Bodegas
        </Button>
      </Container>
    );
  }

  // Calcular porcentaje de ocupación
  const ocupacionPorcentaje = (parseInt(bodega.ocupacion.replace('.', '')) / parseInt(bodega.capacidad.replace('.', ''))) * 100;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Inicio
        </Link>
        <Link component={RouterLink} to="/inventarios" underline="hover" color="inherit">
          Inventarios
        </Link>
        <Link component={RouterLink} to="/inventarios" underline="hover" color="inherit">
          Bodegas
        </Link>
        <Typography color="text.primary">{bodega.nombre}</Typography>
      </Breadcrumbs>
      
      {/* Botón para volver */}
      <Button 
        component={RouterLink} 
        to="/inventarios" 
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Volver a Bodegas
      </Button>
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {bodega.nombre}
          </Typography>
          <Chip 
            label={bodega.estado} 
            color={bodega.estado === 'Activo' ? 'success' : 'error'}
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Información General</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography><strong>Ciudad:</strong> {bodega.ciudad}</Typography>
              <Typography><strong>Dirección:</strong> {bodega.direccion}</Typography>
              <Typography><strong>Capacidad Total:</strong> {bodega.capacidad} unidades</Typography>
              <Typography><strong>Ocupación Actual:</strong> {bodega.ocupacion} unidades ({ocupacionPorcentaje.toFixed(1)}%)</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">Información de Contacto</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography><strong>Responsable:</strong> {bodega.responsable}</Typography>
              <Typography><strong>Teléfono:</strong> {bodega.telefono}</Typography>
              <Typography><strong>Email:</strong> {bodega.email}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Inventario</Typography>
          <Button 
            variant="contained" 
            color="primary"
            component={RouterLink}
            to={`/inventarios/bodegas/${id}/inventario`}
          >
            Ver Inventario
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default BodegaDetalle;
