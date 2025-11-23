import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AuditoriaTable from '../AuditoriaTable';

describe('AuditoriaTable', () => {
  const mockAuditorias = [
    {
      id: '1',
      createdAt: '2024-01-01T10:00:00Z',
      email: 'user@test.com',
      accion: 'Login',
      modulo: 'Auth',
      severidad: 'BAJA',
      ip: '192.168.1.1'
    }
  ];

  it('shows loading state', () => {
    render(<AuditoriaTable status="loading" auditorias={[]} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(
      <AuditoriaTable 
        status="failed" 
        error="Error de conexión" 
        auditorias={[]} 
      />
    );
    expect(screen.getByText(/Error de conexión/)).toBeInTheDocument();
  });

  it('shows empty message when no auditorias', () => {
    render(<AuditoriaTable status="succeeded" auditorias={[]} />);
    expect(screen.getByText(/No se encontraron registros/)).toBeInTheDocument();
  });

  it('renders auditoria rows', () => {
    render(<AuditoriaTable status="succeeded" auditorias={mockAuditorias} />);
    expect(screen.getByText('user@test.com')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
