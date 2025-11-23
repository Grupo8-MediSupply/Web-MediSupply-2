import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  Grid,
  IconButton,
  Collapse
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

import BreadcrumbsNav from '../../components/ui/BreadcrumbsNav';
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

// Componente para filas expandibles
function AuditoriaRow({ auditoria }) {
  const [open, setOpen] = useState(false);

  const getSeveridadColor = (severidad) => {
    switch (severidad) {
      case 'ALTA': return 'error';
      case 'MEDIA': return 'warning';
      case 'BAJA': return 'info';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{formatDate(auditoria.createdAt)}</TableCell>
        <TableCell>{auditoria.email}</TableCell>
        <TableCell>{auditoria.accion}</TableCell>
        <TableCell>
          <Chip 
            label={auditoria.modulo || 'N/A'} 
            size="small" 
            variant="outlined"
          />
        </TableCell>
        <TableCell>
          <Chip 
            label={auditoria.severidad} 
            size="small" 
            color={getSeveridadColor(auditoria.severidad)}
          />
        </TableCell>
        <TableCell>{auditoria.ip}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>ID:</strong> {auditoria.id}
                </Typography>
                {auditoria.userId && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>User ID:</strong> {auditoria.userId}
                  </Typography>
                )}
              </Box>
              {auditoria.detalles && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Información adicional:
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                      {JSON.stringify(auditoria.detalles, null, 2)}
                    </pre>
                  </Paper>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

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
        Error al cargar las auditorías: {error}
      </Alert>
    );
  } else {
    content = (
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
                <AuditoriaRow key={auditoria.id} auditoria={auditoria} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

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

        {/* Filtros */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Módulo"
                select
                value={filtros.modulo}
                onChange={(e) => handleFiltroChange('modulo', e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Auth">Auth</MenuItem>
                <MenuItem value="Productos">Productos</MenuItem>
                <MenuItem value="Ordenes">Ordenes</MenuItem>
                <MenuItem value="Usuarios">Usuarios</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Acción"
                value={filtros.accion}
                onChange={(e) => handleFiltroChange('accion', e.target.value)}
                placeholder="Buscar acción..."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Severidad"
                select
                value={filtros.severidad}
                onChange={(e) => handleFiltroChange('severidad', e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="BAJA">Baja</MenuItem>
                <MenuItem value="MEDIA">Media</MenuItem>
                <MenuItem value="ALTA">Alta</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                value={filtros.email}
                onChange={(e) => handleFiltroChange('email', e.target.value)}
                placeholder="Buscar usuario..."
              />
            </Grid>
          </Grid>
        </Box>

        {content}
      </Paper>
    </Container>
  );
}

export default Auditoria;
