/**
 * Constants for authentication and authorization
 */

// Roles mapping
export const Roles = {
  ADMIN: '1',
  VENDEDOR: '20',
  CLIENTE: '30',
  PROVEEDOR: '40'
};

// Countries mapping
export const Countries = {
  COLOMBIA: '10',
  MEXICO: '20'
};

// Human-readable role names
export const RoleNames = {
  [Roles.ADMIN]: 'Administrador',
  [Roles.VENDEDOR]: 'Vendedor',
  [Roles.CLIENTE]: 'Cliente',
  [Roles.PROVEEDOR]: 'Proveedor'
};

// Human-readable country names
export const CountryNames = {
  [Countries.COLOMBIA]: 'Colombia',
  [Countries.MEXICO]: 'México'
};
