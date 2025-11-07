import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Componentes personalizados
import BreadcrumbsNav from '../../components/ui/BreadcrumbsNav';

// Redux actions y selectors
import {
  fetchVendedorKPIs,
  selectVendedorKPIs,
  selectReportesStatus,
  selectReportesError,
  setVendedorSeleccionado,
  selectVendedorSeleccionado,
  clearVendedorKPIs
} from '../../redux/features/reportesSlice';
import {
  fetchVendedores,
  selectAllVendedores,
  selectVendedoresStatus
} from '../../redux/features/vendedoresSlice';
import { fetchConfiguracion } from '../../redux/features/configuracionSlice';
import { CountryNames } from '../../constants/auth';

// Navegación para el breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Ventas', path: '/ventas' }
];

// Componente para tarjeta de KPI
const KPICard = ({ title, value, icon: Icon, color, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ color: color, fontWeight: 'bold' }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon sx={{ fontSize: 32, color: color }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

function ReportesVentas() {
  const dispatch = useDispatch();
  
  // Selectores
  const vendedores = useSelector(selectAllVendedores);
  const vendedoresStatus = useSelector(selectVendedoresStatus);
  const vendedorKPIs = useSelector(selectVendedorKPIs);
  const vendedorSeleccionado = useSelector(selectVendedorSeleccionado);
  const reportesStatus = useSelector(selectReportesStatus);
  const reportesError = useSelector(selectReportesError);
  const configuracion = useSelector(state => state.configuracion);

  // Cargar configuración y vendedores al montar el componente
  useEffect(() => {
    const loadData = async () => {
      // Cargar configuración primero
      if (configuracion.status === 'idle') {
        await dispatch(fetchConfiguracion());
      }
      
      // Cargar vendedores
      if (vendedoresStatus === 'idle' && configuracion.status === 'succeeded') {
        dispatch(fetchVendedores());
      }
    };
    
    loadData();
  }, [configuracion.status, vendedoresStatus, dispatch]);

  // Limpiar KPIs al desmontar
  useEffect(() => {
    return () => {
      dispatch(clearVendedorKPIs());
    };
  }, [dispatch]);

  // Manejar cambio de vendedor seleccionado
  const handleVendedorChange = (event) => {
    const vendedorId = event.target.value;
    const vendedor = vendedores.find(v => v.id === vendedorId);
    
    dispatch(setVendedorSeleccionado(vendedor));
    
    if (vendedorId) {
      dispatch(fetchVendedorKPIs(vendedorId));
    }
  };

  // Función para formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Mostrar información del país
  const paisNombre = configuracion.pais?.nombre || CountryNames[configuracion.pais?.id] || 'País';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Reportes de Ventas"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Reportes de Ventas
          </Typography>
          
          {configuracion.pais && (
            <Box sx={{ mb: 3, display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2">Mostrando datos para:</Typography>
              <Chip size="small" label={paisNombre} color="secondary" />
            </Box>
          )}

          {/* Selector de Vendedor */}
          <FormControl fullWidth sx={{ maxWidth: 400 }}>
            <InputLabel>Seleccione un vendedor</InputLabel>
            <Select
              value={vendedorSeleccionado?.id || ''}
              onChange={handleVendedorChange}
              label="Seleccione un vendedor"
              disabled={vendedoresStatus === 'loading'}
            >
              <MenuItem value="">
                <em>Seleccione un vendedor</em>
              </MenuItem>
              {vendedores.map((vendedor) => (
                <MenuItem key={vendedor.id} value={vendedor.id}>
                  {vendedor.nombre} - {vendedor.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Estado de carga de vendedores */}
        {vendedoresStatus === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error al cargar vendedores */}
        {vendedoresStatus === 'failed' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Error al cargar la lista de vendedores
          </Alert>
        )}

        {/* Estado de carga de KPIs */}
        {reportesStatus === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Cargando datos del vendedor...</Typography>
          </Box>
        )}

        {/* Error al cargar KPIs */}
        {reportesStatus === 'failed' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {reportesError || 'Error al cargar los datos del vendedor'}
          </Alert>
        )}

        {/* KPIs del vendedor */}
        {vendedorKPIs && reportesStatus === 'succeeded' && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Métricas de {vendedorKPIs.vendedorNombre}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Ventas Totales */}
              <Grid item xs={12} md={4}>
                <KPICard
                  title="Ventas Totales"
                  value={formatCurrency(vendedorKPIs.ventasTotales)}
                  icon={TrendingUpIcon}
                  color="#4caf50"
                  subtitle="Total acumulado"
                />
              </Grid>

              {/* Pedidos Gestionados */}
              <Grid item xs={12} md={4}>
                <KPICard
                  title="Pedidos Gestionados"
                  value={vendedorKPIs.pedidosGestionados}
                  icon={ShoppingCartIcon}
                  color="#2196f3"
                  subtitle="Total de pedidos"
                />
              </Grid>

              {/* Valor Promedio de Pedido */}
              <Grid item xs={12} md={4}>
                <KPICard
                  title="Valor Promedio"
                  value={formatCurrency(vendedorKPIs.valorPromedioPedido)}
                  icon={AttachMoneyIcon}
                  color="#ff9800"
                  subtitle="Por pedido"
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Mensaje inicial */}
        {!vendedorSeleccionado && vendedoresStatus === 'succeeded' && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Seleccione un vendedor para ver sus métricas
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ReportesVentas;
