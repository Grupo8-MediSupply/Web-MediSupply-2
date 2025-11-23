import React from 'react';
import { Chip } from '@mui/material';

/**
 * Chip reutilizable para mostrar la severidad de auditoría
 * @param {Object} props
 * @param {string} props.severity - Nivel de severidad (ALTA, MEDIA, BAJA)
 * @param {string} props.size - Tamaño del chip
 * @returns {JSX.Element}
 */
const SeverityChip = ({ severity, size = 'small' }) => {
  const getSeverityColor = (sev) => {
    switch (sev?.toUpperCase()) {
      case 'ALTA':
        return 'error';
      case 'MEDIA':
        return 'warning';
      case 'BAJA':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Chip
      label={severity || 'N/A'}
      size={size}
      color={getSeverityColor(severity)}
    />
  );
};

export default SeverityChip;
