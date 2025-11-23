import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import AuditoriaRow from './AuditoriaRow';

/**
 * Componente reutilizable de tabla para auditorías
 * @param {Object} props
 * @param {Array} props.auditorias - Lista de auditorías
 * @param {string} props.status - Estado de carga (loading, succeeded, failed)
 * @param {string} props.error - Mensaje de error
 * @param {Function} props.onRowExpand - Callback cuando se expande una fila
 * @returns {JSX.Element}
 */
const AuditoriaTable = ({ 
  auditorias = [], 
  status = 'idle', 
  error = null,
  onRowExpand 
}) => {
  // Estado de carga
  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Estado de error
  if (status === 'failed') {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar las auditorías: {error}
      </Alert>
    );
  }

  // Tabla de auditorías
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fecha</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Módulo</TableCell>
            <TableCell>Severidad</TableCell>
            <TableCell>IP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auditorias.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                  No se encontraron registros de auditoría
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            auditorias.map((auditoria) => (
              <AuditoriaRow 
                key={auditoria.id} 
                auditoria={auditoria}
                onExpand={onRowExpand}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditoriaTable;
