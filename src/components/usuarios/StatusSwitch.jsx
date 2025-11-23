import React from 'react';
import { Switch, FormControlLabel, Tooltip } from '@mui/material';

/**
 * Componente reutilizable para switch de estado activo/inactivo
 * @param {Object} props
 * @param {boolean} props.checked - Estado actual
 * @param {Function} props.onChange - Callback cuando cambia
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {string} props.label - Etiqueta opcional
 * @returns {JSX.Element}
 */
const StatusSwitch = ({ 
  checked, 
  onChange, 
  disabled = false,
  label = null 
}) => {
  const switchElement = (
    <Switch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      color="success"
      size="small"
    />
  );

  const element = label ? (
    <FormControlLabel
      control={switchElement}
      label={label}
    />
  ) : switchElement;

  return (
    <Tooltip title={checked ? 'Usuario activo' : 'Usuario inactivo'}>
      {element}
    </Tooltip>
  );
};

export default StatusSwitch;
