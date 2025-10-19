import React from 'react';
import { TableRow, TableCell, Chip } from '@mui/material';
import DataTable from '../ui/DataTable';

// Definición de columnas para la tabla de productos
const productosColumns = [
  { id: 'producto', label: 'Producto' },
  { id: 'lote', label: 'Lote' },
  { id: 'cantidad', label: 'Cantidad disponible' },
  { id: 'vencimiento', label: 'Fecha de vencimiento' }
];

/**
 * Tabla específica para mostrar la lista de productos en un inventario
 * @param {Array} productos - Lista de productos a mostrar
 */
function ProductosTable({ productos }) {
  // Función para calcular si un producto está próximo a vencer (menos de 30 días)
  const isCloseToExpire = (fechaVencimiento) => {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento.split('/').reverse().join('-'));
    const diasRestantes = Math.floor((vencimiento - hoy) / (1000 * 60 * 60 * 24));
    return diasRestantes > 0 && diasRestantes < 30;
  };

  // Función para renderizar cada fila de la tabla
  const renderProductoRow = (producto) => (
    <TableRow key={`${producto.lote}-${producto.producto}`}>
      <TableCell>{producto.producto}</TableCell>
      <TableCell>{producto.lote}</TableCell>
      <TableCell>{producto.cantidad}</TableCell>
      <TableCell>
        {isCloseToExpire(producto.vencimiento) ? (
          <Chip 
            label={producto.vencimiento} 
            color="warning"
            size="small"
            variant="outlined"
          />
        ) : (
          producto.vencimiento
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <DataTable
      columns={productosColumns}
      data={productos}
      renderRow={renderProductoRow}
      emptyMessage="No se encontraron productos en esta bodega"
    />
  );
}

export default ProductosTable;
