import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../App';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  const mockToggleColorMode = vi.fn();
  
  const renderWithProviders = (component) => {
    const theme = createTheme({
      palette: { 
        mode: 'light',
        background: { default: '#fff', paper: '#fff' }
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      }
    });

    const store = configureStore({
      reducer: {
        auth: () => ({ user: { email: 'test@example.com' } })
      }
    });

    return render(
      <Provider store={store}>
        <ColorModeContext.Provider value={{ toggleColorMode: mockToggleColorMode, mode: 'light' }}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              {component}
            </BrowserRouter>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    );
  };

  it('renders all navigation items', () => {
    renderWithProviders(<Navbar />);
    
    // Use getAllByText and check the first occurrence
    const inicioLinks = screen.getAllByText('Inicio');
    const inventariosLinks = screen.getAllByText('Inventarios');
    const catalogoLinks = screen.getAllByText('Catálogo');
    
    expect(inicioLinks[0]).toBeInTheDocument();
    expect(inventariosLinks[0]).toBeInTheDocument();
    expect(catalogoLinks[0]).toBeInTheDocument();
  });

  it('toggles theme when clicking theme button', () => {
    renderWithProviders(<Navbar />);
    
    // Update selector to match the actual implementation
    const themeButton = screen.getByRole('button', { name: '' }); // Empty name if no aria-label is set
    fireEvent.click(themeButton);
    
    expect(mockToggleColorMode).toHaveBeenCalled();
  });

  it('highlights active menu item', () => {
    renderWithProviders(<Navbar />);
    
    const homeLinks = screen.getAllByText('Inicio');
    const homeLink = homeLinks[0].closest('a');
    expect(homeLink).toHaveClass('Mui-selected');
  });

  it('renders logo correctly', () => {
    renderWithProviders(<Navbar />);
    
    const logos = screen.getAllByAltText('MediSupply Logo');
    expect(logos[0]).toBeInTheDocument();
  });
});
