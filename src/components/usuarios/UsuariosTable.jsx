import React, { useState } from 'react';
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
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import RoleBadge from './RoleBadge';
import StatusSwitch from './StatusSwitch';

// Mapeo de tipos de identificación
const TIPOS_IDENTIFICACION = {
  1: 'NIT',
  2: 'CC',
  3: 'CE'
};

/**
 * Componente reutilizable de tabla para usuarios
 * @param {Object} props
 * @param {Array} props.usuarios - Lista de usuarios
 * @param {string} props.status - Estado de carga (loading, succeeded, failed)
 * @param {string} props.error - Mensaje de error
 * @param {Function} props.onStatusChange - Callback cuando cambia el estado de un usuario
 * @param {boolean} props.updating - Si está actualizando
 * @returns {JSX.Element}
 */
const UsuariosTable = ({ 
  usuarios = [], 
  status = 'idle', 
  error = null,
  onStatusChange,
  updating = false
}) => {
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    usuario: null,
    nuevoEstado: false
  });

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
        Error al cargar los usuarios: {error}
      </Alert>
    );
  }

  const handleStatusToggle = (usuario) => {
    setConfirmDialog({
      open: true,
      usuario,
      nuevoEstado: !usuario.activo
    });
  };

  const handleConfirm = () => {
    if (confirmDialog.usuario && onStatusChange) {
      onStatusChange(confirmDialog.usuario.id, confirmDialog.nuevoEstado);
    }
    setConfirmDialog({ open: false, usuario: null, nuevoEstado: false });
  };

  const handleCancel = () => {
    setConfirmDialog({ open: false, usuario: null, nuevoEstado: false });
  };

  // Tabla de usuarios
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Tipo ID</TableCell>
              <TableCell>Identificación</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    No se encontraron usuarios
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              usuarios.map((usuario) => (
                <TableRow 
                  key={usuario.id}
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {usuario.email}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {usuario.id.slice(0, 8)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <RoleBadge rolId={usuario.rolId} />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={TIPOS_IDENTIFICACION[usuario.tipoIdentificacion] || 'N/A'} 
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{usuario.identificacion}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={usuario.activo ? 'Activo' : 'Inactivo'}
                      color={usuario.activo ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <StatusSwitch
                      checked={usuario.activo}
                      onChange={() => handleStatusToggle(usuario)}
                      disabled={updating}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog de confirmación */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCancel}
      >
        <DialogTitle>
          {confirmDialog.nuevoEstado ? 'Activar' : 'Desactivar'} Usuario
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea {confirmDialog.nuevoEstado ? 'activar' : 'desactivar'} 
            {' '}al usuario <strong>{confirmDialog.usuario?.email}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={updating}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm} 
            variant="contained"
            color={confirmDialog.nuevoEstado ? 'success' : 'error'}
            disabled={updating}
          >
            {updating ? <CircularProgress size={24} /> : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsuariosTable;
