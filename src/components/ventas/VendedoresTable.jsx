import React from 'react';
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

const VendedoresTable = ({ vendedores }) => {
  // Definir las columnas de la tabla
  const columns = [
    { id: 'id', label: 'ID', width: '20%' },
    { id: 'nombre', label: 'Nombre', width: '25%' },
    { id: 'territorio', label: 'Territorio', width: '20%' },
    { id: 'acciones', label: 'Acciones', width: '20%', align: 'center' }
  ];

  // Renderizar cada fila de la tabla
  const renderRow = (vendedor) => {
    // Calcular el progreso de visitas
    const porcentajeVisitas = Math.round((vendedor.visitasCompletadas / vendedor.visitasProgramadas) * 100);
    const colorVisitas = porcentajeVisitas < 50 ? 'error' : (porcentajeVisitas < 80 ? 'warning' : 'success');

    return (
      <TableRow key={vendedor.id}>
        <TableCell>{vendedor.id}</TableCell>
        <TableCell>{vendedor.nombre}</TableCell>
        <TableCell>{vendedor.territorio}</TableCell>
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
