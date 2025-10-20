import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Ventas from '../Ventas';

// Mock de las imágenes
vi.mock('../assets/vendedores.png', () => 'mocked-vendedores-image');
vi.mock('../assets/planes_venta.png', () => 'mocked-planes-venta-image');
vi.mock('../assets/reportes.png', () => 'mocked-reportes-image');

describe('Ventas Page', () => {
  it('renders the title correctly', () => {
    render(
      <BrowserRouter>
        <Ventas />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Ventas')).toBeInTheDocument();
  });

  it('renders three navigation cards', () => {
    render(
      <BrowserRouter>
        <Ventas />
      </BrowserRouter>
    );
    
    // Buscar las tarjetas por sus títulos
    expect(screen.getByText('Vendedores')).toBeInTheDocument();
    expect(screen.getByText('Planes de venta')).toBeInTheDocument();
    expect(screen.getByText('Reportes')).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    render(
      <BrowserRouter>
        <Ventas />
      </BrowserRouter>
    );
    
    // Verificar que los enlaces van a las rutas correctas
    const vendedoresLink = screen.getByText('Vendedores').closest('a');
    const planesLink = screen.getByText('Planes de venta').closest('a');
    const reportesLink = screen.getByText('Reportes').closest('a');
    
    expect(vendedoresLink).toHaveAttribute('href', '/ventas/vendedores');
    expect(planesLink).toHaveAttribute('href', '/ventas/planes');
    expect(reportesLink).toHaveAttribute('href', '/ventas/reportes');
  });

  it('renders images in the cards', () => {
    render(
      <BrowserRouter>
        <Ventas />
      </BrowserRouter>
    );
    
    // Verificar que hay imágenes para cada tarjeta
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
  });
});
