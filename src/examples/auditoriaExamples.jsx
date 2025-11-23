/**
 * Ejemplos de uso de componentes de auditoría
 * Este archivo contiene ejemplos prácticos de cómo usar los componentes
 */

import React, { useState } from 'react';
import {
  AuditoriaFilters,
  AuditoriaTable,
  AuditoriaRow,
  SeverityChip,
  ModuleChip,
  AuditoriaDetailsPanel
} from '../components/auditoria';
import { formatDate, getRelativeTime } from '../utils/dateFormatter';

// ============================================
// EJEMPLO 1: Uso básico de la tabla completa
// ============================================

export function BasicAuditoriaExample() {
  const [auditorias] = useState([
    {
      id: '1',
      createdAt: new Date().toISOString(),
      email: 'admin@medisupply.com',
      accion: 'Login exitoso',
      modulo: 'Auth',
      severidad: 'BAJA',
      ip: '192.168.1.100',
      detalles: { navegador: 'Chrome', so: 'Windows' }
    }
  ]);

  return (
    <AuditoriaTable
      auditorias={auditorias}
      status="succeeded"
      error={null}
    />
  );
}

// ============================================
// EJEMPLO 2: Filtros personalizados
// ============================================

export function CustomFiltersExample() {
  const [filters, setFilters] = useState({
    modulo: '',
    accion: '',
    severidad: '',
    email: ''
  });

  const handleFilterChange = (campo, valor) => {
    setFilters(prev => ({ ...prev, [campo]: valor }));
  };

  const handleClearFilters = () => {
    setFilters({
      modulo: '',
      accion: '',
      severidad: '',
      email: ''
    });
  };

  return (
    <AuditoriaFilters
      filters={filters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
      modules={['Auth', 'Productos', 'Ventas', 'Inventarios']}
    />
  );
}

// ============================================
// EJEMPLO 3: Chips de severidad individuales
// ============================================

export function SeverityChipsExample() {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <SeverityChip severity="ALTA" />
      <SeverityChip severity="MEDIA" />
      <SeverityChip severity="BAJA" />
      <SeverityChip /> {/* Muestra N/A */}
    </div>
  );
}

// ============================================
// EJEMPLO 4: Uso en un dashboard
// ============================================

export function DashboardAlertsExample() {
  const alertasRecientes = [
    {
      id: '1',
      mensaje: 'Intento de acceso no autorizado',
      severidad: 'ALTA',
      modulo: 'Auth',
      fecha: new Date(Date.now() - 5 * 60000).toISOString() // Hace 5 min
    },
    {
      id: '2',
      mensaje: 'Stock bajo en producto X',
      severidad: 'MEDIA',
      modulo: 'Inventarios',
      fecha: new Date(Date.now() - 30 * 60000).toISOString() // Hace 30 min
    }
  ];

  return (
    <div>
      <h3>Alertas Recientes</h3>
      {alertasRecientes.map(alerta => (
        <div key={alerta.id} style={{ 
          padding: '10px', 
          margin: '5px 0', 
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <SeverityChip severity={alerta.severidad} />
            <ModuleChip module={alerta.modulo} />
            <span>{alerta.mensaje}</span>
          </div>
          <small style={{ color: '#666' }}>
            {getRelativeTime(alerta.fecha)}
          </small>
        </div>
      ))}
    </div>
  );
}

// ============================================
// EJEMPLO 5: Lista de actividades con formato
// ============================================

export function ActivityListExample() {
  const actividades = [
    {
      usuario: 'juan@medisupply.com',
      accion: 'Creó producto',
      fecha: '2024-01-15T10:30:00Z',
      severidad: 'BAJA'
    },
    {
      usuario: 'maria@medisupply.com',
      accion: 'Eliminó registro',
      fecha: '2024-01-15T11:45:00Z',
      severidad: 'ALTA'
    }
  ];

  return (
    <ul>
      {actividades.map((act, idx) => (
        <li key={idx}>
          <strong>{act.usuario}</strong> {act.accion}
          <br />
          <small>{formatDate(act.fecha)}</small>
          {' '}
          <SeverityChip severity={act.severidad} size="small" />
        </li>
      ))}
    </ul>
  );
}

// ============================================
// EJEMPLO 6: Integración con Redux
// ============================================

export function ReduxIntegrationExample() {
  // Este es el patrón usado en Auditoria.jsx
  
  /*
  import { useDispatch, useSelector } from 'react-redux';
  import {
    fetchAuditorias,
    selectFilteredAuditorias,
    selectAuditoriasStatus,
    selectAuditoriasError,
    selectFiltros,
    setFiltros,
    clearFiltros
  } from '../../redux/features/auditoriaSlice';

  const dispatch = useDispatch();
  const auditorias = useSelector(selectFilteredAuditorias);
  const status = useSelector(selectAuditoriasStatus);
  const error = useSelector(selectAuditoriasError);
  const filtros = useSelector(selectFiltros);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAuditorias());
    }
  }, [status, dispatch]);

  const handleFiltroChange = (campo, valor) => {
    dispatch(setFiltros({ [campo]: valor }));
  };

  return (
    <>
      <AuditoriaFilters
        filters={filtros}
        onFilterChange={handleFiltroChange}
        onClearFilters={() => dispatch(clearFiltros())}
      />
      <AuditoriaTable
        auditorias={auditorias}
        status={status}
        error={error}
      />
    </>
  );
  */
}

// ============================================
// EJEMPLO 7: Tabla personalizada para un módulo
// ============================================

export function CustomModuleTableExample() {
  const inventarioLogs = [
    {
      id: '1',
      createdAt: new Date().toISOString(),
      email: 'bodeguero@medisupply.com',
      accion: 'Ingreso de mercancía',
      modulo: 'Inventarios',
      severidad: 'BAJA',
      ip: '192.168.1.50',
      detalles: {
        productos: 15,
        lote: 'L-2024-001',
        bodega: 'Principal'
      }
    }
  ];

  return (
    <div>
      <h2>Auditoría de Inventarios</h2>
      <AuditoriaTable
        auditorias={inventarioLogs}
        status="succeeded"
        onRowExpand={(id, isOpen) => {
          console.log(`Log ${id} ${isOpen ? 'expandido' : 'contraído'}`);
        }}
      />
    </div>
  );
}

// ============================================
// EJEMPLO 8: Formateo de fechas
// ============================================

export function DateFormattingExample() {
  const fecha = '2024-01-15T14:30:00Z';

  return (
    <div>
      <p>Fecha completa: {formatDate(fecha)}</p>
      <p>Hace cuánto: {getRelativeTime(fecha)}</p>
      <p>Solo fecha: {formatDate(fecha, { 
        hour: undefined, 
        minute: undefined 
      })}</p>
    </div>
  );
}

// ============================================
// EJEMPLO 9: Estados de carga
// ============================================

export function LoadingStatesExample() {
  const [status, setStatus] = useState('loading');

  return (
    <div>
      <button onClick={() => setStatus('loading')}>Loading</button>
      <button onClick={() => setStatus('succeeded')}>Success</button>
      <button onClick={() => setStatus('failed')}>Error</button>

      <AuditoriaTable
        auditorias={status === 'succeeded' ? [] : []}
        status={status}
        error={status === 'failed' ? 'Error de conexión' : null}
      />
    </div>
  );
}

// ============================================
// EJEMPLO 10: Panel de detalles standalone
// ============================================

export function DetailsPanelExample() {
  const auditoria = {
    id: 'audit-001',
    userId: 'user-123',
    ip: '192.168.1.1',
    detalles: {
      navegador: 'Chrome 120',
      sistemaOperativo: 'Windows 11',
      ubicacion: 'Bogotá, Colombia',
      duracionSesion: '2 horas'
    }
  };

  return (
    <AuditoriaDetailsPanel auditoria={auditoria} />
  );
}

// Exportar todos los ejemplos
export default {
  BasicAuditoriaExample,
  CustomFiltersExample,
  SeverityChipsExample,
  DashboardAlertsExample,
  ActivityListExample,
  ReduxIntegrationExample,
  CustomModuleTableExample,
  DateFormattingExample,
  LoadingStatesExample,
  DetailsPanelExample
};
