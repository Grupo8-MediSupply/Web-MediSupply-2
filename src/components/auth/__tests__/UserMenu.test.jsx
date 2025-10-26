import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserMenu from '../UserMenu';
import * as authActions from '../../../redux/features/authSlice';

// Mock Redux actions with implementation
vi.mock('../../../redux/features/authSlice');

describe('UserMenu Component', () => {
  const mockLogout = vi.fn();
  let store;

  beforeEach(() => {
    vi.spyOn(authActions, 'logout').mockImplementation(() => mockLogout);

    store = configureStore({
      reducer: {
        auth: () => ({
          user: {
            email: 'test@example.com',
            role: '1',
            pais: '10'
          }
        })
      }
    });
    vi.clearAllMocks();
  });

  it('renders user avatar with correct initial', () => {
    render(
      <Provider store={store}>
        <UserMenu />
      </Provider>
    );
    
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('opens menu on avatar click', () => {
    render(
      <Provider store={store}>
        <UserMenu />
      </Provider>
    );
    
    const avatar = screen.getByRole('button');
    fireEvent.click(avatar);
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
  });

  it('dispatches logout action when clicking logout', () => {
    render(
      <Provider store={store}>
        <UserMenu />
      </Provider>
    );
    
    // Open menu
    fireEvent.click(screen.getByRole('button'));
    // Click logout
    fireEvent.click(screen.getByText('Cerrar Sesión'));
    
    expect(mockLogout).toHaveBeenCalled();
  });

  it('displays correct user role and country', () => {
    render(
      <Provider store={store}>
        <UserMenu />
      </Provider>
    );
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText('Administrador - Colombia')).toBeInTheDocument();
  });
});
