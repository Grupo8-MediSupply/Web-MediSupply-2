import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  LinearProgress,
  Alert
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function CargaMasivaDialog({ open, onClose, onSubmit, loading }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          selectedFile.type === 'application/vnd.ms-excel' ||
          selectedFile.type === 'text/csv') {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Por favor, seleccione un archivo Excel o CSV válido');
      }
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit(file);
    } else {
      setError('Por favor, seleccione un archivo');
    }
  };

  const handleClose = () => {
    setFile(null);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Carga Masiva de Productos</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Seleccione un archivo Excel o CSV con la información de los productos a cargar.
        </Typography>
        
        <Box sx={{ mt: 3, mb: 2 }}>
          <input
            accept=".xlsx,.xls,.csv"
            style={{ display: 'none' }}
            id="upload-file"
            type="file"
            onChange={handleFileChange}
            disabled={loading}
          />
          <label htmlFor="upload-file">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadFileIcon />}
              disabled={loading}
            >
              Seleccionar archivo
            </Button>
          </label>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Archivo seleccionado: {file.name}
            </Typography>
          )}
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Typography variant="caption" color="text.secondary">
          El archivo debe contener las siguientes columnas: Nombre, Descripción, Precio, Categoría, 
          Proveedor, País, Stock, Cadena de frío, Normativa, Es insumo.
        </Typography>
        
        {loading && (
          <Box sx={{ width: '100%', mt: 3 }}>
            <LinearProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={!file || loading}
        >
          {loading ? 'Cargando...' : 'Cargar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CargaMasivaDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

CargaMasivaDialog.defaultProps = {
  loading: false
};

export default CargaMasivaDialog;
