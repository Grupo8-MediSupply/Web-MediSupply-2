import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  InputAdornment
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createProducto, 
  updateProducto, 
  selectCreateStatus, 
  selectUpdateStatus,
  selectUpdateError 
} from '../../redux/features/catalogoSlice';

function NuevoProductoForm({ open, onClose, producto }) {
  const dispatch = useDispatch();
  const createStatus = useSelector(selectCreateStatus);
  const updateStatus = useSelector(selectUpdateStatus);
  const updateError = useSelector(selectUpdateError);
  const isEditing = !!producto;
  
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    descripcion: '',
    tipo: 'medicamento',
    precioVenta: '',
    medicamento: {
      principioActivo: '',
      concentracion: '',
      formaFarmaceutica: ''
    },
    proveedorId: '18c1a721-39f6-4f55-9b83-51cee9cfb96e'
  });

  // Cargar datos del producto cuando es modo edición
  useEffect(() => {
    if (producto) {
      setFormData({
        sku: producto.sku || '',
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        tipo: producto.tipo || 'medicamento',
        precioVenta: producto.precio || '',
        medicamento: {
          principioActivo: producto.medicamento?.principioActivo || '',
          concentracion: producto.medicamento?.concentracion || '',
          formaFarmaceutica: producto.medicamento?.formaFarmaceutica || ''
        },
        proveedorId: producto.proveedorId || '18c1a721-39f6-4f55-9b83-51cee9cfb96e'
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split('.');
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [subfield]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    
    if (isEditing) {
      response = await dispatch(updateProducto({ 
        id: producto.productoRegionalId, 
        productoData: formData 
      }));
    } else {
      response = await dispatch(createProducto(formData));
    }
    
    if (response.meta.requestStatus === 'fulfilled') {
      onClose();
    }
  };

  const status = isEditing ? updateStatus : createStatus;
  const isLoading = status === 'loading';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {isEditing ? 'Edite la información del producto' : 'Complete la información del producto'}
          </Typography>
          
          <Grid container spacing={2}>
            {/* Primera columna */}
            <Grid item xs={12} md={6}>
              <TextField
                name="sku"
                label="SKU"
                value={formData.sku}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              
              <TextField
                name="nombre"
                label="Nombre del producto"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              
              <TextField
                name="descripcion"
                label="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
              
              <TextField
                name="precioVenta"
                label="Precio de venta"
                type="number"
                value={formData.precioVenta}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            
            {/* Segunda columna */}
            <Grid item xs={12} md={6}>
              <TextField
                name="medicamento.principioActivo"
                label="Principio Activo"
                value={formData.medicamento.principioActivo}
                onChange={handleNestedChange}
                fullWidth
                required
                margin="normal"
              />
              
              <TextField
                name="medicamento.concentracion"
                label="Concentración"
                value={formData.medicamento.concentracion}
                onChange={handleNestedChange}
                fullWidth
                required
                margin="normal"
              />
              
              <TextField
                name="medicamento.formaFarmaceutica"
                label="Forma Farmacéutica"
                value={formData.medicamento.formaFarmaceutica}
                onChange={handleNestedChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

NuevoProductoForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  producto: PropTypes.object
};

export default NuevoProductoForm;
