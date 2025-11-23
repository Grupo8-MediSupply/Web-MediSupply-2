import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuditoriaFilters from '../AuditoriaFilters';

describe('AuditoriaFilters', () => {
  const mockFilters = {
    modulo: '',
    accion: '',
    severidad: '',
    email: ''
  };

  it('renders all filter fields', () => {
    render(<AuditoriaFilters filters={mockFilters} />);
    
    expect(screen.getByLabelText('Módulo')).toBeInTheDocument();
    expect(screen.getByLabelText('Acción')).toBeInTheDocument();
    expect(screen.getByLabelText('Severidad')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter changes', () => {
    const handleFilterChange = vi.fn();
    render(
      <AuditoriaFilters 
        filters={mockFilters} 
        onFilterChange={handleFilterChange}
      />
    );

    const accionInput = screen.getByLabelText('Acción');
    fireEvent.change(accionInput, { target: { value: 'Login' } });

    expect(handleFilterChange).toHaveBeenCalledWith('accion', 'Login');
  });

  it('shows clear button when filters are active', () => {
    const filtersWithValues = {
      ...mockFilters,
      modulo: 'Auth'
    };

    render(<AuditoriaFilters filters={filtersWithValues} />);
    expect(screen.getByText('Limpiar')).toBeInTheDocument();
  });

  it('calls onClearFilters when clear button is clicked', () => {
    const handleClearFilters = vi.fn();
    const filtersWithValues = {
      ...mockFilters,
      modulo: 'Auth'
    };

    render(
      <AuditoriaFilters 
        filters={filtersWithValues}
        onClearFilters={handleClearFilters}
      />
    );

    const clearButton = screen.getByText('Limpiar');
    fireEvent.click(clearButton);

    expect(handleClearFilters).toHaveBeenCalled();
  });
});
