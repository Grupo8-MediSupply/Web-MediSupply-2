import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Route as RouteIcon } from '@mui/icons-material';
import {
  fetchPedidosEntregar,
  generateRutas,
  togglePedidoSeleccionado,
  clearPedidosSeleccionados,
  clearRutas,
  clearError
} from '../redux/features/logisticaSlice';
import FiltroFechas from '../components/logistica/FiltroFechas';
import ListaPedidos from '../components/logistica/ListaPedidos';
import ResultadosRutas from '../components/logistica/ResultadosRutas';

function Logisticas() {
  const dispatch = useDispatch();
  const {
    pedidosEntregar,
    pedidosSeleccionados,
    rutas,
    loading,
    error,
    rutasGeneradas
  } = useSelector((state) => state.logistica);

  const handleBuscarPedidos = (fechaInicio, fechaFin) => {
    dispatch(clearRutas());
    dispatch(clearPedidosSeleccionados());
    dispatch(fetchPedidosEntregar({ fechaInicio, fechaFin }));
  };

  const handleGenerarRutas = () => {
    if (pedidosSeleccionados.length === 0) {
      return;
    }
    dispatch(generateRutas(pedidosSeleccionados));
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Planificación y Generación de Rutas
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Consulta pedidos pendientes, selecciona aquellos que deseas optimizar 
          y genera rutas eficientes para la entrega.
        </Typography>

        <FiltroFechas onBuscar={handleBuscarPedidos} disabled={loading} />

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress aria-label="Cargando información" />
          </Box>
        )}

        {!loading && pedidosEntregar.length > 0 && (
          <>
            <ListaPedidos
              pedidos={pedidosEntregar}
              pedidosSeleccionados={pedidosSeleccionados}
              onTogglePedido={(pedido) => dispatch(togglePedidoSeleccionado(pedido))}
            />

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => dispatch(clearPedidosSeleccionados())}
                disabled={pedidosSeleccionados.length === 0 || loading}
              >
                Limpiar Selección
              </Button>
              <Button
                variant="contained"
                startIcon={<RouteIcon />}
                onClick={handleGenerarRutas}
                disabled={pedidosSeleccionados.length === 0 || loading}
                aria-label={`Generar rutas para ${pedidosSeleccionados.length} pedido(s) seleccionado(s)`}
              >
                Generar Rutas ({pedidosSeleccionados.length})
              </Button>
            </Box>
          </>
        )}

        {rutasGeneradas && <ResultadosRutas rutas={rutas} />}
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
          role="alert"
          aria-live="assertive"
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Logisticas;
