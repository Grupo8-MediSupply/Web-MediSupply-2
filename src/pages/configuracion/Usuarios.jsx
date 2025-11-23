import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon
} from '@mui/icons-material';

import BreadcrumbsNav from '../../components/ui/BreadcrumbsNav';
import {
  UsuariosTable,
  UsuariosFilters
} from '../../components/usuarios';
import {
  fetchUsuarios,
  updateUsuarioEstado,
  selectFilteredUsuarios,
  selectUsuariosStatus,
  selectUsuariosError,
  selectUpdateStatus,
  selectUpdateError,
  selectFiltros,
  selectUsuariosStats,
  setFiltros,
  clearFiltros,
  resetUpdateStatus
} from '../../redux/features/usuariosSlice';

const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Configuración', path: '/configuracion' },
];

function Usuarios() {
  const dispatch = useDispatch();
  const usuarios = useSelector(selectFilteredUsuarios);
  const status = useSelector(selectUsuariosStatus);
  const error = useSelector(selectUsuariosError);
  const updateStatus = useSelector(selectUpdateStatus);
  const updateError = useSelector(selectUpdateError);
  const filtros = useSelector(selectFiltros);
  const stats = useSelector(selectUsuariosStats);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsuarios());
    }
  }, [status, dispatch]);

  // Manejar resultado de actualización
  useEffect(() => {
    if (updateStatus === 'succeeded') {
      setSnackbar({
        open: true,
        message: 'Estado del usuario actualizado correctamente',
        severity: 'success'
      });
      dispatch(resetUpdateStatus());
    } else if (updateStatus === 'failed') {
      setSnackbar({
        open: true,
        message: updateError || 'Error al actualizar el estado del usuario',
        severity: 'error'
      });
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, updateError, dispatch]);

  const handleFiltroChange = (campo, valor) => {
    dispatch(setFiltros({ [campo]: valor }));
  };

  const handleClearFiltros = () => {
    dispatch(clearFiltros());
  };

  const handleStatusChange = (idUsuario, nuevoEstado) => {
    dispatch(updateUsuarioEstado({ idUsuario, activo: nuevoEstado }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Usuarios"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Usuarios
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Administra los usuarios de la plataforma, sus roles y estados
          </Typography>

          {/* Estadísticas */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PeopleIcon color="primary" fontSize="large" />
                  <Box>
                    <Typography variant="h4">{stats.total}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Usuarios
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ActiveIcon color="success" fontSize="large" />
                  <Box>
                    <Typography variant="h4">{stats.activos}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Usuarios Activos
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <InactiveIcon color="error" fontSize="large" />
                  <Box>
                    <Typography variant="h4">{stats.inactivos}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Usuarios Inactivos
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Filtros */}
        <UsuariosFilters
          filters={filtros}
          onFilterChange={handleFiltroChange}
          onClearFilters={handleClearFiltros}
        />

        {/* Tabla */}
        <UsuariosTable
          usuarios={usuarios}
          status={status}
          error={error}
          onStatusChange={handleStatusChange}
          updating={updateStatus === 'loading'}
        />
      </Paper>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Usuarios;
