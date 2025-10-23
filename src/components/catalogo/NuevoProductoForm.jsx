import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  InputAdornment
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCategorias, selectProveedores } from '../../redux/features/catalogoSlice';

const PAISES = [
  { code: 'CO', name: 'Colombia' },
  { code: 'MX', name: 'México' },
  { code: 'PE', name: 'Perú' },
  { code: 'CL', name: 'Chile' },
  { code: 'AR', name: 'Argentina' }
];

function NuevoProductoForm({ open, onClose }) {
  const categorias = useSelector(selectCategorias);
  const proveedores = useSelector(selectProveedores);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    proveedor: '',
    pais: '',
    stock: '',
    cadenaFrio: false,
    normativa: false,
    esInsumo: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica para guardar el producto
    console.log('Datos del producto a guardar:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Nuevo Producto</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Complete la información del producto
          </Typography>
          
          <Grid container spacing={2}>
            {/* Primera columna */}
            <Grid item xs={12} md={6}>
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
                name="precio"
                label="Precio"
                type="number"
                value={formData.precio}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  label="Categoría"
                >
                  {categorias.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Segunda columna */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Proveedor</InputLabel>
                <Select
                  name="proveedor"
                  value={formData.proveedor}
                  onChange={handleChange}
                  label="Proveedor"
                >
                  {proveedores.map(prov => (
                    <MenuItem key={prov} value={prov}>{prov}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal" required>
                <InputLabel>País</InputLabel>
                <Select
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  label="País"
                >
                  {PAISES.map(pais => (
                    <MenuItem key={pais.code} value={pais.code}>{pais.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                name="stock"
                label="Stock inicial"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
              />
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="cadenaFrio"
                        checked={formData.cadenaFrio}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Cadena de frío"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="normativa"
                        checked={formData.normativa}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Normativa"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="esInsumo"
                        checked={formData.esInsumo}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Es insumo"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

NuevoProductoForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NuevoProductoForm;
