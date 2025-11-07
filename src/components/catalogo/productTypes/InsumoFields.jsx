import React from 'react';
import PropTypes from 'prop-types';
import { 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Grid, 
  Box, 
  Typography,
  Stack,
  Chip 
} from '@mui/material';

/**
 * Componente para campos específicos de insumos médicos
 */
function InsumoFields({ 
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
              Material
            </Typography>
            <Typography variant="body2">
              {data.material || 'No especificado'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Condición
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip 
                label={data.esteril ? "Estéril" : "No estéril"} 
                color={data.esteril ? "success" : "default"}
                size="small"
              />
              <Chip 
                label={data.usoUnico ? "Uso único" : "Reutilizable"} 
                color={data.usoUnico ? "info" : "default"}
                size="small"
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    );
  }

  // Modo edición - para formularios
  return (
    <>
      <TextField
        name="insumoMedico.material"
        label="Material"
        value={data.material || ''}
        onChange={onChange}
        fullWidth
        required={required}
        margin="normal"
      />
      
      <FormControlLabel
        control={
          <Checkbox
            name="insumoMedico.esteril"
            checked={data.esteril || false}
            onChange={onChange}
          />
        }
        label="Estéril"
        sx={{ mt: 2 }}
      />
      
      <FormControlLabel
        control={
          <Checkbox
            name="insumoMedico.usoUnico"
            checked={data.usoUnico || false}
            onChange={onChange}
          />
        }
        label="Uso Único"
      />
    </>
  );
}

InsumoFields.propTypes = {
  data: PropTypes.shape({
    material: PropTypes.string,
    esteril: PropTypes.bool,
    usoUnico: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
};

export default InsumoFields;
