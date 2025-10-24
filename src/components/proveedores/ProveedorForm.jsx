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
import { selectTiposIdentificacion, selectConfigStatus, fetchConfiguracion } from '../../redux/features/configuracionSlice';

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
  const configStatus = useSelector(selectConfigStatus);
  const tiposIdentificacion = useSelector(selectTiposIdentificacion);
  const addError = useSelector(selectAddProveedorError);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombreProveedor: '',
    numeroIdentificacion: '',
    tipoIdentificacion: '',
    pais: '',
    email: '',
    contactoPrincipal: '',
    telefonoContacto: ''
  });
  
  // Estado de errores de validación
  const [errors, setErrors] = useState({});
  
  // Reiniciar el formulario cuando se abre
  useEffect(() => {
    if (open) {
      setFormData({
        nombreProveedor: '',
        numeroIdentificacion: '',
        tipoIdentificacion: '',
        pais: '',
        email: '',
        contactoPrincipal: '',
        telefonoContacto: ''
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
  
  // Fetch configuracion on open
  useEffect(() => {
    if (open && configStatus === 'idle') {
      dispatch(fetchConfiguracion());
    }
  }, [open, configStatus, dispatch]);
  
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
  
  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombreProveedor.trim()) {
      newErrors.nombreProveedor = 'El nombre del proveedor es obligatorio';
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
    if (!formData.contactoPrincipal.trim()) {
      newErrors.contactoPrincipal = 'El nombre del contacto es obligatorio';
    }
    
    if (!formData.telefonoContacto.trim()) {
      newErrors.telefonoContacto = 'El teléfono del contacto es obligatorio';
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
      dispatch(addProveedor(formData)); // Ya no necesita transformación
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
                  name="nombreProveedor"
                  label="Nombre del proveedor"
                  fullWidth
                  value={formData.nombreProveedor}
                  onChange={handleChange}
                  error={!!errors.nombreProveedor}
                  helperText={errors.nombreProveedor}
                  disabled={addStatus === 'loading'}
                  margin="normal"
                />
                
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.tipoIdentificacion}
                  disabled={addStatus === 'loading' || configStatus !== 'succeeded'}
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
              </Box>
            </Grid>
            
            {/* Datos de contacto principal */}
            <Grid item xs={12} md={5}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Contacto principal
                </Typography>
                
                <TextField
                  name="contactoPrincipal"
                  label="Nombre del contacto"
                  fullWidth
                  value={formData.contactoPrincipal}
                  onChange={handleChange}
                  error={!!errors.contactoPrincipal}
                  helperText={errors.contactoPrincipal}
                  disabled={addStatus === 'loading'}
                  margin="normal"
                />
                
                <TextField
                  name="telefonoContacto"
                  label="Teléfono de contacto"
                  fullWidth
                  value={formData.telefonoContacto}
                  onChange={handleChange}
                  error={!!errors.telefonoContacto}
                  helperText={errors.telefonoContacto}
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
