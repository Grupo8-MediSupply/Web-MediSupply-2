import React from 'react';
import { TableRow, TableCell, Button, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DataTable from '../ui/DataTable';

// Definición de columnas para la tabla de bodegas
const bodegasColumns = [
  { id: 'nombre', label: 'Bodega' },
  { id: 'ciudad', label: 'Ciudad' },
  { id: 'capacidad', label: 'Capacidad total' },
  { id: 'estado', label: 'Estado' },
  { id: 'acciones', label: 'Acciones', align: 'center' }
];

/**
 * Tabla específica para mostrar la lista de bodegas
 * @param {Array} bodegas - Lista de bodegas a mostrar
 */
function BodegasTable({ bodegas }) {
  // Función para renderizar cada fila de la tabla
  const renderBodegaRow = (bodega) => (
    <TableRow key={bodega.id}>
      <TableCell>{bodega.nombre}</TableCell>
      <TableCell>{bodega.ciudad}</TableCell>
      <TableCell>{bodega.capacidad}</TableCell>
      <TableCell>
        <Chip 
          label={bodega.estado} 
          color={bodega.estado === 'Activo' ? 'success' : 'error'}
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <Button 
          component={RouterLink} 
          to={`/inventarios/bodegas/${bodega.id}`}
          variant="outlined"
          size="small"
        >
          Ver detalle
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <DataTable
      columns={bodegasColumns}
      data={bodegas}
      renderRow={renderBodegaRow}
      emptyMessage="No se encontraron bodegas"
    />
  );
}

export default BodegasTable;
