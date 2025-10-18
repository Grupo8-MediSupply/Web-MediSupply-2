import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Link as RouterLink } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import logo from '../assets/logo_medisupply_principal.png';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 3
        }}
      >
        <img height="200" src={logo} alt="Medical Supplies" />
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 3, maxWidth: '800px' }}>
          Sistema de gestión integral de suministros médicos para clínicas y hospitales
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <InventoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                Inventario
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Gestiona fácilmente tu inventario de suministros médicos con una interfaz intuitiva.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/inventarios" 
                variant="outlined" 
                size="small"
              >
                Ir a Inventarios
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                Catálogo
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Explora nuestro catálogo completo de productos médicos disponibles.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/catalogo" 
                variant="outlined" 
                size="small"
              >
                Ver Catálogo
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                Reportes
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Genera informes detallados sobre el uso y disponibilidad de tus suministros.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/reportes" 
                variant="outlined" 
                size="small"
              >
                Ver Reportes
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Home;
