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
  InputAdornment
} from '@mui/material';
import { 
  createPlanVenta, 
  selectCreateStatus, 
  selectCreateError,
  resetCreateStatus 
} from '../../redux/features/planesVentaSlice';
import { 
  fetchVendedores, 
  selectAllVendedores,
  selectVendedoresStatus 
} from '../../redux/features/vendedoresSlice';
import { fetchConfiguracion } from '../../redux/features/configuracionSlice';

const PlanVentaForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const createStatus = useSelector(selectCreateStatus);
  const createError = useSelector(selectCreateError);
  const vendedores = useSelector(selectAllVendedores);
  const vendedoresStatus = useSelector(selectVendedoresStatus);
  const configuracion = useSelector(state => state.configuracion);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    vendedorId: '',
    montoMeta: '',
    inicio: '',
    fin: '',
    descripcion: ''
  });
  
  // Estado de errores de validación
  const [errors, setErrors] = useState({});
  
  // Cargar configuración y vendedores si no están cargados
  useEffect(() => {
    const loadData = async () => {
      // Cargar configuración primero
      if (open && configuracion.status === 'idle') {
        await dispatch(fetchConfiguracion());
      }
      
      // Cargar vendedores después de tener la configuración
      if (open && vendedoresStatus === 'idle' && configuracion.status === 'succeeded') {
        dispatch(fetchVendedores());
      }
    };
    
    loadData();
  }, [open, vendedoresStatus, configuracion.status, dispatch]);
  
  // Reiniciar el formulario cuando se abre
  useEffect(() => {
    if (open) {
      setFormData({
        nombre: '',
        vendedorId: '',
        montoMeta: '',
        inicio: '',
        fin: '',
        descripcion: ''
      });
      setErrors({});
    }
  }, [open]);
  
  // Resetear el estado cuando se cierra
  useEffect(() => {
    if (!open && createStatus !== 'idle') {
      dispatch(resetCreateStatus());
    }
  }, [open, createStatus, dispatch]);
  
  // Cierra el modal si el plan se agregó exitosamente
  useEffect(() => {
    if (createStatus === 'succeeded') {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [createStatus, onClose]);
  
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
  
  // Convertir fecha de YYYY-MM-DD a DD/MM/YYYY
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };
  
  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.vendedorId) {
      newErrors.vendedorId = 'Debe seleccionar un vendedor';
    }
    
    if (!formData.montoMeta || formData.montoMeta <= 0) {
      newErrors.montoMeta = 'El monto meta debe ser mayor a 0';
    }
    
    if (!formData.inicio) {
      newErrors.inicio = 'La fecha de inicio es obligatoria';
    }
    
    if (!formData.fin) {
      newErrors.fin = 'La fecha de fin es obligatoria';
    }
    
    // Validar que fecha fin sea mayor a fecha inicio
    if (formData.inicio && formData.fin && formData.inicio >= formData.fin) {
      newErrors.fin = 'La fecha de fin debe ser posterior a la fecha de inicio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const planData = {
        nombre: formData.nombre,
        vendedorId: formData.vendedorId,
        montoMeta: Number(formData.montoMeta),
        inicio: formatDateForAPI(formData.inicio),
        fin: formatDateForAPI(formData.fin),
        descripcion: formData.descripcion
      };

      dispatch(createPlanVenta(planData));
    }
  };
  
  const isLoading = createStatus === 'loading' || vendedoresStatus === 'loading' || configuracion.status === 'loading';

  return (
    <Dialog open={open} onClose={!isLoading ? onClose : undefined} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nuevo Plan de Venta</DialogTitle>
        <DialogContent dividers>
          {createStatus === 'failed' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {createError || 'Error al crear el plan de venta. Por favor intente nuevamente.'}
            </Alert>
          )}
          
          {createStatus === 'succeeded' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Plan de venta creado exitosamente.
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              name="nombre"
              label="Nombre del Plan"
              fullWidth
              value={formData.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
              disabled={isLoading}
            />
            
            <FormControl
              fullWidth
              error={!!errors.vendedorId}
              disabled={isLoading || vendedoresStatus !== 'succeeded'}
            >
              <InputLabel>Vendedor</InputLabel>
              <Select
                name="vendedorId"
                value={formData.vendedorId}
                onChange={handleChange}
                label="Vendedor"
              >
                <MenuItem value="">
                  <em>Seleccione un vendedor</em>
                </MenuItem>
                {vendedores.map((vendedor) => (
                  <MenuItem key={vendedor.id} value={vendedor.id}>
                    {vendedor.nombre} - {vendedor.email}
                  </MenuItem>
                ))}
              </Select>
              {errors.vendedorId && (
                <FormHelperText>{errors.vendedorId}</FormHelperText>
              )}
              {vendedoresStatus === 'loading' && (
                <FormHelperText>Cargando vendedores...</FormHelperText>
              )}
              {vendedoresStatus === 'succeeded' && vendedores.length === 0 && (
                <FormHelperText>No hay vendedores disponibles en esta región</FormHelperText>
              )}
            </FormControl>
            
            <TextField
              name="montoMeta"
              label="Monto Meta"
              fullWidth
              type="number"
              value={formData.montoMeta}
              onChange={handleChange}
              error={!!errors.montoMeta}
              helperText={errors.montoMeta}
              disabled={isLoading}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
            
            <TextField
              name="inicio"
              label="Fecha de Inicio"
              fullWidth
              type="date"
              value={formData.inicio}
              onChange={handleChange}
              error={!!errors.inicio}
              helperText={errors.inicio}
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              name="fin"
              label="Fecha de Fin"
              fullWidth
              type="date"
              value={formData.fin}
              onChange={handleChange}
              error={!!errors.fin}
              helperText={errors.fin}
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              name="descripcion"
              label="Descripción"
              fullWidth
              multiline
              rows={3}
              value={formData.descripcion}
              onChange={handleChange}
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
            disabled={isLoading || vendedoresStatus !== 'succeeded' || vendedores.length === 0}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            Crear Plan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PlanVentaForm;
