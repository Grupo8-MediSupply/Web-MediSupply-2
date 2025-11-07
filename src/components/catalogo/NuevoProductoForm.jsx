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
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createProducto, 
  updateProducto, 
  selectCreateStatus, 
  selectUpdateStatus,
  selectUpdateError 
} from '../../redux/features/catalogoSlice';
import { MedicamentoFields, InsumoFields, EquipoFields } from './productTypes';

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
    tipo: 'MEDICAMENTO',
    precioVenta: '',
    medicamento: {
      principioActivo: '',
      concentracion: '',
      formaFarmaceutica: ''
    },
    insumoMedico: {
      material: '',
      esteril: false,
      usoUnico: false
    },
    equipoMedico: {
      marca: '',
      modelo: '',
      vidaUtil: '',
      requiereMantenimiento: false
    },
    proveedorId: '18c1a721-39f6-4f55-9b83-51cee9cfb96e'
  });

  // Cargar datos del producto cuando es modo edición
  useEffect(() => {
    if (producto) {
      console.log('Datos recibidos en el formulario:', producto);
      
      const newFormData = {
        sku: producto.sku || '',
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        tipo: producto.tipo || 'MEDICAMENTO',
        precioVenta: producto.precioVenta || producto.precio || '',
        medicamento: producto.medicamento || {
          principioActivo: '',
          concentracion: '',
          formaFarmaceutica: ''
        },
        insumoMedico: producto.insumoMedico || {
          material: '',
          esteril: false,
          usoUnico: false
        },
        equipoMedico: producto.equipoMedico || {
          marca: '',
          modelo: '',
          vidaUtil: '',
          requiereMantenimiento: false
        },
        proveedorId: producto.proveedorId || producto.proveedor?.id || 
                    '18c1a721-39f6-4f55-9b83-51cee9cfb96e'
      };

      console.log('Nuevo estado del formulario:', newFormData);
      setFormData(newFormData);
    } else {
      // Reset form when opening for new product
      setFormData({
        sku: '',
        nombre: '',
        descripcion: '',
        tipo: 'MEDICAMENTO',
        precioVenta: '',
        medicamento: {
          principioActivo: '',
          concentracion: '',
          formaFarmaceutica: ''
        },
        insumoMedico: {
          material: '',
          esteril: false,
          usoUnico: false
        },
        equipoMedico: {
          marca: '',
          modelo: '',
          vidaUtil: '',
          requiereMantenimiento: false
        },
        proveedorId: '18c1a721-39f6-4f55-9b83-51cee9cfb96e'
      });
    }
  }, [producto, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNestedChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [field, subfield] = name.split('.');
    
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [subfield]: type === 'checkbox' ? checked : value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    
    // Construir el payload solo con los campos del tipo seleccionado
    const basePayload = {
      sku: formData.sku,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      tipo: formData.tipo,
      precioVenta: Number(formData.precioVenta),
      proveedorId: formData.proveedorId
    };

    // Agregar solo el objeto específico del tipo
    if (formData.tipo === 'MEDICAMENTO') {
      basePayload.medicamento = formData.medicamento;
    } else if (formData.tipo === 'INSUMO') {
      basePayload.insumoMedico = {
        ...formData.insumoMedico,
        esteril: Boolean(formData.insumoMedico.esteril),
        usoUnico: Boolean(formData.insumoMedico.usoUnico)
      };
    } else if (formData.tipo === 'EQUIPO') {
      basePayload.equipoMedico = {
        ...formData.equipoMedico,
        vidaUtil: Number(formData.equipoMedico.vidaUtil),
        requiereMantenimiento: Boolean(formData.equipoMedico.requiereMantenimiento)
      };
    }

    console.log('Payload a enviar:', basePayload);
    
    if (isEditing) {
      response = await dispatch(updateProducto({ 
        id: producto.productoRegionalId, 
        productoData: basePayload
      }));
    } else {
      response = await dispatch(createProducto(basePayload));
    }
    
    if (response.meta.requestStatus === 'fulfilled') {
      onClose();
    }
  };

  const status = isEditing ? updateStatus : createStatus;
  const isLoading = status === 'loading';

  // Renderizar campos según el tipo seleccionado
  const renderTipoEspecificoFields = () => {
    const commonProps = {
      onChange: handleNestedChange,
      readOnly: false,
      required: true
    };

    switch (formData.tipo) {
      case 'MEDICAMENTO':
        return <MedicamentoFields data={formData.medicamento} {...commonProps} />;
      
      case 'INSUMO':
        return <InsumoFields data={formData.insumoMedico} {...commonProps} />;
      
      case 'EQUIPO':
        return <EquipoFields data={formData.equipoMedico} {...commonProps} />;
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {isEditing ? 'Edite la información del producto' : 'Complete la información del producto'}
          </Typography>
          
          <Grid container spacing={2}>
            {/* Primera columna - Información básica */}
            <Grid item xs={12} md={6}>
              <TextField
                name="sku"
                label="SKU"
                value={formData.sku}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                disabled={isEditing} // SKU no editable
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
              
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Tipo de Producto</InputLabel>
                <Select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  label="Tipo de Producto"
                  disabled={isEditing} // Tipo no editable en modo edición
                >
                  <MenuItem value="MEDICAMENTO">Medicamento</MenuItem>
                  <MenuItem value="INSUMO">Insumo Médico</MenuItem>
                  <MenuItem value="EQUIPO">Equipo Médico</MenuItem>
                </Select>
              </FormControl>
              
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
            
            {/* Segunda columna - Campos específicos del tipo */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                {formData.tipo === 'MEDICAMENTO' && 'Información del Medicamento'}
                {formData.tipo === 'INSUMO' && 'Información del Insumo'}
                {formData.tipo === 'EQUIPO' && 'Información del Equipo'}
              </Typography>
              
              {renderTipoEspecificoFields()}
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
