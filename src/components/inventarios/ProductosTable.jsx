import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import DataTable from '../ui/DataTable';

// Formato de fecha para mostrar en la tabla
const formatDate = (dateString) => {
  if (!dateString) return 'No especificado';
  try {
    return new Date(dateString).toLocaleDateString('es-CO');
  } catch (e) {
    return 'Fecha inválida';
  }
};

// Definición de columnas para la tabla de productos
const productosColumns = [
  { id: 'nombreProducto', label: 'Producto' },
  { id: 'numeroLote', label: 'Lote' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'FechaVencimiento', label: 'Vencimiento' },
  { id: 'sku', label: 'SKU' }
];

/**
 * Tabla específica para mostrar la lista de productos en un inventario
 * @param {Array} productos - Lista de productos a mostrar
 */
function ProductosTable({ productos }) {
  // Función para renderizar cada fila de la tabla
  const renderProductoRow = (producto) => (
    <TableRow key={producto.loteId}>
      <TableCell>{producto.nombreProducto}</TableCell>
      <TableCell>{producto.numeroLote}</TableCell>
      <TableCell>{producto.cantidad?.toLocaleString() ?? 0}</TableCell>
      <TableCell>{formatDate(producto.FechaVencimiento)}</TableCell>
      <TableCell>{producto.sku}</TableCell>
    </TableRow>
  );

  return (
    <DataTable
      columns={productosColumns}
      data={productos}
      renderRow={renderProductoRow}
      emptyMessage="No hay productos disponibles"
    />
  );
}

export default ProductosTable;
