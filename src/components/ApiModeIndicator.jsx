import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import SimCardIcon from '@mui/icons-material/SimCard';

/**
 * Componente que muestra un indicador del modo de API que se está utilizando
 */
const ApiModeIndicator = () => {
  // Obtener el modo desde las variables de entorno
  const isMockMode = import.meta.env.VITE_USE_MOCK_API === 'true';

  return (
    <Tooltip title={isMockMode ? "Usando APIs simuladas" : "Usando APIs reales"}>
      <Chip
        icon={isMockMode ? <SimCardIcon /> : <ApiIcon />}
        label={isMockMode ? "MOCK" : "REAL"}
        color={isMockMode ? "warning" : "success"}
        size="small"
        sx={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px',
          zIndex: 9999
        }}
      />
    </Tooltip>
  );
};

export default ApiModeIndicator;
