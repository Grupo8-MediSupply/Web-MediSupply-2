import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { 
  Box, 
  Paper, 
  Typography, 
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Link
} from '@mui/material';
import {
  LocalShipping as TruckIcon,
  Warehouse as WarehouseIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const containerStyle = {
  width: '100%',
  height: '600px'
};

// Centro de Colombia (Bogotá aproximadamente)
const defaultCenter = {
  lat: 4.6097,
  lng: -74.0817
};

const decodePolyline = (encoded) => {
  if (!encoded) {
    console.warn('Polyline vacía o undefined');
    return [];
  }
  
  try {
    const poly = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      poly.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    
    console.log('Polyline decodificada:', { 
      encoded: encoded.substring(0, 50) + '...', 
      pointsCount: poly.length,
      firstPoint: poly[0],
      lastPoint: poly[poly.length - 1]
    });
    
    return poly;
  } catch (error) {
    console.error('Error decodificando polyline:', error);
    return [];
  }
};

function MapaRutas({ rutas, pedidos }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Log para debugging
  useEffect(() => {
    console.log('MapaRutas - Props recibidas:', {
      rutasCount: rutas?.length,
      pedidosCount: pedidos?.length,
      rutas: rutas,
      pedidos: pedidos
    });
  }, [rutas, pedidos]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    libraries: ['places'] // Opcional: agregar librerías adicionales si las necesitas
  });

  // Procesar todas las ubicaciones para calcular bounds
  const allLocations = useMemo(() => {
    const locations = [];
    
    pedidos.forEach(pedido => {
      // Ubicación del vehículo
      if (pedido.vehiculoAsignado?.ubicacionGeografica) {
        locations.push({
          ...pedido.vehiculoAsignado.ubicacionGeografica,
          type: 'vehiculo',
          label: pedido.vehiculoAsignado.placa,
          pedidoId: pedido.orden.id
        });
      }
      
      // Bodegas origen
      if (pedido.orden?.bodegasOrigen) {
        pedido.orden.bodegasOrigen.forEach((bodega, idx) => {
          if (bodega.ubicacion) {
            locations.push({
              ...bodega.ubicacion,
              type: 'bodega',
              label: `Bodega ${idx + 1}`,
              pedidoId: pedido.orden.id
            });
          }
        });
      }
      
      // Cliente destino
      if (pedido.orden?.cliente?.ubicacion) {
        locations.push({
          ...pedido.orden.cliente.ubicacion,
          type: 'cliente',
          label: pedido.orden.cliente.nombre,
          pedidoId: pedido.orden.id
        });
      }
    });
    
    return locations;
  }, [pedidos]);

  // Calcular el centro y zoom basado en las ubicaciones
  const mapCenter = useMemo(() => {
    if (allLocations.length === 0) return defaultCenter;
    
    const avgLat = allLocations.reduce((sum, loc) => sum + loc.lat, 0) / allLocations.length;
    const avgLng = allLocations.reduce((sum, loc) => sum + loc.lng, 0) / allLocations.length;
    
    return { lat: avgLat, lng: avgLng };
  }, [allLocations]);

  // Ajustar bounds cuando el mapa se carga
  const onLoad = useCallback((map) => {
    if (allLocations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      allLocations.forEach(location => {
        bounds.extend(new window.google.maps.LatLng(location.lat, location.lng));
      });
      map.fitBounds(bounds);
    }
    setMap(map);
  }, [allLocations]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Procesar polylines de las rutas - VERSIÓN MEJORADA
  const polylines = useMemo(() => {
    console.log('Procesando polylines...');
    const lines = [];
    const colors = ['#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2'];
    
    if (!rutas || rutas.length === 0) {
      console.warn('No hay rutas para procesar');
      return lines;
    }
    
    rutas.forEach((ruta, index) => {
      const color = colors[index % colors.length];
      console.log(`Procesando ruta ${index}:`, {
        rutaId: ruta.rutaId,
        vehiculoId: ruta.vehiculoId,
        tienePolilinea: !!ruta.polilinea,
        polilineaLength: ruta.polilinea?.length,
        tieneLegs: !!ruta.legs,
        legsCount: ruta.legs?.length
      });
      
      // PRIORIDAD 1: Intentar usar polylines de los legs (más detalladas)
      if (ruta.legs && ruta.legs.length > 0) {
        console.log(`Ruta ${index} tiene ${ruta.legs.length} leg(s)`);
        
        ruta.legs.forEach((leg, legIdx) => {
          console.log(`  Leg ${legIdx}:`, {
            tienePolyline: !!leg.polyline,
            encodedPolyline: leg.polyline?.encodedPolyline?.substring(0, 50)
          });
          
          if (leg.polyline?.encodedPolyline) {
            const path = decodePolyline(leg.polyline.encodedPolyline);
            
            if (path.length > 1) {
              console.log(`    ✓ Leg ${legIdx} decodificado: ${path.length} puntos`);
              lines.push({
                rutaId: `${ruta.rutaId}-leg-${legIdx}`,
                vehiculoId: ruta.vehiculoId,
                path,
                color,
                weight: 4,
                opacity: 0.8
              });
            } else {
              console.warn(`    ✗ Leg ${legIdx} no tiene suficientes puntos`);
            }
          }
          
          // También intentar con steps
          if (leg.steps && leg.steps.length > 0) {
            leg.steps.forEach((step, stepIdx) => {
              if (step.polyline?.encodedPolyline) {
                const path = decodePolyline(step.polyline.encodedPolyline);
                
                if (path.length > 1) {
                  console.log(`    ✓ Step ${stepIdx} decodificado: ${path.length} puntos`);
                  lines.push({
                    rutaId: `${ruta.rutaId}-step-${stepIdx}`,
                    vehiculoId: ruta.vehiculoId,
                    path,
                    color,
                    weight: 3,
                    opacity: 0.6
                  });
                }
              }
            });
          }
        });
      }
      
      // PRIORIDAD 2: Polyline principal de la ruta
      if (ruta.polilinea && ruta.polilinea.length > 10) {
        console.log(`Ruta ${index} tiene polyline principal`);
        const path = decodePolyline(ruta.polilinea);
        
        if (path.length > 1) {
          console.log(`  ✓ Polyline principal decodificada: ${path.length} puntos`);
          lines.push({
            rutaId: ruta.rutaId,
            vehiculoId: ruta.vehiculoId,
            path,
            color,
            weight: 4,
            opacity: 0.9
          });
        }
      }
      
      // FALLBACK: Si no hay polylines, crear línea directa entre ubicaciones
      if (lines.length === 0 || lines.filter(l => l.rutaId.includes(ruta.rutaId)).length === 0) {
        console.warn(`Ruta ${index} no tiene polylines válidas, creando línea directa`);
        const directPath = [];
        
        // Buscar el pedido correspondiente
        const pedido = pedidos.find(p => ruta.ordenesIds.includes(p.orden.id));
        
        if (pedido) {
          // Vehículo -> Bodega -> Cliente
          if (pedido.vehiculoAsignado?.ubicacionGeografica) {
            directPath.push(pedido.vehiculoAsignado.ubicacionGeografica);
          }
          
          if (pedido.orden?.bodegasOrigen?.[0]?.ubicacion) {
            directPath.push(pedido.orden.bodegasOrigen[0].ubicacion);
          }
          
          if (pedido.orden?.cliente?.ubicacion) {
            directPath.push(pedido.orden.cliente.ubicacion);
          }
          
          if (directPath.length >= 2) {
            console.log(`  ✓ Línea directa creada con ${directPath.length} puntos`);
            lines.push({
              rutaId: `${ruta.rutaId}-direct`,
              vehiculoId: ruta.vehiculoId,
              path: directPath,
              color,
              weight: 3,
              opacity: 0.5,
              geodesic: true
            });
          }
        }
      }
    });
    
    console.log(`Total de polylines procesadas: ${lines.length}`, lines);
    return lines;
  }, [rutas, pedidos]);

  // Íconos personalizados para cada tipo de marcador
  const getMarkerIcon = (type) => {
    const icons = {
      vehiculo: {
        path: window.google?.maps?.SymbolPath?.CIRCLE,
        fillColor: '#2196F3',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
        scale: 8
      },
      bodega: {
        path: window.google?.maps?.SymbolPath?.BACKWARD_CLOSED_ARROW,
        fillColor: '#FF9800',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
        scale: 6
      },
      cliente: {
        path: window.google?.maps?.SymbolPath?.BACKWARD_CLOSED_ARROW,
        fillColor: '#4CAF50',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
        scale: 6
      }
    };
    return icons[type];
  };

  // Validación de API Key
  if (!apiKey || apiKey === '' || apiKey === 'tu_api_key_aqui') {
    return (
      <Paper elevation={2} sx={{ mt: 3, p: 3 }}>
        <Alert 
          severity="warning" 
          icon={<WarningIcon />}
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Google Maps API Key no configurada
          </Typography>
          <Typography variant="body2" paragraph>
            Para visualizar el mapa de rutas, necesitas configurar una API Key de Google Maps.
          </Typography>
          <Typography variant="body2" component="div">
            Pasos:
            <ol style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Ve a <Link href="https://console.cloud.google.com/" target="_blank" rel="noopener">Google Cloud Console</Link></li>
              <li>Crea un proyecto o selecciona uno existente</li>
              <li>Habilita "Maps JavaScript API" y "Routes API"</li>
              <li>Crea una API Key en "Credenciales"</li>
              <li>Agrega <code>VITE_GOOGLE_MAPS_API_KEY=tu_api_key</code> en tu archivo <code>.env.local</code></li>
              <li>Reinicia el servidor de desarrollo</li>
            </ol>
          </Typography>
        </Alert>
        <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
          <Typography variant="caption" component="div" sx={{ fontFamily: 'monospace' }}>
            # Archivo: .env.local<br/>
            VITE_GOOGLE_MAPS_API_KEY=AIzaSyA...tu_api_key_aqui
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (loadError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Error al cargar Google Maps
        </Typography>
        <Typography variant="body2">
          {loadError.message || 'Verifica que la API key sea válida y que las APIs necesarias estén habilitadas.'}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Más información: <Link href="https://developers.google.com/maps/documentation/javascript/error-messages" target="_blank" rel="noopener">
            Error Messages
          </Link>
        </Typography>
      </Alert>
    );
  }

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, minHeight: 200 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Cargando Google Maps...
        </Typography>
      </Box>
    );
  }

  if (rutas.length === 0) {
    return null;
  }

  return (
    <Paper elevation={2} sx={{ mt: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" component="h3">
          Visualización de Rutas en Mapa
        </Typography>
        <Typography variant="caption">
          {rutas.length} ruta(s) • {allLocations.length} ubicación(es) • {polylines.length} línea(s)
        </Typography>
      </Box>
      
      {/* Leyenda */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Chip 
            icon={<TruckIcon />} 
            label="Vehículo (Inicio)" 
            size="small"
            sx={{ bgcolor: '#2196F3', color: 'white' }}
          />
          <Chip 
            icon={<WarehouseIcon />} 
            label="Bodega (Origen)" 
            size="small"
            sx={{ bgcolor: '#FF9800', color: 'white' }}
          />
          <Chip 
            icon={<LocationIcon />} 
            label="Cliente (Destino)" 
            size="small"
            sx={{ bgcolor: '#4CAF50', color: 'white' }}
          />
        </Stack>
        
        {/* Debug info */}
        {polylines.length === 0 && rutas.length > 0 && (
          <Alert severity="warning" sx={{ mt: 1 }}>
            No se pudieron decodificar las polylines. Mostrando solo marcadores.
          </Alert>
        )}
      </Box>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true
        }}
      >
        {/* Renderizar marcadores */}
        {allLocations.map((location, index) => (
          <Marker
            key={`marker-${location.type}-${index}`}
            position={{ lat: location.lat, lng: location.lng }}
            icon={getMarkerIcon(location.type)}
            onClick={() => setSelectedMarker(location)}
            title={location.label}
          />
        ))}

        {/* Renderizar polylines de rutas */}
        {polylines.map((line, index) => {
          console.log(`Renderizando polyline ${index}:`, {
            path: line.path.length,
            color: line.color
          });
          
          return (
            <Polyline
              key={`polyline-${line.rutaId || index}`}
              path={line.path}
              options={{
                strokeColor: line.color,
                strokeOpacity: line.opacity || 0.8,
                strokeWeight: line.weight,
                geodesic: true
              }}
            />
          );
        })}

        {/* InfoWindow para marcador seleccionado */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <Box sx={{ p: 1, minWidth: 150 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {selectedMarker.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tipo: {selectedMarker.type === 'vehiculo' ? 'Vehículo' : 
                       selectedMarker.type === 'bodega' ? 'Bodega' : 'Cliente'}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                Lat: {selectedMarker.lat.toFixed(4)}, Lng: {selectedMarker.lng.toFixed(4)}
              </Typography>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </Paper>
  );
}

export default MapaRutas;
