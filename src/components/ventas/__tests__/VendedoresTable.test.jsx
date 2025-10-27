import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import VendedoresTable from '../VendedoresTable';

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

describe('VendedoresTable', () => {
  const mockVendedores = [
    { id: '123456', nombre: 'Edwin', territorio: 'Colombia', visitasCompletadas: 15, visitasProgramadas: 20 },
    { id: '234567', nombre: 'Juan', territorio: 'México', visitasCompletadas: 8, visitasProgramadas: 15 }
  ];

  it('renders DataTable with correct props', () => {
    render(
      <BrowserRouter>
        <VendedoresTable vendedores={mockVendedores} />
      </BrowserRouter>
    );
    
    // Verificar que se pasan los datos correctos al DataTable
    const dataProps = JSON.parse(screen.getByTestId('data').textContent);
    expect(dataProps).toEqual(mockVendedores);
    
    // Verificar que se definan las columnas correctas
    const columnsProps = JSON.parse(screen.getByTestId('columns').textContent);
    expect(columnsProps).toHaveLength(4); // ID, Nombre, Territorio, Acciones
    expect(columnsProps[0].id).toBe('nombre');
    expect(columnsProps[1].id).toBe('email');
    expect(columnsProps[2].id).toBe('territorio');
    expect(columnsProps[3].id).toBe('acciones');
  });

  it('renders all vendedores correctly', () => {
    render(
      <BrowserRouter>
        <VendedoresTable vendedores={mockVendedores} />
      </BrowserRouter>
    );
    
    // Verificar que se renderiza una fila para cada vendedor
    const renderedRows = screen.getAllByTestId('rendered-row');
    expect(renderedRows).toHaveLength(mockVendedores.length);
  });

  it('includes action buttons for each vendedor', () => {
    render(
      <BrowserRouter>
        <VendedoresTable vendedores={mockVendedores} />
      </BrowserRouter>
    );
    
    // Buscar los iconos de acciones por su data-testid en lugar de title
    const verDetallesIcons = screen.getAllByTestId('VisibilityIcon');
    const verVisitasIcons = screen.getAllByTestId('CalendarMonthIcon');
    const editarIcons = screen.getAllByTestId('EditIcon');
    const eliminarIcons = screen.getAllByTestId('DeleteIcon');
    
    // Verificar que hay un botón para cada vendedor
    expect(verDetallesIcons).toHaveLength(mockVendedores.length);
    expect(verVisitasIcons).toHaveLength(mockVendedores.length);
    expect(editarIcons).toHaveLength(mockVendedores.length);
    expect(eliminarIcons).toHaveLength(mockVendedores.length);
  });
});
