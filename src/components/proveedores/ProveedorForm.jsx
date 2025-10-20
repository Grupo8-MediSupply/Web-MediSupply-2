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
  FormHelperText,
  Grid,
  Typography
} from '@mui/material';
import { addProveedor, selectAddProveedorStatus, selectAddProveedorError, resetAddStatus } from '../../redux/features/proveedoresSlice';

// Lista de países disponibles
const PAISES = [
  { value: 'CO', label: 'Colombia' },
  { value: 'MX', label: 'México' },
  { value: 'PE', label: 'Perú' },
  { value: 'CL', label: 'Chile' },
  { value: 'AR', label: 'Argentina' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'BR', label: 'Brasil' }
];

const ProveedorForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const addStatus = useSelector(selectAddProveedorStatus);
  const addError = useSelector(selectAddProveedorError);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    pais: '',
    numeroIdentificacion: '',
    email: '',
    contactoPrincipal: {
      nombre: '',
      telefono: ''
    }
  });
  
  // Estado de errores de validación
  const [errors, setErrors] = useState({});
  
  // Reiniciar el formulario cuando se abre
  useEffect(() => {
    if (open) {
      setFormData({
        nombre: '',
        pais: '',
        numeroIdentificacion: '',
        email: '',
        contactoPrincipal: {
          nombre: '',
          telefono: ''
        }
      });
      setErrors({});
    }
  }, [open]);
  
  // Resetear el estado cuando se cierra
  useEffect(() => {
    if (!open && addStatus !== 'idle') {
      dispatch(resetAddStatus());
    }
  }, [open, addStatus, dispatch]);
  
  // Cierra el modal si el proveedor se agregó exitosamente
  useEffect(() => {
    if (addStatus === 'succeeded') {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [addStatus, onClose]);
  
  // Manejar cambios en los campos principales
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
  
  // Manejar cambios en los campos de contacto
  const handleContactoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contactoPrincipal: {
        ...formData.contactoPrincipal,
        [name]: value
      }
    });
    
    // Limpiar error al editar el campo
    if (errors[`contacto_${name}`]) {
      setErrors({
        ...errors,
        [`contacto_${name}`]: null
      });
    }
  };
  
  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del proveedor es obligatorio';
    }
    
    if (!formData.pais) {
      newErrors.pais = 'El país es obligatorio';
    }
    
    if (!formData.numeroIdentificacion.trim()) {
      newErrors.numeroIdentificacion = 'El número de identificación es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    // Validar campos de contacto principal
    if (!formData.contactoPrincipal.nombre.trim()) {
      newErrors.contacto_nombre = 'El nombre del contacto es obligatorio';
    }
    
    if (!formData.contactoPrincipal.telefono.trim()) {
      newErrors.contacto_telefono = 'El teléfono del contacto es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addProveedor(formData));
    }
  };
  
  return (
    <Dialog open={open} onClose={addStatus !== 'loading' ? onClose : undefined} maxWidth="md" fullWidth>
      <DialogTitle>Crear proveedor</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {addStatus === 'failed' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {addError || 'Error al agregar el proveedor. Por favor intente nuevamente.'}
            </Alert>
          )}
          
          {addStatus === 'succeeded' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Proveedor agregado exitosamente.
            </Alert>
          )}
          
          <Grid container spacing={2}>
            {/* Datos principales del proveedor */}
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  name="nombre"
                  label="Nombre del proveedor"
                  fullWidth
                  value={formData.nombre}
                  onChange={handleChange}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  disabled={addStatus === 'loading'}
                  margin="normal"
                />
                
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.pais}
                  disabled={addStatus === 'loading'}
                >
                  <InputLabel id="pais-label">País</InputLabel>
                  <Select
                    labelId="pais-label"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    label="País"
                  >
                    <MenuItem value=""><em>Seleccionar país</em></MenuItem>
                    {PAISES.map(pais => (
                      <MenuItem key={pais.value} value={pais.value}>
                        {pais.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.pais && <FormHelperText>{errors.pais}</FormHelperText>}
                </FormControl>
                
                <TextField
                  name="numeroIdentificacion"
                  label="Numero de identificación"
                  fullWidth
                  value={formData.numeroIdentificacion}
                  onChange={handleChange}
                  error={!!errors.numeroIdentificacion}
                  helperText={errors.numeroIdentificacion}
                  disabled={addStatus === 'loading'}
                  margin="normal"
                />
                
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={addStatus === 'loading'}
                  margin="normal"
                />
              </Box>
            </Grid>
            
            {/* Datos de contacto principal */}
            <Grid item xs={12} md={5}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Contacto principal
                </Typography>
                
                <TextField
                  name="nombre"
                  label="Nombre"
                  fullWidth
                  value={formData.contactoPrincipal.nombre}
                  onChange={handleContactoChange}
                  error={!!errors.contacto_nombre}
                  helperText={errors.contacto_nombre}
                  disabled={addStatus === 'loading'}
                  margin="normal"
                />
                
                <TextField
                  name="telefono"
                  label="Teléfono"
                  fullWidth
                  value={formData.contactoPrincipal.telefono}
                  onChange={handleContactoChange}
                  error={!!errors.contacto_telefono}
                  helperText={errors.contacto_telefono}
                  disabled={addStatus === 'loading'}
                  margin="normal"
                />
              </Box>
            </Grid>
          </Grid>
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
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProveedorForm;
