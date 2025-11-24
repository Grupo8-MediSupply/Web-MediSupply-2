import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HistorialComprasTable from '../HistorialComprasTable';

describe('HistorialComprasTable', () => {
  const mockCompras = [
    {
      producto: 'Guantes de nitrilo',
      cantidad: 10,
      valorTotal: 50000,
      fechaCompra: '2025-11-17T02:35:02.672Z',
      proveedorId: 'test-id'
    },
    {
      producto: 'Paracetamol 800mg',
      cantidad: 20,
      valorTotal: null,
      fechaCompra: '2025-11-16T10:20:00.000Z',
      proveedorId: 'test-id'
    }
  ];

  it('shows loading state', () => {
    render(<HistorialComprasTable status="loading" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(
      <HistorialComprasTable 
        status="failed" 
        error="Error de conexión"
      />
    );
    expect(screen.getByText(/Error de conexión/)).toBeInTheDocument();
  });

  it('shows empty message when no compras found', () => {
    render(<HistorialComprasTable status="succeeded" compras={[]} />);
    expect(screen.getByText(/No se encontraron compras para este proveedor/)).toBeInTheDocument();
  });

  it('renders compras table with data', () => {
    render(<HistorialComprasTable status="succeeded" compras={mockCompras} />);
    
    expect(screen.getByText('Guantes de nitrilo')).toBeInTheDocument();
    expect(screen.getByText('Paracetamol 800mg')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('displays N/A for null values', () => {
    render(<HistorialComprasTable status="succeeded" compras={mockCompras} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<HistorialComprasTable status="succeeded" compras={mockCompras} />);
    
    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Cantidad')).toBeInTheDocument();
    expect(screen.getByText('Valor Total')).toBeInTheDocument();
    expect(screen.getByText('Fecha de Compra')).toBeInTheDocument();
  });

  it('handles non-array compras gracefully', () => {
    const invalidCompras = { mensaje: 'No hay compras' };
    render(<HistorialComprasTable status="succeeded" compras={invalidCompras} />);
    
    // Debería mostrar el mensaje de "no se encontraron compras"
    expect(screen.getByText(/No se encontraron compras para este proveedor/)).toBeInTheDocument();
  });
});
