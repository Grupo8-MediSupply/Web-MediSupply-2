import React from 'react';
import PropTypes from 'prop-types';
import { 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Grid, 
  Box, 
  Typography,
  Chip 
} from '@mui/material';

/**
 * Componente para campos específicos de equipos médicos
 */
function EquipoFields({ 
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
              Marca
            </Typography>
            <Typography variant="body2">
              {data.marca || 'No especificado'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Modelo
            </Typography>
            <Typography variant="body2">
              {data.modelo || 'No especificado'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Vida Útil
            </Typography>
            <Typography variant="body2">
              {data.vidaUtil ? `${data.vidaUtil} años` : 'No especificado'}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Mantenimiento
            </Typography>
            <br />
            <Chip 
              label={data.requiereMantenimiento ? "Requiere" : "No requiere"} 
              color={data.requiereMantenimiento ? "warning" : "success"}
              size="small"
            />
          </Box>
        </Grid>
      </Grid>
    );
  }

  // Modo edición - para formularios
  return (
    <>
      <TextField
        name="equipoMedico.marca"
        label="Marca"
        value={data.marca || ''}
        onChange={onChange}
        fullWidth
        required={required}
        margin="normal"
      />
      
      <TextField
        name="equipoMedico.modelo"
        label="Modelo"
        value={data.modelo || ''}
        onChange={onChange}
        fullWidth
        required={required}
        margin="normal"
      />
      
      <TextField
        name="equipoMedico.vidaUtil"
        label="Vida Útil (años)"
        type="number"
        value={data.vidaUtil || ''}
        onChange={onChange}
        fullWidth
        required={required}
        margin="normal"
      />
      
      <FormControlLabel
        control={
          <Checkbox
            name="equipoMedico.requiereMantenimiento"
            checked={data.requiereMantenimiento || false}
            onChange={onChange}
          />
        }
        label="Requiere Mantenimiento"
        sx={{ mt: 2 }}
      />
    </>
  );
}

EquipoFields.propTypes = {
  data: PropTypes.shape({
    marca: PropTypes.string,
    modelo: PropTypes.string,
    vidaUtil: PropTypes.number,
    requiereMantenimiento: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool
};

export default EquipoFields;
