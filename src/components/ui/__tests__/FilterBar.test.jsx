import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../FilterBar';

describe('FilterBar', () => {
  const mockFilters = [
    {
      name: 'ciudad',
      label: 'Ciudad',
      value: '',
      options: ['Bogotá', 'Medellín', 'Cali'],
      emptyOptionText: 'Todas',
      width: '250px'
    },
    {
      name: 'bodega',
      label: 'Bodega',
      value: '',
      options: ['Centro Norte', 'Centro Sur'],
      emptyOptionText: 'Todas',
      width: '250px'
    }
  ];

  it('renders all filters with their labels', () => {
    render(<FilterBar filters={mockFilters} onChange={() => {}} />);
    
    expect(screen.getByLabelText('Ciudad')).toBeInTheDocument();
    expect(screen.getByLabelText('Bodega')).toBeInTheDocument();
  });

  it('calls onChange with the correct name and value when a filter changes', () => {
    const handleChange = vi.fn();
    
    render(<FilterBar filters={mockFilters} onChange={handleChange} />);
    
    // Seleccionar un valor para el filtro de ciudad
    const ciudadSelect = screen.getByLabelText('Ciudad');
    fireEvent.mouseDown(ciudadSelect);
    
    // Seleccionar la opción "Bogotá"
    const bogotaOption = screen.getByText('Bogotá');
    fireEvent.click(bogotaOption);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    // Verificar que el evento incluya el nombre y valor correctos
    expect(handleChange.mock.calls[0][0].target.name).toBe('ciudad');
    expect(handleChange.mock.calls[0][0].target.value).toBe('Bogotá');
  });

  it('displays the empty option text when no value is selected', () => {
    render(<FilterBar filters={mockFilters} onChange={() => {}} />);
    
    // Abrir el menú del filtro de ciudad
    const ciudadSelect = screen.getByLabelText('Ciudad');
    fireEvent.mouseDown(ciudadSelect);
    
    // La opción vacía debería mostrar el texto "Todas"
    expect(screen.getByText('Todas')).toBeInTheDocument();
  });

  it('renders filters with their current values', () => {
    const filtersWithValues = [
      {
        ...mockFilters[0],
        value: 'Bogotá'
      },
      mockFilters[1]
    ];
    
    render(<FilterBar filters={filtersWithValues} onChange={() => {}} />);
    
    // El primer filtro debería tener seleccionado el valor "Bogotá"
    const ciudadSelect = screen.getByLabelText('Ciudad');
    expect(ciudadSelect).toHaveTextContent('Bogotá');
  });
});
