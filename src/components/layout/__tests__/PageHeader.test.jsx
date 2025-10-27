import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PageHeader from '../PageHeader';

// Mock UserMenu component
vi.mock('../../auth/UserMenu', () => ({
  default: () => <div data-testid="mock-user-menu">User Menu</div>
}));

describe('PageHeader Component', () => {
  const store = configureStore({
    reducer: {
      auth: () => ({})
    }
  });

  const mockProps = {
    title: 'Test Page',
    breadcrumbsItems: [
      { label: 'Home', path: '/' },
      { label: 'Section', path: '/section' }
    ],
    currentPage: 'Current'
  };

  it('renders title correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageHeader {...mockProps} />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders breadcrumbs navigation', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageHeader {...mockProps} />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Section')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('includes user menu', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PageHeader {...mockProps} />
        </BrowserRouter>
      </Provider>
    );

    // Changed to check for user menu button instead of mock component
    expect(screen.getByLabelText('cuenta del usuario')).toBeInTheDocument();
  });
});
