import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainAppBar from '../MainAppBar';

// Mock UserMenu component
vi.mock('../../auth/UserMenu', () => ({
  default: () => <div data-testid="mock-user-menu">User Menu</div>
}));

describe('MainAppBar Component', () => {
  const store = configureStore({
    reducer: {
      auth: () => ({
        user: {
          email: 'test@example.com',
          role: '1'
        }
      })
    }
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <MainAppBar />
      </Provider>
    );
    
    expect(screen.getByTestId('mock-user-menu')).toBeInTheDocument();
  });

  it('has correct styling and positioning', () => {
    const { container } = render(
      <Provider store={store}>
        <MainAppBar />
      </Provider>
    );
    
    const appBar = container.firstChild;
    expect(appBar).toHaveStyle({
      position: 'fixed'
    });
  });
});
