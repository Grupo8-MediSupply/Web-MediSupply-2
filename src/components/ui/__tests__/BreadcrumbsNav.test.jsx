import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BreadcrumbsNav from '../BreadcrumbsNav';

describe('BreadcrumbsNav', () => {
  const mockItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Inventarios', path: '/inventarios' },
  ];

  it('renders breadcrumbs navigation with all items', () => {
    render(
      <BrowserRouter>
        <BreadcrumbsNav items={mockItems} currentPage="Bodegas" />
      </BrowserRouter>
    );

    // Verificar que todos los elementos del breadcrumb se renderizan
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Inventarios')).toBeInTheDocument();
    expect(screen.getByText('Bodegas')).toBeInTheDocument();
  });

  it('renders the current page without a link', () => {
    render(
      <BrowserRouter>
        <BreadcrumbsNav items={mockItems} currentPage="Bodegas" />
      </BrowserRouter>
    );

    // El item actual no debería ser un enlace
    const currentPage = screen.getByText('Bodegas');
    expect(currentPage.tagName).not.toBe('A');
  });

  it('renders previous items as links', () => {
    render(
      <BrowserRouter>
        <BreadcrumbsNav items={mockItems} currentPage="Bodegas" />
      </BrowserRouter>
    );

    // Los items anteriores deberían ser enlaces
    const homeLink = screen.getByText('Inicio');
    const inventoriosLink = screen.getByText('Inventarios');
    
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(inventoriosLink.closest('a')).toHaveAttribute('href', '/inventarios');
  });

  it('handles empty items array', () => {
    render(
      <BrowserRouter>
        <BreadcrumbsNav items={[]} currentPage="Página Actual" />
      </BrowserRouter>
    );

    // Debería mostrar solo la página actual
    expect(screen.getByText('Página Actual')).toBeInTheDocument();
  });
});
