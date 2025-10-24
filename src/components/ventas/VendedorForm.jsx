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
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { addVendedor, selectAddVendedorStatus, resetAddStatus } from '../../redux/features/vendedoresSlice';
import { 
  selectTiposIdentificacion, 
  selectConfigStatus,
  fetchConfiguracion
} from '../../redux/features/configuracionSlice';

const VendedorForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const addStatus = useSelector(selectAddVendedorStatus);
  const configStatus = useSelector(selectConfigStatus);
  const tiposIdentificacion = useSelector(selectTiposIdentificacion);

  useEffect(() => {
    if (open && configStatus === 'idle') {
      dispatch(fetchConfiguracion());
    }
  }, [open, configStatus, dispatch]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '', // Cambiado de correo a email para coincidir con API
    identificacion: '',
    tipoIdentificacion: ''
  });
  
  // Estado de errores de validación
  const [errors, setErrors] = useState({});
  
  // Reiniciar el formulario cuando se abre
  useEffect(() => {
    if (open) {
      setFormData({
        nombre: '',
        email: '',
        identificacion: '',
        tipoIdentificacion: ''
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

    if (!formData.identificacion.trim()) {
      newErrors.identificacion = 'La identificación es obligatoria';
    }

    if (!formData.tipoIdentificacion) {
      newErrors.tipoIdentificacion = 'El tipo de identificación es obligatorio';
    }
    
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
        email: formData.email,
        identificacion: formData.identificacion,
        tipoIdentificacion: Number(formData.tipoIdentificacion)
      };
      dispatch(addVendedor(vendedorData));
    }
  };
  
  const isLoading = addStatus === 'loading' || configStatus === 'loading';

  return (
    <Dialog open={open} onClose={!isLoading ? onClose : undefined} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nuevo Vendedor</DialogTitle>
        <DialogContent dividers>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          )}
          
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
              disabled={isLoading}
            />
            
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isLoading}
              type="email"
            />
            
            <FormControl
              fullWidth
              error={!!errors.tipoIdentificacion}
              disabled={isLoading || configStatus !== 'succeeded'}
            >
              <InputLabel>Tipo de Identificación</InputLabel>
              <Select
                name="tipoIdentificacion"
                value={formData.tipoIdentificacion}
                onChange={handleChange}
                label="Tipo de Identificación"
              >
                <MenuItem value="">
                  <em>Seleccione un tipo</em>
                </MenuItem>
                {tiposIdentificacion.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </MenuItem>
                ))}
              </Select>
              {errors.tipoIdentificacion && (
                <FormHelperText>{errors.tipoIdentificacion}</FormHelperText>
              )}
            </FormControl>
            
            <TextField
              name="identificacion"
              label="Número de Identificación"
              fullWidth
              value={formData.identificacion}
              onChange={handleChange}
              error={!!errors.identificacion}
              helperText={errors.identificacion}
              disabled={isLoading}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={onClose} 
            color="inherit" 
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isLoading || configStatus !== 'succeeded'}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            Aceptar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VendedorForm;
