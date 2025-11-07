import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Chip,
  Box,
  Tooltip
} from '@mui/material';
import { LocalShipping as TruckIcon } from '@mui/icons-material';

function ListaPedidos({ pedidos, pedidosSeleccionados, onTogglePedido }) {
  const isPedidoSeleccionado = (pedido) => {
    return pedidosSeleccionados.some(p => p.orden.id === pedido.orden.id);
  };

  // Helper para mostrar el ID de la orden de forma abreviada
  const getOrdenDisplay = (orden) => {
    return orden.id.substring(0, 8).toUpperCase();
  };

  // Helper para mostrar coordenadas de ubicación
  const getUbicacionDisplay = (ubicacion) => {
    if (!ubicacion || typeof ubicacion.lat !== 'number' || typeof ubicacion.lng !== 'number') {
      return 'Ubicación no disponible';
    }
    return `${ubicacion.lat.toFixed(4)}, ${ubicacion.lng.toFixed(4)}`;
  };

  // Helper para mostrar información del vehículo
  const getVehiculoDisplay = (vehiculo) => {
    return vehiculo.placa || vehiculo.id.substring(0, 8).toUpperCase();
  };

  // Helper para obtener color del chip según el estado
  const getEstadoColor = (estado) => {
    const estadoUpper = estado?.toUpperCase();
    switch (estadoUpper) {
      case 'RECIBIDO':
        return 'success';
      case 'EN_PROCESO':
        return 'warning';
      case 'PENDIENTE':
        return 'default';
      case 'COMPLETADO':
        return 'info';
      default:
        return 'default';
    }
  };

  if (pedidos.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No hay pedidos pendientes de entrega en el rango de fechas seleccionado
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2">
          Pedidos Pendientes de Entrega
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Seleccione los pedidos para generar rutas • {pedidos.length} pedido(s) encontrado(s)
        </Typography>
      </Box>
      <TableContainer>
        <Table aria-label="Tabla de pedidos pendientes">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <span className="sr-only">Seleccionar</span>
              </TableCell>
              <TableCell>ID Orden</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Ubicación Cliente</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow
                key={pedido.orden.id}
                hover
                onClick={() => onTogglePedido(pedido)}
                sx={{ cursor: 'pointer' }}
                role="checkbox"
                aria-checked={isPedidoSeleccionado(pedido)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isPedidoSeleccionado(pedido)}
                    inputProps={{
                      'aria-label': `Seleccionar pedido ${getOrdenDisplay(pedido.orden)}`
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title={pedido.orden.id} arrow>
                    <Typography variant="body2" fontWeight="medium">
                      {getOrdenDisplay(pedido.orden)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {pedido.orden.cliente.nombre}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Coordenadas GPS del cliente" arrow>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {getUbicacionDisplay(pedido.orden.cliente.ubicacion)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={<TruckIcon />}
                    label={getVehiculoDisplay(pedido.vehiculoAsignado)}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {pedido.vehiculoAsignado.modelo || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={pedido.orden.estado}
                    size="small"
                    color={getEstadoColor(pedido.orden.estado)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ListaPedidos;
