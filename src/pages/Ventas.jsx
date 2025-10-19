import React from 'react';
import { 
  Container, 
  Typography, 
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import image_planes_venta from '../assets/planes_venta.png';
import image_reportes from '../assets/reportes.png';
import image_vendedores from '../assets/vendedores.png';

// Componente para tarjetas de navegación
const NavCard = ({ title, image, to, bgColor }) => (
  <Card 
    sx={{ 
      height: '100%',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6
      }
    }}
  >
    <CardActionArea 
      component={RouterLink} 
      to={to} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{ 
          width: 80, 
          height: 80, 
          mb: 2,
          objectFit: 'contain'
        }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

function Ventas() {
  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ 
        height: 'calc(100vh - 40px)',
        display: 'flex', 
        flexDirection: 'column'
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          m: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Ventas
        </Typography>
        
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
            alignItems="center"
            sx={{ maxWidth: 1200, mx: 'auto' }}
          >
            {/* Tarjeta de Vendedores */}
            <Grid item xs={12} sm={6} md={4}>
              <NavCard 
                title="Vendedores"
                image={image_vendedores}
                to="/ventas/vendedores"
                bgColor="#4285F4"
              />
            </Grid>
            
            {/* Tarjeta de Planes de venta */}
            <Grid item xs={12} sm={6} md={4}>
              <NavCard 
                title="Planes de venta"
                image={image_planes_venta}
                to="/ventas/planes"
                bgColor="#34A853"
              />
            </Grid>
            
            {/* Tarjeta de Reportes */}
            <Grid item xs={12} sm={6} md={4}>
              <NavCard 
                title="Reportes"
                image={image_reportes}
                to="/ventas/reportes"
                bgColor="#1A73E8"
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Ventas;
