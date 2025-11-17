import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  LinearProgress
} from '@mui/material';

const PlanesVentaTable = ({ planes }) => {
  // Función para formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Calcular porcentaje de avance
  const calcularPorcentaje = (actual, meta) => {
    if (!meta || meta === 0) return 0;
    return Math.min((actual / meta) * 100, 100);
  };

  // Obtener color según el porcentaje
  const getColorPorcentaje = (porcentaje) => {
    if (porcentaje >= 100) return 'success';
    if (porcentaje >= 75) return 'info';
    if (porcentaje >= 50) return 'warning';
    return 'error';
  };

  if (planes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No hay planes de venta creados
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Crea tu primer plan de venta haciendo clic en el botón "Nuevo Plan"
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'grey.50' }}>
            <TableCell><strong>Nombre del Plan</strong></TableCell>
            <TableCell><strong>Vendedor</strong></TableCell>
            <TableCell align="right"><strong>Meta</strong></TableCell>
            <TableCell align="right"><strong>Actual</strong></TableCell>
            <TableCell><strong>Progreso</strong></TableCell>
            <TableCell><strong>Período</strong></TableCell>
            <TableCell><strong>Estado</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planes.map((plan) => {
            const porcentaje = calcularPorcentaje(plan.montoActual || 0, plan.montoMeta);
            const colorPorcentaje = getColorPorcentaje(porcentaje);

            return (
              <TableRow key={plan.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {plan.nombre}
                  </Typography>
                  {plan.descripcion && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      {plan.descripcion}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {plan.vendedorNombre || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight="medium">
                    {formatCurrency(plan.montoMeta)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color={colorPorcentaje}>
                    {formatCurrency(plan.montoActual || 0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={porcentaje} 
                        color={colorPorcentaje}
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 45 }}>
                      <Typography variant="body2" color="text.secondary">
                        {porcentaje.toFixed(0)}%
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {plan.inicio} - {plan.fin}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={plan.estado || 'ACTIVO'} 
                    size="small"
                    color={plan.estado === 'ACTIVO' ? 'success' : 'default'}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlanesVentaTable;
