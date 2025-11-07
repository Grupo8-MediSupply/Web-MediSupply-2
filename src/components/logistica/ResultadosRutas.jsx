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
  ListItemText,
  Alert
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LocalShipping as TruckIcon,
  Timer as TimerIcon,
  Straighten as DistanceIcon,
  Navigation as NavigationIcon,
  Route as RouteIcon
} from '@mui/icons-material';
import MapaRutas from './MapaRutas';

function ResultadosRutas({ rutas, pedidos }) {
  const formatDistance = (meters) => {
    if (!meters && meters !== 0) return 'N/A';
    return (meters / 1000).toFixed(2) + ' km';
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const sec = typeof seconds === 'string' ? parseInt(seconds) : seconds;
    const mins = Math.floor(sec / 60);
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMins}min`;
    }
    return `${mins} min`;
  };

  const getManeuverLabel = (maneuver) => {
    const labels = {
      'DEPART': 'Salida',
      'STRAIGHT': 'Continuar recto',
      'TURN_LEFT': 'Gire a la izquierda',
      'TURN_RIGHT': 'Gire a la derecha',
      'TURN_SLIGHT_LEFT': 'Gire ligeramente a la izquierda',
      'TURN_SLIGHT_RIGHT': 'Gire ligeramente a la derecha',
      'MERGE': 'Incorporarse',
      'ROUNDABOUT_LEFT': 'Rotonda - izquierda',
      'ROUNDABOUT_RIGHT': 'Rotonda - derecha',
      'NAME_CHANGE': 'Continuar'
    };
    return labels[maneuver] || maneuver;
  };

  if (rutas.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mapa de rutas */}
      <MapaRutas rutas={rutas} pedidos={pedidos} />
      
      {/* Detalles de rutas (acordeón existente) */}
      <Paper elevation={2} sx={{ mt: 3 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RouteIcon />
            <Typography variant="h6" component="h2">
              Rutas Generadas
            </Typography>
          </Box>
          <Typography variant="caption">
            {rutas.length} ruta(s) optimizada(s) generadas con Google Routes API
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          {rutas.map((ruta, index) => (
            <Accordion key={ruta.rutaId || index} defaultExpanded={index === 0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`ruta-${index}-content`}
                id={`ruta-${index}-header`}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', flexWrap: 'wrap' }}>
                  <Chip
                    icon={<TruckIcon />}
                    label={ruta.vehiculoId.substring(0, 8)}
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
                  {/* Información básica */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Órdenes asignadas:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {ruta.ordenesIds.map((ordenId) => (
                        <Chip 
                          key={ordenId} 
                          label={ordenId.substring(0, 8)} 
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Indicaciones de navegación detalladas */}
                  {ruta.legs && ruta.legs.length > 0 && (
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NavigationIcon fontSize="small" />
                        Indicaciones de navegación detalladas:
                      </Typography>
                      
                      {ruta.legs.map((leg, legIndex) => (
                        <Box key={legIndex} sx={{ mb: 2 }}>
                          {leg.localizedValues && (
                            <Alert severity="info" sx={{ mb: 1 }}>
                              Tramo {legIndex + 1}: {leg.localizedValues.distance?.text || formatDistance(leg.distanceMeters)} • {leg.localizedValues.duration?.text || formatDuration(leg.duration?.seconds)}
                            </Alert>
                          )}
                          
                          {leg.steps && (
                            <List dense>
                              {leg.steps.map((step, stepIndex) => (
                                <ListItem key={stepIndex} sx={{ pl: 4 }}>
                                  <NavigationIcon 
                                    sx={{ mr: 2, color: 'action.active' }} 
                                    fontSize="small" 
                                  />
                                  <ListItemText
                                    primary={
                                      <Box>
                                        {step.navigationInstruction && (
                                          <Chip 
                                            label={getManeuverLabel(step.navigationInstruction.maneuver)}
                                            size="small"
                                            color="secondary"
                                            sx={{ mr: 1, mb: 0.5 }}
                                          />
                                        )}
                                        {step.navigationInstruction?.instructions || 'Continuar'}
                                      </Box>
                                    }
                                    secondary={
                                      step.localizedValues 
                                        ? `${step.localizedValues.distance?.text || formatDistance(step.distanceMeters)} • ${step.localizedValues.staticDuration?.text || formatDuration(step.staticDuration?.seconds)}`
                                        : `${formatDistance(step.distanceMeters)} • ${formatDuration(step.staticDuration?.seconds)}`
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </Box>
                      ))}
                    </Grid>
                  )}

                  {/* ID de la ruta */}
                  {ruta.rutaId && (
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="caption" color="text.secondary">
                        ID de ruta: {ruta.rutaId}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </>
  );
}

export default ResultadosRutas;
