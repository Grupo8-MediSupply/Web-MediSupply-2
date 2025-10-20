import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

// Mapeo de códigos de país a nombres
const PAISES = {
  'CO': 'Colombia',
  'MX': 'México',
  'PE': 'Perú',
  'CL': 'Chile',
  'AR': 'Argentina',
  'EC': 'Ecuador',
  'BR': 'Brasil'
};

const ProveedoresTable = ({ proveedores = [] }) => {
  // Si no hay proveedores, mostrar mensaje
  if (proveedores.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No se encontraron proveedores con los filtros actuales.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
      <Table>
        <TableHead sx={{ backgroundColor: 'background.subtle' }}>
          <TableRow>
            <TableCell>Proveedor</TableCell>
            <TableCell>País</TableCell>
            <TableCell>Numero de identificación</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proveedores.map((proveedor) => (
            <TableRow key={proveedor.id} hover>
              <TableCell>{proveedor.nombre}</TableCell>
              <TableCell>{PAISES[proveedor.pais] || proveedor.pais}</TableCell>
              <TableCell>{proveedor.numeroIdentificacion}</TableCell>
              <TableCell align="right">
                <Button 
                  component={Link} 
                  to={`/proveedores/${proveedor.id}`} 
                  size="small"
                  sx={{ textTransform: 'none' }}
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
};

export default ProveedoresTable;
