import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

/**
 * Componente de tabla genérico reutilizable
 * @param {Array} columns - Configuración de columnas [{id, label, width, align}]
 * @param {Array} data - Datos a mostrar
 * @param {Function} renderRow - Función que renderiza una fila (debe retornar un TableRow)
 * @param {String} emptyMessage - Mensaje a mostrar cuando no hay datos
 */
const DataTable = ({ columns, data, renderRow, emptyMessage = 'No hay datos disponibles' }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="tabla de datos">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                style={{ width: column.width }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {column.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            // Renderizar cada fila usando la función renderRow
            data.map(item => renderRow(item))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
