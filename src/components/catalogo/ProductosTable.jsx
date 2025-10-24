import React from 'react';
import PropTypes from 'prop-types';
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
import { useDispatch } from 'react-redux';
import { selectProducto } from '../../redux/features/catalogoSlice';

// Mapeo de códigos de países a nombres
const PAISES = {
  'CO': 'Colombia',
  'MX': 'México',
  'PE': 'Perú',
  'CL': 'Chile',
  'AR': 'Argentina'
};

// Función para formatear precios en formato de moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal'
  }).format(value);
};

function ProductosTable({ productos }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Si no hay productos, mostrar mensaje
  if (!productos || productos.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No se encontraron productos con los criterios de búsqueda.
        </Typography>
      </Box>
    );
  }

  // Manejar click en Ver detalle
  const handleVerDetalle = (producto) => {
    dispatch(selectProducto(producto));
    navigate(`/catalogo/productos/${producto.id}`);
  };

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'action.hover' }}>
            <TableCell>ID</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>País</TableCell>
            <TableCell align="right">Stock disponible</TableCell>
            <TableCell>Cadena de frío</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow
              key={producto.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {producto.id}
              </TableCell>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.proveedor}</TableCell>
              <TableCell>{PAISES[producto.pais] || producto.pais}</TableCell>
              <TableCell align="right">
                {producto.stock?.disponible || producto.stock}
              </TableCell>
              <TableCell>
                {producto.cadenaFrio ? 'Cumple' : 'No requiere'}
              </TableCell>
              <TableCell align="right">{formatCurrency(producto.precio)}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleVerDetalle(producto)}
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
