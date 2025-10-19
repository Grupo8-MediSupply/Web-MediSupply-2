import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

/**
 * Tabla de datos reutilizable
 * @param {Array} columns - Configuración de columnas
 * @param {Array} data - Datos a mostrar
 * @param {Function} renderRow - Función para renderizar cada fila
 * @param {String} emptyMessage - Mensaje a mostrar cuando no hay datos
 */
function DataTable({ columns, data, renderRow, emptyMessage = "No se encontraron datos" }) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                width={column.width}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => renderRow(item))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
