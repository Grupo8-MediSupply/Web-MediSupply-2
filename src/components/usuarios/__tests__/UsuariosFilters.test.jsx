import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UsuariosFilters from '../UsuariosFilters';

describe('UsuariosFilters', () => {
  const mockFilters = {
    email: '',
    rolId: '',
    activo: '',
    identificacion: ''
  };

  it('renders all filter fields', () => {
    render(<UsuariosFilters filters={mockFilters} />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Rol')).toBeInTheDocument();
    expect(screen.getByLabelText('Estado')).toBeInTheDocument();
    expect(screen.getByLabelText('Identificación')).toBeInTheDocument();
  });

  it('calls onFilterChange when email changes', () => {
    const handleFilterChange = vi.fn();
    render(
      <UsuariosFilters 
        filters={mockFilters} 
        onFilterChange={handleFilterChange}
      />
    );

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

    expect(handleFilterChange).toHaveBeenCalledWith('email', 'test@test.com');
  });

  it('shows clear button when filters are active', () => {
    const filtersWithValues = {
      ...mockFilters,
      email: 'test@test.com'
    };

    render(<UsuariosFilters filters={filtersWithValues} />);
    expect(screen.getByText('Limpiar')).toBeInTheDocument();
  });

  it('calls onClearFilters when clear button is clicked', () => {
    const handleClearFilters = vi.fn();
    const filtersWithValues = {
      ...mockFilters,
      email: 'test@test.com'
    };

    render(
      <UsuariosFilters 
        filters={filtersWithValues}
        onClearFilters={handleClearFilters}
      />
    );

    const clearButton = screen.getByText('Limpiar');
    fireEvent.click(clearButton);

    expect(handleClearFilters).toHaveBeenCalled();
  });

  it('does not show clear button when no filters are active', () => {
    render(<UsuariosFilters filters={mockFilters} />);
    expect(screen.queryByText('Limpiar')).not.toBeInTheDocument();
  });
});
