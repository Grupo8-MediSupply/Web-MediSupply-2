import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BodegasTable from '../BodegasTable';

// Mock del componente DataTable para simplificar la prueba
vi.mock('../../ui/DataTable', () => ({
  default: ({ columns, data, renderRow }) => {
    return (
      <div data-testid="mock-data-table">
        <div data-testid="columns">{JSON.stringify(columns)}</div>
        <div data-testid="data">{JSON.stringify(data)}</div>
        <div>
          {data.map(item => (
            <div key={item.id} data-testid="rendered-row">
              {renderRow(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}));

describe('BodegasTable', () => {
  const mockBodegas = [
    { id: 1, nombre: 'Centro Norte', ciudad: 'Bogotá', capacidad: '5.000', estado: 'Activo' },
    { id: 2, nombre: 'Centro Urbano', ciudad: 'Medellín', capacidad: '5.500', estado: 'Inactivo' }
  ];

  it('renders DataTable with correct props', () => {
    render(
      <BrowserRouter>
        <BodegasTable bodegas={mockBodegas} />
      </BrowserRouter>
    );
    
    // Verificar que se pasan los datos correctos al DataTable
    const dataProps = JSON.parse(screen.getByTestId('data').textContent);
    expect(dataProps).toEqual(mockBodegas);
    
    // Verificar que se definan las columnas correctas
    const columnsProps = JSON.parse(screen.getByTestId('columns').textContent);
    expect(columnsProps).toHaveLength(5); // Nombre, Ciudad, Capacidad, Estado, Acciones
    expect(columnsProps[0].id).toBe('nombre');
    expect(columnsProps[1].id).toBe('ubicacion'); // Cambiado de 'ciudad' a 'ubicacion'
    expect(columnsProps[2].id).toBe('capacidad');
    expect(columnsProps[3].id).toBe('responsable');
    expect(columnsProps[4].id).toBe('acciones');
  });

  it('renders all bodegas correctly', () => {
    render(
      <BrowserRouter>
        <BodegasTable bodegas={mockBodegas} />
      </BrowserRouter>
    );
    
    // Verificar que se renderiza una fila para cada bodega
    const renderedRows = screen.getAllByTestId('rendered-row');
    expect(renderedRows).toHaveLength(mockBodegas.length);
  });

  it('includes a link to view details for each bodega', () => {
    render(
      <BrowserRouter>
        <BodegasTable bodegas={mockBodegas} />
      </BrowserRouter>
    );
    
    // Verificar que cada bodega tenga un botón para ver detalles
    mockBodegas.forEach(bodega => {
      const verDetalleBtn = screen.getAllByText('Ver detalle');
      expect(verDetalleBtn.length).toBe(mockBodegas.length);
    });
  });
});
