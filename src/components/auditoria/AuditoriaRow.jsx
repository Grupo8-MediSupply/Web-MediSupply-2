import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import SeverityChip from './SeverityChip';
import ModuleChip from './ModuleChip';
import AuditoriaDetailsPanel from './AuditoriaDetailsPanel';
import { formatDate } from '../../utils/dateFormatter';

/**
 * Componente reutilizable para fila expandible de auditoría
 * @param {Object} props
 * @param {Object} props.auditoria - Objeto de auditoría
 * @param {Function} props.onExpand - Callback cuando se expande/contrae
 * @returns {JSX.Element}
 */
const AuditoriaRow = ({ auditoria, onExpand }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
    if (onExpand) {
      onExpand(auditoria.id, !open);
    }
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={handleToggle}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{formatDate(auditoria.createdAt)}</TableCell>
        <TableCell>{auditoria.email}</TableCell>
        <TableCell>{auditoria.accion}</TableCell>
        <TableCell>
          <ModuleChip module={auditoria.modulo} />
        </TableCell>
        <TableCell>
          <SeverityChip severity={auditoria.severidad} />
        </TableCell>
        <TableCell>{auditoria.ip}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <AuditoriaDetailsPanel auditoria={auditoria} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AuditoriaRow;
