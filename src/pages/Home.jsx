import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 4
        }}
      >
        <MedicalServicesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a MediSupply
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
          Sistema de gestión de suministros médicos para clínicas y hospitales
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          color="primary"
          sx={{ px: 4, py: 1 }}
        >
          Comenzar
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Inventario
              </Typography>
              <Typography variant="body1">
                Gestiona fácilmente tu inventario de suministros médicos con una interfaz intuitiva.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Reportes
              </Typography>
              <Typography variant="body1">
                Genera informes detallados sobre el uso y disponibilidad de tus suministros.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Alertas
              </Typography>
              <Typography variant="body1">
                Recibe notificaciones automáticas cuando tus suministros estén por agotarse.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
