import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocalShipping as TruckIcon,
  Timer as TimerIcon,
  Straighten as DistanceIcon,
  Navigation as NavigationIcon
} from '@mui/icons-material';

function ResultadosRutas({ rutas }) {
  const formatDistance = (meters) => {
    return (meters / 1000).toFixed(2) + ' km';
  };

  const formatDuration = (seconds) => {
    const sec = parseInt(seconds.replace('s', ''));
    const mins = Math.floor(sec / 60);
    return `${mins} min`;
  };

  if (rutas.length === 0) {
    return null;
  }

  return (
    <Paper elevation={2} sx={{ mt: 3 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2">
          Rutas Generadas
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {rutas.length} ruta(s) optimizada(s)
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        {rutas.map((ruta, index) => (
          <Accordion key={ruta.vehiculoId} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`ruta-${index}-content`}
              id={`ruta-${index}-header`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Chip
                  icon={<TruckIcon />}
                  label={ruta.vehiculoId}
                  color="primary"
                  size="small"
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {ruta.ordenesIds.length} pedido(s)
                </Typography>
                <Chip
                  icon={<DistanceIcon />}
                  label={formatDistance(ruta.distancia)}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  icon={<TimerIcon />}
                  label={formatDuration(ruta.duracion)}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Órdenes asignadas:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {ruta.ordenesIds.map((ordenId) => (
                      <Chip key={ordenId} label={ordenId} size="small" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Indicaciones de navegación:
                  </Typography>
                  {ruta.legs.map((leg, legIndex) => (
                    <List key={legIndex} dense>
                      {leg.steps.map((step, stepIndex) => (
                        <ListItem key={stepIndex}>
                          <NavigationIcon sx={{ mr: 2, color: 'action.active' }} fontSize="small" />
                          <ListItemText
                            primary={step.navigationInstruction}
                            secondary={`${formatDistance(step.distanceMeters)} - ${formatDuration(step.duration)}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
}

export default ResultadosRutas;
