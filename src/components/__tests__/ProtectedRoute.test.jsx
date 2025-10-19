import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProtectedRoute from '../ProtectedRoute';

// Mock del componente Navigate para poder capturar las redirecciones
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to }) => <div data-testid="navigate" data-to={to}>Redirecting to {to}</div>
  };
});

describe('ProtectedRoute', () => {
  // Crear un store con diferentes estados de autenticación para las pruebas
  const createMockStore = (isAuthenticated, loading = false) => {
    return configureStore({
      reducer: {
        auth: () => ({
          isAuthenticated,
          loading
        })
      }
    });
  };

  it('redirects to login when user is not authenticated', () => {
    const store = createMockStore(false);
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </BrowserRouter>
      </Provider>
    );
    
    // Verificar que se redirija al login
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toHaveAttribute('data-to', '/login');
  });

  it('shows loading indicator when authentication status is being checked', () => {
    const store = createMockStore(false, true);
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </BrowserRouter>
      </Provider>
    );
    
    // Verificar que se muestre el indicador de carga
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    const store = createMockStore(true);
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </BrowserRouter>
      </Provider>
    );
    
    // Verificar que se muestre el contenido protegido
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
