import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { addVendedor, selectAddVendedorStatus, resetAddStatus } from '../../redux/features/vendedoresSlice';

const VendedorForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const addStatus = useSelector(selectAddVendedorStatus);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '', // Cambiado de correo a email para coincidir con API
    supervisor: ''
  });
  
  // Estado de errores de validación
  const [errors, setErrors] = useState({});
  
  // Reiniciar el formulario cuando se abre
  useEffect(() => {
    if (open) {
      setFormData({
        nombre: '',
        email: '',
        supervisor: ''
      });
      setErrors({});
    }
  }, [open]);
  
  // Resetear el estado cuando se cierra
  useEffect(() => {
    if (!open && addStatus === 'succeeded') {
      dispatch(resetAddStatus());
    }
  }, [open, addStatus, dispatch]);
  
  // Cierra el modal si el vendedor se agregó exitosamente
  useEffect(() => {
    if (addStatus === 'succeeded') {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [addStatus, onClose]);
  
  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error al editar el campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    // Supervisor puede ser opcional
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Enviar solo los campos requeridos por la API
      const vendedorData = {
        nombre: formData.nombre,
        email: formData.email
      };
      dispatch(addVendedor(vendedorData));
    }
  };
  
  return (
    <Dialog open={open} onClose={addStatus !== 'loading' ? onClose : undefined} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nuevo Vendedor</DialogTitle>
        <DialogContent dividers>
          {addStatus === 'failed' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error al agregar el vendedor. Por favor intente nuevamente.
            </Alert>
          )}
          
          {addStatus === 'succeeded' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Vendedor agregado exitosamente.
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              name="nombre"
              label="Nombre"
              fullWidth
              value={formData.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
              disabled={addStatus === 'loading'}
            />
            
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={addStatus === 'loading'}
              type="email"
            />
            
            <TextField
              name="supervisor"
              label="Supervisor (opcional)"
              fullWidth
              value={formData.supervisor}
              onChange={handleChange}
              disabled={addStatus === 'loading'}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={onClose} 
            color="inherit" 
            disabled={addStatus === 'loading'}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={addStatus === 'loading'}
            startIcon={addStatus === 'loading' ? <CircularProgress size={20} /> : null}
          >
            Aceptar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VendedorForm;
