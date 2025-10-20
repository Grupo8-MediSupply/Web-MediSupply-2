import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import VendedorForm from '../VendedorForm';
import { addVendedor, resetAddStatus } from '../../../redux/features/vendedoresSlice';

// Mock de las acciones
vi.mock('../../../redux/features/vendedoresSlice', async () => {
  const actual = await vi.importActual('../../../redux/features/vendedoresSlice');
  return {
    ...actual,
    addVendedor: vi.fn(),
    resetAddStatus: vi.fn()
  };
});

describe('VendedorForm Component', () => {
  let store;
  const onClose = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Configurar store con datos de prueba
    store = configureStore({
      reducer: {
        vendedores: (state = { addStatus: 'idle' }) => state
      }
    });
    
    // Mock de las acciones
    addVendedor.mockImplementation(() => ({ type: 'vendedores/addVendedor' }));
    resetAddStatus.mockImplementation(() => ({ type: 'vendedores/resetAddStatus' }));
  });

  it('renders the form fields correctly', () => {
    render(
      <Provider store={store}>
        <VendedorForm open={true} onClose={onClose} />
      </Provider>
    );
    
    expect(screen.getByText('Nuevo Vendedor')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText(/Supervisor/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Aceptar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(
      <Provider store={store}>
        <VendedorForm open={true} onClose={onClose} />
      </Provider>
    );
    
    // Submit form without filling required fields
    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
    });
    
    expect(addVendedor).not.toHaveBeenCalled();
  });

  it('calls addVendedor action when form is valid', async () => {
    render(
      <Provider store={store}>
        <VendedorForm open={true} onClose={onClose} />
      </Provider>
    );
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Roberto' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'r.amaya@medisupply.com' } });
    fireEvent.change(screen.getByLabelText(/Supervisor/), { target: { value: 'Supervisor' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));
    
    await waitFor(() => {
      expect(addVendedor).toHaveBeenCalledWith({
        nombre: 'Roberto',
        email: 'r.amaya@medisupply.com'
      });
    });
  });

  it('closes the form when Cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <VendedorForm open={true} onClose={onClose} />
      </Provider>
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onClose).toHaveBeenCalled();
  });
});
