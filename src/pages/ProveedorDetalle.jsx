import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from '@mui/icons-material/Public';

// Componentes
import BreadcrumbsNav from '../components/ui/BreadcrumbsNav';
import DateRangeFilter from '../components/proveedores/DateRangeFilter';
import HistorialComprasTable from '../components/proveedores/HistorialComprasTable';

// Redux
import {
  fetchHistorialCompras,
  clearHistorialCompras,
  selectHistorialCompras,
  selectHistorialStatus,
  selectHistorialError,
  selectAllProveedores
} from '../redux/features/proveedoresSlice';
import { selectPaisConfig, selectTiposIdentificacion } from '../redux/features/configuracionSlice';

// Navegación para breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Proveedores', path: '/proveedores' },
];

const ProveedorDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const proveedores = useSelector(selectAllProveedores);
  const historialCompras = useSelector(selectHistorialCompras);
  const historialStatus = useSelector(selectHistorialStatus);
  const historialError = useSelector(selectHistorialError);
  const paisConfig = useSelector(selectPaisConfig);
  const tiposIdentificacion = useSelector(selectTiposIdentificacion);

  // Estado local
  const [proveedor, setProveedor] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Buscar proveedor en el estado
  useEffect(() => {
    const proveedorEncontrado = proveedores.find(p => p.id === id);
    setProveedor(proveedorEncontrado);
  }, [id, proveedores]);

  // Cargar historial completo al montar el componente
  useEffect(() => {
    if (id) {
      dispatch(fetchHistorialCompras({ proveedorId: id }));
    }
    
    return () => {
      dispatch(clearHistorialCompras());
    };
  }, [id, dispatch]);

  // Obtener nombre del país
  const getPaisNombre = (paisId) => {
    if (paisConfig && paisConfig.id === paisId) {
      return paisConfig.nombre;
    }
    return `País ${paisId}`;
  };

  // Obtener tipo de identificación
  const getTipoIdentificacion = (tipoId) => {
    const tipo = tiposIdentificacion.find(t => t.id === tipoId);
    return tipo ? tipo.nombre : tipoId;
  };

  // Manejar búsqueda de historial con filtro de fechas
  const handleBuscarHistorial = () => {
    if (!id) return;
    
    const params = { proveedorId: id };
    
    // Solo agregar fechas si ambas están presentes
    if (fechaInicio && fechaFin) {
      params.fechaInicio = fechaInicio;
      params.fechaFin = fechaFin;
    }
    
    dispatch(fetchHistorialCompras(params));
  };

  // Limpiar filtros y cargar historial completo
  const handleLimpiarFiltros = () => {
    setFechaInicio('');
    setFechaFin('');
    
    if (id) {
      dispatch(fetchHistorialCompras({ proveedorId: id }));
    }
  };

  // Volver a la lista de proveedores
  const handleVolver = () => {
    navigate('/proveedores');
  };

  // Si no se encuentra el proveedor
  if (!proveedor) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <BreadcrumbsNav
          items={breadcrumbsItems}
          currentPage="Detalle del Proveedor"
        />
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Alert severity="warning">
            No se encontró el proveedor. Por favor, verifique que el ID sea correcto.
          </Alert>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleVolver}
            >
              Volver a proveedores
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage={proveedor.nombreProveedor}
      />

      {/* Información del proveedor */}
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {proveedor.nombreProveedor}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleVolver}
          >
            Volver
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                </Box>
                <Typography variant="body1">{proveedor.email}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PublicIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    País
                  </Typography>
                </Box>
                <Typography variant="body1">{getPaisNombre(proveedor.pais)}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BadgeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Tipo de Identificación
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {getTipoIdentificacion(proveedor.tipoIdentificacion)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BadgeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    Número de Identificación
                  </Typography>
                </Box>
                <Typography variant="body1">{proveedor.identificacion}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Historial de compras */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Historial de Compras
        </Typography>
        
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <DateRangeFilter
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            onFechaInicioChange={setFechaInicio}
            onFechaFinChange={setFechaFin}
            onSearch={handleBuscarHistorial}
            onClear={handleLimpiarFiltros}
            disabled={historialStatus === 'loading'}
          />
        </Box>

        <HistorialComprasTable
          compras={historialCompras}
          status={historialStatus}
          error={historialError}
        />
      </Paper>
    </Container>
  );
};

export default ProveedorDetalle;
