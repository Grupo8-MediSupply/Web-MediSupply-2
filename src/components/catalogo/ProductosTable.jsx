import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductosTable({ productos }) {
  const navigate = useNavigate();
  const configuracion = useSelector(state => state.configuracion?.pais) || {
    idiomaOficial: 'es-CO',
    sigla_moneda: 'COP',
    simboloMoneda: '$'
  };

  // Función para formatear precios según la configuración regional
  const formatCurrency = (value) => {
    if (!value && value !== 0) return '';
    
    try {
      return new Intl.NumberFormat(configuracion.idiomaOficial, {
        style: 'currency',
        currency: configuracion.sigla_moneda,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    } catch (error) {
      console.warn('Error formatting currency:', error);
      return `${configuracion.simboloMoneda} ${value.toLocaleString('es-CO')}`;
    }
  };

  if (!productos?.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No se encontraron productos
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'action.hover' }}>
            <TableCell>SKU</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow key={producto.productoRegionalId}>
              <TableCell>{producto.sku}</TableCell>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell>{producto.tipo}</TableCell>
              <TableCell align="right">{formatCurrency(producto.precio)}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/catalogo/productos/${producto.productoRegionalId}`)}
                >
                  Ver detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProductosTable.propTypes = {
  productos: PropTypes.array.isRequired
};

export default ProductosTable;
