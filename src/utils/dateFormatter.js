/**
 * Utilidades para formateo de fechas
 */

/**
 * Formatea una fecha a formato local
 * @param {string|Date} dateString - Fecha a formatear
 * @param {Object} options - Opciones de formato
 * @returns {string} Fecha formateada
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';

  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };

  try {
    return new Date(dateString).toLocaleString('es-CO', defaultOptions);
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea solo la fecha (sin hora)
 * @param {string|Date} dateString - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDateOnly = (dateString) => {
  return formatDate(dateString, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: undefined,
    minute: undefined
  });
};

/**
 * Formatea solo la hora
 * @param {string|Date} dateString - Fecha a formatear
 * @returns {string} Hora formateada
 */
export const formatTimeOnly = (dateString) => {
  if (!dateString) return 'N/A';

  try {
    return new Date(dateString).toLocaleString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch (error) {
    console.error('Error al formatear hora:', error);
    return 'Hora inválida';
  }
};

/**
 * Obtiene fecha relativa (hace X tiempo)
 * @param {string|Date} dateString - Fecha
 * @returns {string} Texto relativo
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) return 'Hace un momento';
    if (diffMinutes < 60) return `Hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    
    return formatDate(dateString);
  } catch (error) {
    console.error('Error al calcular tiempo relativo:', error);
    return formatDate(dateString);
  }
};
