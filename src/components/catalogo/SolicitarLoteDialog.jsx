import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import {
  solicitarLote,
  selectSolicitarLoteStatus,
  selectSolicitarLoteError,
  selectProductosSeleccionados,
  updateCantidadSeleccionada,
  toggleProductoSeleccionado,
  clearProductosSeleccionados,
  resetSolicitarLoteStatus
} from '../../redux/features/catalogoSlice';

const SolicitarLoteDialog = ({ open, onClose, productosDisponibles }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectSolicitarLoteStatus);
  const error = useSelector(selectSolicitarLoteError);
  const productosSeleccionados = useSelector(selectProductosSeleccionados);

  const [productoAgregar, setProductoAgregar] = useState('');

  useEffect(() => {
    if (status === 'succeeded') {
      setTimeout(() => {
        onClose();
        dispatch(resetSolicitarLoteStatus());
      }, 1500);
    }
  }, [status, onClose, dispatch]);

  const handleAgregarProducto = () => {
    if (productoAgregar) {
      dispatch(toggleProductoSeleccionado(productoAgregar));
      setProductoAgregar('');
    }
  };

  const handleEliminarProducto = (productoId) => {
    dispatch(toggleProductoSeleccionado(productoId));
  };

  const handleCantidadChange = (productoId, cantidad) => {
    const cantidadNum = parseInt(cantidad, 10);
    if (cantidadNum > 0) {
      dispatch(updateCantidadSeleccionada({ productoId, cantidad: cantidadNum }));
    }
  };

  const handleSolicitar = () => {
    if (productosSeleccionados.length === 0) {
      return;
    }

    // Preparar datos para enviar al backend
    const loteData = productosSeleccionados.map(p => ({
      sku: p.sku,
      cantidad: p.cantidad
    }));

    dispatch(solicitarLote(loteData));
  };

  const handleClose = () => {
    if (status !== 'loading') {
      dispatch(clearProductosSeleccionados());
      dispatch(resetSolicitarLoteStatus());
      onClose();
    }
  };

  // Filtrar productos que no están seleccionados
  const productosNoSeleccionados = productosDisponibles.filter(
    p => !productosSeleccionados.some(ps => ps.productoRegionalId === p.productoRegionalId)
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Solicitar lote de productos</DialogTitle>
      <DialogContent dividers>
        {status === 'failed' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'Error al solicitar el lote'}
          </Alert>
        )}

        {status === 'succeeded' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Solicitud de lote enviada correctamente
          </Alert>
        )}

        {/* Selector de productos */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <FormControl fullWidth disabled={status === 'loading'}>
            <InputLabel id="producto-select-label">Seleccionar producto</InputLabel>
            <Select
              labelId="producto-select-label"
              id="producto-select"
              value={productoAgregar}
              onChange={(e) => setProductoAgregar(e.target.value)}
              label="Seleccionar producto"
            >
              <MenuItem value="">
                <em>-- Seleccione un producto --</em>
              </MenuItem>
              {productosNoSeleccionados.map(producto => (
                <MenuItem key={producto.productoRegionalId} value={producto.productoRegionalId}>
                  {producto.nombre} ({producto.sku})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAgregarProducto}
            disabled={!productoAgregar || status === 'loading'}
            sx={{ minWidth: '120px' }}
          >
            Agregar
          </Button>
        </Box>

        {/* Tabla de productos seleccionados */}
        {productosSeleccionados.length > 0 ? (
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell width={150}>Cantidad</TableCell>
                  <TableCell width={80} align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosSeleccionados.map(producto => (
                  <TableRow key={producto.productoRegionalId}>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.sku}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        value={producto.cantidad}
                        onChange={(e) => handleCantidadChange(producto.productoRegionalId, e.target.value)}
                        inputProps={{ min: 1 }}
                        disabled={status === 'loading'}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleEliminarProducto(producto.productoRegionalId)}
                        disabled={status === 'loading'}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              No hay productos seleccionados. Agregue productos para solicitar el lote.
            </Typography>
          </Box>
        )}

        {/* Resumen */}
        {productosSeleccionados.length > 0 && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Total de productos: <strong>{productosSeleccionados.length}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de unidades: <strong>
                {productosSeleccionados.reduce((sum, p) => sum + p.cantidad, 0)}
              </strong>
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={status === 'loading'}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSolicitar}
          disabled={productosSeleccionados.length === 0 || status === 'loading'}
          startIcon={status === 'loading' ? <CircularProgress size={20} /> : null}
        >
          Solicitar lote
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SolicitarLoteDialog;
