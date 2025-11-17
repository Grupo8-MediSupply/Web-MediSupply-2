import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Componentes personalizados
import BreadcrumbsNav from '../../components/ui/BreadcrumbsNav';
import PlanVentaForm from '../../components/ventas/PlanVentaForm';
import PlanesVentaTable from '../../components/ventas/PlanesVentaTable';

// Redux
import {
  fetchAllPlanes,
  selectAllPlanes,
  selectPlanesStatus,
  selectPlanesError
} from '../../redux/features/planesVentaSlice';

// Navegación para breadcrumbs
const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Ventas', path: '/ventas' }
];

function PlanesVenta() {
  const dispatch = useDispatch();
  const planes = useSelector(selectAllPlanes);
  const status = useSelector(selectPlanesStatus);
  const error = useSelector(selectPlanesError);
  
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Cargar planes al montar el componente
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllPlanes());
    }
  }, [status, dispatch]);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    // Recargar planes después de crear uno nuevo
    dispatch(fetchAllPlanes());
  };

  // Renderizado condicional según el estado
  let content;
  if (status === 'loading') {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  } else if (status === 'failed') {
    content = (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar los planes: {error}
      </Alert>
    );
  } else {
    content = <PlanesVentaTable planes={planes} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Planes de Venta"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Planes de Venta
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
          >
            Nuevo Plan
          </Button>
        </Box>
        
        {content}
      </Paper>
      
      <PlanVentaForm 
        open={isFormOpen}
        onClose={handleCloseForm}
      />
    </Container>
  );
}

export default PlanesVenta;
