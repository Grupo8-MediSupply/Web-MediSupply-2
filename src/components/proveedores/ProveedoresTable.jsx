import React from 'react';
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
  Box,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { selectPaisConfig, selectTiposIdentificacion } from '../../redux/features/configuracionSlice';

const ProveedoresTable = ({ proveedores = [] }) => {
  const paisConfig = useSelector(selectPaisConfig);
  const tiposIdentificacion = useSelector(selectTiposIdentificacion);

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

  // Función para obtener el nombre del país
  const getPaisNombre = (paisId) => {
    // Si el proveedor es del país actual configurado, mostrar el nombre
    if (paisConfig && paisConfig.id === paisId) {
      return paisConfig.nombre;
    }
    // Si no, mostrar el ID (en producción todos deberían ser del mismo país)
    return paisId;
  };

  // Función para obtener el tipo de identificación
  const getTipoIdentificacion = (tipoId) => {
    const tipo = tiposIdentificacion.find(t => t.id === tipoId);
    return tipo ? tipo.abreviatura : tipoId;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
      <Table>
        <TableHead sx={{ backgroundColor: 'background.subtle' }}>
          <TableRow>
            <TableCell>Proveedor</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>País</TableCell>
            <TableCell>Tipo ID</TableCell>
            <TableCell>Número de identificación</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proveedores.map((proveedor) => (
            <TableRow key={proveedor.id} hover>
              <TableCell>{proveedor.nombreProveedor}</TableCell>
              <TableCell>{proveedor.email}</TableCell>
              <TableCell>{getPaisNombre(proveedor.pais)}</TableCell>
              <TableCell>{getTipoIdentificacion(proveedor.tipoIdentificacion)}</TableCell>
              <TableCell>{proveedor.identificacion}</TableCell>
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
