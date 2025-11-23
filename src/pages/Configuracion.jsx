import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import {
  AssignmentLate as AuditoriaIcon,
  People as UsersIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

function Configuracion() {
  const configSections = [
    {
      title: 'Auditoría',
      description: 'Ver registro de todas las acciones realizadas en el sistema',
      icon: <AuditoriaIcon fontSize="large" color="primary" />,
      path: '/configuracion/auditoria',
      color: '#1976d2'
    },
    {
      title: 'Usuarios',
      description: 'Gestionar usuarios y permisos del sistema',
      icon: <UsersIcon fontSize="large" color="success" />,
      path: '/configuracion/usuarios',
      color: '#2e7d32',
      disabled: true
    },
    {
      title: 'General',
      description: 'Configuración general de la aplicación',
      icon: <SettingsIcon fontSize="large" color="action" />,
      path: '/configuracion/general',
      color: '#757575',
      disabled: true
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configuración del Sistema
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Personaliza los ajustes del sistema, gestiona usuarios y permisos,
          y configura parámetros generales de la aplicación.
        </Typography>

        <Grid container spacing={3}>
          {configSections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: section.disabled ? 0.6 : 1,
                  '&:hover': section.disabled ? {} : {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {section.icon}
                  </Box>
                  <Typography variant="h6" component="div" gutterBottom align="center">
                    {section.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {section.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button 
                    component={RouterLink}
                    to={section.path}
                    variant="contained"
                    disabled={section.disabled}
                    sx={{ 
                      bgcolor: section.color,
                      '&:hover': { bgcolor: section.color, filter: 'brightness(0.9)' }
                    }}
                  >
                    {section.disabled ? 'Próximamente' : 'Acceder'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Configuracion;
