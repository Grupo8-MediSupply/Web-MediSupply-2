import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Button, 
  IconButton,
  Chip,
  Stack,
  Tooltip,
  TableRow,
  TableCell
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Iconos
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Componentes reutilizables
import DataTable from '../ui/DataTable';
import { CountryNames } from '../../constants/auth';

const VendedoresTable = ({ vendedores }) => {
  // Obtener el mapeo de países de la configuración si está disponible
  const configuracion = useSelector(state => state.configuracion);
  
  // Función para obtener el nombre del país
  const getPaisNombre = (paisId) => {
    // Intentar obtener de CountryNames primero
    if (CountryNames[paisId]) {
      return CountryNames[paisId];
    }
    
    // Si no está en CountryNames, retornar el ID
    return `País ${paisId}`;
  };

  // Definir las columnas de la tabla
  const columns = [
    { id: 'nombre', label: 'Nombre', width: '25%' },
    { id: 'email', label: 'Email', width: '25%' },
    { id: 'pais', label: 'País', width: '20%' },
    { id: 'acciones', label: 'Acciones', width: '30%', align: 'center' }
  ];

  // Renderizar cada fila de la tabla
  const renderRow = (vendedor) => {
    const paisNombre = getPaisNombre(vendedor.paisId);
    
    return (
      <TableRow key={vendedor.id}>
        <TableCell>{vendedor.nombre}</TableCell>
        <TableCell>{vendedor.email}</TableCell>
        <TableCell>{paisNombre}</TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            <Tooltip title="Ver detalles">
              <IconButton 
                component={RouterLink} 
                to={`/ventas/vendedores/${vendedor.id}`} 
                size="small" 
                color="primary"
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver visitas">
              <IconButton 
                component={RouterLink} 
                to={`/ventas/vendedores/${vendedor.id}/visitas`} 
                size="small" 
                color="info"
              >
                <CalendarMonthIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton size="small" color="secondary">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <DataTable 
      columns={columns} 
      data={vendedores} 
      renderRow={renderRow}
      emptyMessage="No se encontraron vendedores"
    />
  );
};

export default VendedoresTable;
