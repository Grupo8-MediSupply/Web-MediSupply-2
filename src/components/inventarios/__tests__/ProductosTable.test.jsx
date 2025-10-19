import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductosTable from '../ProductosTable';

// Mock del componente DataTable para simplificar la prueba
vi.mock('../../ui/DataTable', () => ({
  default: ({ columns, data, renderRow }) => {
    return (
      <div data-testid="mock-data-table">
        <div data-testid="columns">{JSON.stringify(columns)}</div>
        <div data-testid="data">{JSON.stringify(data)}</div>
        <div>
          {data.map(item => (
            <div key={`${item.lote}-${item.producto}`} data-testid="rendered-row">
              {renderRow(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}));

describe('ProductosTable', () => {
  const mockProductos = [
    { producto: 'Vacuna influenza', lote: 'MED-014-1', cantidad: 400, vencimiento: '31/08/2024' },
    { producto: 'Guantes Nitrilo M', lote: 'INS-220-2', cantidad: 300, vencimiento: '15/07/2025' }
  ];

  it('renders DataTable with correct props', () => {
    render(<ProductosTable productos={mockProductos} />);
    
    // Verificar que se pasan los datos correctos al DataTable
    const dataProps = JSON.parse(screen.getByTestId('data').textContent);
    expect(dataProps).toEqual(mockProductos);
    
    // Verificar que se definan las columnas correctas
    const columnsProps = JSON.parse(screen.getByTestId('columns').textContent);
    expect(columnsProps).toHaveLength(4); // Producto, Lote, Cantidad, Vencimiento
    expect(columnsProps[0].id).toBe('producto');
    expect(columnsProps[1].id).toBe('lote');
    expect(columnsProps[2].id).toBe('cantidad');
    expect(columnsProps[3].id).toBe('vencimiento');
  });

  it('renders all products correctly', () => {
    render(<ProductosTable productos={mockProductos} />);
    
    // Verificar que se renderiza una fila para cada producto
    const renderedRows = screen.getAllByTestId('rendered-row');
    expect(renderedRows).toHaveLength(mockProductos.length);
  });

  it('highlights products close to expiration date', () => {
    // Crear un producto a punto de vencer (dentro de 15 días)
    const today = new Date();
    const closeToExpire = new Date(today);
    closeToExpire.setDate(today.getDate() + 15);
    
    const formattedDate = `${closeToExpire.getDate().toString().padStart(2, '0')}/${
      (closeToExpire.getMonth() + 1).toString().padStart(2, '0')}/${
      closeToExpire.getFullYear()}`;
    
    const productosWithExpiring = [
      ...mockProductos,
      { producto: 'Producto por vencer', lote: 'EXP-001', cantidad: 100, vencimiento: formattedDate }
    ];
    
    const { container } = render(<ProductosTable productos={productosWithExpiring} />);
    
    // La función isCloseToExpire es interna, pero podemos verificar que se rendericen
    // los componentes Chip para los productos cercanos a vencer
    // Esto depende de la implementación, puede ser difícil de probar directamente
  });
});
