import React, { useState, useCallback, useMemo } from 'react';
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
  if (!encoded) return [];
  
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
  return poly;
};

function MapaRutas({ rutas, pedidos }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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

  // Procesar polylines de las rutas
  const polylines = useMemo(() => {
    const lines = [];
    const colors = ['#1976d2', '#dc004e', '#388e3c', '#f57c00', '#7b1fa2'];
    
    rutas.forEach((ruta, index) => {
      const color = colors[index % colors.length];
      
      // Intentar decodificar la polyline principal
      if (ruta.polilinea) {
        const path = decodePolyline(ruta.polilinea);
        if (path.length > 0) {
          lines.push({
            rutaId: ruta.rutaId,
            vehiculoId: ruta.vehiculoId,
            path,
            color,
            weight: 4
          });
        }
      }
      
      // También procesar polylines de los legs si existen
      if (ruta.legs && ruta.legs.length > 0) {
        ruta.legs.forEach((leg, legIdx) => {
          if (leg.polyline?.encodedPolyline) {
            const path = decodePolyline(leg.polyline.encodedPolyline);
            if (path.length > 0) {
              lines.push({
                rutaId: `${ruta.rutaId}-leg-${legIdx}`,
                vehiculoId: ruta.vehiculoId,
                path,
                color,
                weight: 3,
                opacity: 0.7
              });
            }
          }
        });
      }
    });
    
    return lines;
  }, [rutas]);

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
          {rutas.length} ruta(s) • {allLocations.length} ubicación(es)
        </Typography>
      </Box>
      
      {/* Leyenda */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
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
        {polylines.map((line, index) => (
          <Polyline
            key={`polyline-${index}`}
            path={line.path}
            options={{
              strokeColor: line.color,
              strokeOpacity: line.opacity || 0.8,
              strokeWeight: line.weight,
              geodesic: true
            }}
          />
        ))}

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
