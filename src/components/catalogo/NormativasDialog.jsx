import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function NormativasDialog({ open, onClose, onCargar, loading }) {
  const normativas = [
    { id: 1, nombre: 'ISO 13485 - Dispositivos médicos', descripcion: 'Sistema de gestión de calidad para dispositivos médicos' },
    { id: 2, nombre: 'USP <797> - Preparaciones estériles', descripcion: 'Estándar para la preparación de medicamentos estériles' },
    { id: 3, nombre: 'ISO 15189 - Laboratorios clínicos', descripcion: 'Requisitos para la calidad y competencia en laboratorios' },
    { id: 4, nombre: 'BPM - Buenas Prácticas de Manufactura', descripcion: 'Normas para la fabricación de medicamentos' },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Normativas Aplicables</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Las siguientes normativas son aplicables a los productos del catálogo. 
          Puede descargar los documentos o cargar las normativas en el sistema.
        </Typography>
        
        <List sx={{ mt: 2 }}>
          {normativas.map((normativa, index) => (
            <React.Fragment key={normativa.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={normativa.nombre}
                  secondary={normativa.descripcion}
                />
                <Button 
                  variant="outlined" 
                  size="small"
                  startIcon={<CloudDownloadIcon />}
                >
                  Descargar
                </Button>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cerrar</Button>
        <Button 
          variant="contained" 
          onClick={onCargar}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cargar Normativas'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NormativasDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCargar: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

NormativasDialog.defaultProps = {
  loading: false
};

export default NormativasDialog;
