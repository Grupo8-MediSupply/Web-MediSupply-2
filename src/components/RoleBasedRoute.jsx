import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Alert, Paper, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

/**
 * Componente que protege rutas basándose en el rol del usuario
 */
const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si no hay usuario o rol, mostrar acceso denegado
  if (!user || !user.role) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <LockIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
          <Alert severity="error" sx={{ mb: 2 }}>
            Acceso Denegado
          </Alert>
          <Box sx={{ mb: 2 }}>
            No tienes permisos para acceder a esta sección.
          </Box>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
          >
            Volver al inicio
          </Button>
        </Paper>
      </Container>
    );
  }

  // Verificar si el usuario tiene el rol permitido
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <LockIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
          <Alert severity="error" sx={{ mb: 2 }}>
            Acceso Denegado
          </Alert>
          <Box sx={{ mb: 2 }}>
            No tienes permisos suficientes para acceder a esta sección.
            Esta sección está restringida para administradores.
          </Box>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
          >
            Volver al inicio
          </Button>
        </Paper>
      </Container>
    );
  }

  // Si tiene acceso, renderizar los children
  return children;
};

RoleBasedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RoleBasedRoute;
