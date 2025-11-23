import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

/**
 * Panel reutilizable para mostrar detalles de auditoría
 * @param {Object} props
 * @param {Object} props.auditoria - Objeto de auditoría
 * @returns {JSX.Element}
 */
const AuditoriaDetailsPanel = ({ auditoria }) => {
  if (!auditoria) return null;

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Detalles
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>ID:</strong> {auditoria.id}
        </Typography>
        {auditoria.userId && (
          <Typography variant="body2" color="text.secondary">
            <strong>User ID:</strong> {auditoria.userId}
          </Typography>
        )}
        {auditoria.ip && (
          <Typography variant="body2" color="text.secondary">
            <strong>IP:</strong> {auditoria.ip}
          </Typography>
        )}
      </Box>

      {auditoria.detalles && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Información adicional:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
            <pre style={{ margin: 0, fontSize: '0.875rem', overflow: 'auto' }}>
              {JSON.stringify(auditoria.detalles, null, 2)}
            </pre>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default AuditoriaDetailsPanel;
