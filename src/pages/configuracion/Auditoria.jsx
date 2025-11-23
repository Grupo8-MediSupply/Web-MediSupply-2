import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper
} from '@mui/material';

import BreadcrumbsNav from '../../components/ui/BreadcrumbsNav';
import {
  AuditoriaFilters,
  AuditoriaTable
} from '../../components/auditoria';
import {
  fetchAuditorias,
  selectFilteredAuditorias,
  selectAuditoriasStatus,
  selectAuditoriasError,
  selectFiltros,
  setFiltros,
  clearFiltros
} from '../../redux/features/auditoriaSlice';

const breadcrumbsItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Configuración', path: '/configuracion' },
];

function Auditoria() {
  const dispatch = useDispatch();
  const auditorias = useSelector(selectFilteredAuditorias);
  const status = useSelector(selectAuditoriasStatus);
  const error = useSelector(selectAuditoriasError);
  const filtros = useSelector(selectFiltros);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAuditorias());
    }
  }, [status, dispatch]);

  const handleFiltroChange = (campo, valor) => {
    dispatch(setFiltros({ [campo]: valor }));
  };

  const handleClearFiltros = () => {
    dispatch(clearFiltros());
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbsNav
        items={breadcrumbsItems}
        currentPage="Auditoría"
      />
      
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Auditoría del Sistema
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Registro de todas las acciones realizadas en el sistema
        </Typography>

        <AuditoriaFilters
          filters={filtros}
          onFilterChange={handleFiltroChange}
          onClearFilters={handleClearFiltros}
        />

        <AuditoriaTable
          auditorias={auditorias}
          status={status}
          error={error}
        />
      </Paper>
    </Container>
  );
}

export default Auditoria;
