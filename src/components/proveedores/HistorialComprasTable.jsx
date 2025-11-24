import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { formatDate } from '../../utils/dateFormatter';

/**
 * Componente reutilizable para mostrar el historial de compras
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.compras - Lista de compras
 * @param {string} props.status - Estado de carga: 'idle' | 'loading' | 'succeeded' | 'failed'
 * @param {string} props.error - Mensaje de error si hay fallo
 */
const HistorialComprasTable = ({ compras = [], status = 'idle', error = null }) => {
  // Asegurar que compras siempre sea un array
  const comprasList = Array.isArray(compras) ? compras : [];
  
  // Estado de carga
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Estado de error
  if (status === 'failed') {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error || 'Error al cargar el historial de compras'}
      </Alert>
    );
  }

  // Estado sin datos
  if (comprasList.length === 0 && status === 'succeeded') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No se encontraron compras para este proveedor
        </Typography>
      </Box>
    );
  }

  // Formatear fecha usando la utilidad existente
  const formatFecha = (fecha) => {
    return formatDate(fecha);
  };

  // Formatear valor
  const formatValor = (valor) => {
    if (valor === null || valor === undefined) {
      return <Chip label="N/A" size="small" variant="outlined" />;
    }
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 2, 
        boxShadow: 'none', 
        border: '1px solid', 
        borderColor: 'divider' 
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: 'background.subtle' }}>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell>Fecha de Compra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comprasList.map((compra, index) => (
            <TableRow key={index} hover>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  {compra.producto}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Chip 
                  label={compra.cantidad} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                {formatValor(compra.valorTotal)}
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatFecha(compra.fechaCompra)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistorialComprasTable;
