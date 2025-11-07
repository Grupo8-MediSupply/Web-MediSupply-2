import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Box, Typography } from '@mui/material';

/**
 * Componente para campos específicos de medicamentos
 * Puede usarse tanto en formularios como en vistas de detalle
 */
function MedicamentoFields({ 
  data, 
  onChange, 
  readOnly = false,
  required = false 
}) {
  if (readOnly) {
    // Modo lectura - para vista de detalle
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Principio Activo
            </Typography>
            <Typography variant="body2">
              {data.principioActivo || 'No especificado'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Concentración
            </Typography>
            <Typography variant="body2">
              {data.concentracion || 'No especificado'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Forma Farmacéutica
            </Typography>
            <Typography variant="body2">
              {data.formaFarmaceutica || 'No especificado'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  // Modo edición - para formularios
  return (
    <>
      <TextField
        name="medicamento.principioActivo"
        label="Principio Activo"
        value={data.principioActivo || ''}
        onChange={onChange}
        fullWidth
        required={required}
        margin="normal"
      />
      
      <TextField
        name="medicamento.concentracion"
        label="Concentración"
        value={data.concentracion || ''}
        onChange={onChange}
        fullWidth
        required={required}
        margin="normal"
      />
      
      <TextField
        name="medicamento.formaFarmaceutica"
        label="Forma Farmacéutica"
        value={data.formaFarmaceutica || ''}
        onChange={onChange}
        fullWidth
        required={required}
        margin="normal"
      />
    </>
  );
}

MedicamentoFields.propTypes = {
  data: PropTypes.shape({
    principioActivo: PropTypes.string,
    concentracion: PropTypes.string,
    formaFarmaceutica: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
};

export default MedicamentoFields;
