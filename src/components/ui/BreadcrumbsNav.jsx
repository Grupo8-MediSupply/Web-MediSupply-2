import React from 'react';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Componente de navegación de migas de pan reutilizable
 * @param {Array} items - Array de objetos {label, path} para cada nivel de navegación
 * @param {String} currentPage - Etiqueta de la página actual
 */
function BreadcrumbsNav({ items, currentPage }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) => (
        <Link
          key={index}
          component={RouterLink}
          to={item.path}
          underline="hover"
          color="inherit"
        >
          {item.label}
        </Link>
      ))}
      <Typography color="text.primary">{currentPage}</Typography>
    </Breadcrumbs>
  );
}

export default BreadcrumbsNav;
