import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UsuariosTable from '../UsuariosTable';

describe('UsuariosTable', () => {
  const mockUsuarios = [
    {
      id: '1',
      email: 'test@test.com',
      rolId: 20,
      activo: true,
      tipoIdentificacion: 1,
      identificacion: '123456'
    }
  ];

  it('shows loading state', () => {
    render(<UsuariosTable status="loading" usuarios={[]} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(
      <UsuariosTable 
        status="failed" 
        error="Error de conexión" 
        usuarios={[]} 
      />
    );
    expect(screen.getByText(/Error de conexión/)).toBeInTheDocument();
  });

  it('shows empty message when no usuarios', () => {
    render(<UsuariosTable status="succeeded" usuarios={[]} />);
    expect(screen.getByText(/No se encontraron usuarios/)).toBeInTheDocument();
  });

  it('renders usuario rows', () => {
    render(<UsuariosTable status="succeeded" usuarios={mockUsuarios} />);
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
  });

  it('shows active status chip', () => {
    render(<UsuariosTable status="succeeded" usuarios={mockUsuarios} />);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });
});
