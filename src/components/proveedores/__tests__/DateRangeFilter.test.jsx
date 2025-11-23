import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DateRangeFilter from '../DateRangeFilter';

describe('DateRangeFilter', () => {
  const mockProps = {
    fechaInicio: '2025-11-01',
    fechaFin: '2025-11-23',
    onFechaInicioChange: vi.fn(),
    onFechaFinChange: vi.fn(),
    onSearch: vi.fn(),
    onClear: vi.fn(),
    disabled: false
  };

  it('renders date inputs with correct values', () => {
    render(<DateRangeFilter {...mockProps} />);
    
    const fechaInicioInput = screen.getByLabelText('Fecha inicio');
    const fechaFinInput = screen.getByLabelText('Fecha fin');
    
    expect(fechaInicioInput).toHaveValue('2025-11-01');
    expect(fechaFinInput).toHaveValue('2025-11-23');
  });

  it('calls onFechaInicioChange when fecha inicio changes', () => {
    render(<DateRangeFilter {...mockProps} />);
    
    const fechaInicioInput = screen.getByLabelText('Fecha inicio');
    fireEvent.change(fechaInicioInput, { target: { value: '2025-11-10' } });
    
    expect(mockProps.onFechaInicioChange).toHaveBeenCalledWith('2025-11-10');
  });

  it('calls onFechaFinChange when fecha fin changes', () => {
    render(<DateRangeFilter {...mockProps} />);
    
    const fechaFinInput = screen.getByLabelText('Fecha fin');
    fireEvent.change(fechaFinInput, { target: { value: '2025-11-25' } });
    
    expect(mockProps.onFechaFinChange).toHaveBeenCalledWith('2025-11-25');
  });

  it('calls onSearch when Filtrar button is clicked', () => {
    render(<DateRangeFilter {...mockProps} />);
    
    const filtrarButton = screen.getByText('Filtrar');
    fireEvent.click(filtrarButton);
    
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it('shows "Cargar Todo" button when dates are empty', () => {
    render(<DateRangeFilter {...mockProps} fechaInicio="" fechaFin="" />);
    
    const cargarTodoButton = screen.getByText('Cargar Todo');
    expect(cargarTodoButton).toBeInTheDocument();
    expect(cargarTodoButton).not.toBeDisabled();
  });

  it('shows Limpiar button when dates are set', () => {
    render(<DateRangeFilter {...mockProps} />);
    
    expect(screen.getByText('Limpiar')).toBeInTheDocument();
  });

  it('calls onClear when Limpiar button is clicked', () => {
    render(<DateRangeFilter {...mockProps} />);
    
    const limpiarButton = screen.getByText('Limpiar');
    fireEvent.click(limpiarButton);
    
    expect(mockProps.onClear).toHaveBeenCalled();
  });

  it('disables all controls when disabled prop is true', () => {
    render(<DateRangeFilter {...mockProps} disabled={true} />);
    
    const fechaInicioInput = screen.getByLabelText('Fecha inicio');
    const fechaFinInput = screen.getByLabelText('Fecha fin');
    const filtrarButton = screen.getByText('Filtrar');
    
    expect(fechaInicioInput).toBeDisabled();
    expect(fechaFinInput).toBeDisabled();
    expect(filtrarButton).toBeDisabled();
  });
});
