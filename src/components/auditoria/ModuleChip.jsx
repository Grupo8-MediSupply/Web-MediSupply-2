import React from 'react';
import { Chip } from '@mui/material';

/**
 * Chip reutilizable para mostrar el módulo de auditoría
 * @param {Object} props
 * @param {string} props.module - Nombre del módulo
 * @param {string} props.size - Tamaño del chip
 * @param {string} props.variant - Variante del chip
 * @returns {JSX.Element}
 */
const ModuleChip = ({ module, size = 'small', variant = 'outlined' }) => {
  return (
    <Chip
      label={module || 'N/A'}
      size={size}
      variant={variant}
      color="primary"
    />
  );
};

export default ModuleChip;
