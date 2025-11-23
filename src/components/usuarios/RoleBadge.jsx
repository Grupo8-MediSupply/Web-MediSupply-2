import React from 'react';
import { Chip } from '@mui/material';

// Mapeo de roles ID a nombres y colores
const ROLES = {
  1: { label: 'Super Admin', color: 'error' },
  20: { label: 'Vendedor', color: 'primary' },
  30: { label: 'Cliente', color: 'success' },
  40: { label: 'Proveedor', color: 'warning' }
};

/**
 * Componente reutilizable para mostrar el rol de un usuario
 * @param {Object} props
 * @param {number} props.rolId - ID del rol
 * @param {string} props.size - Tamaño del chip
 * @returns {JSX.Element}
 */
const RoleBadge = ({ rolId, size = 'small' }) => {
  const rol = ROLES[rolId] || { label: `Rol ${rolId}`, color: 'default' };

  return (
    <Chip
      label={rol.label}
      size={size}
      color={rol.color}
      variant="outlined"
    />
  );
};

export default RoleBadge;
export { ROLES };
