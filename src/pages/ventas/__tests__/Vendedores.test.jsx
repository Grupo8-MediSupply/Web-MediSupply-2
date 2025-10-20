import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Vendedores from '../Vendedores';
import { 
  fetchVendedores, 
  setFiltros, 
  clearFiltros 
} from '../../../redux/features/vendedoresSlice';

// Mock de las acciones
vi.mock('../../../redux/features/vendedoresSlice', async () => {
  const actual = await vi.importActual('../../../redux/features/vendedoresSlice');
  return {
    ...actual,
    fetchVendedores: vi.fn(),
    setFiltros: vi.fn(),
    clearFiltros: vi.fn()
  };
});

// Mock de componentes dependientes
vi.mock('../../../components/ventas/VendedoresTable', () => ({
  default: ({ vendedores }) => (
    <div data-testid="mock-vendedores-table">
      <div>Total vendedores: {vendedores.length}</div>
    </div>
  )
}));

vi.mock('../../../components/ui/SearchBar', () => ({
  default: ({ value, onChange, onSearch, onClear }) => (
    <div data-testid="mock-search-bar">
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        data-testid="search-input" 
      />
      <button onClick={onSearch} data-testid="search-button">Buscar</button>
      <button onClick={onClear} data-testid="clear-button">Limpiar</button>
    </div>
  )
}));

vi.mock('../../../components/ui/FilterBar', () => ({
  default: ({ filters, onChange }) => (
    <div data-testid="mock-filter-bar">
      {filters.map(filter => (
        <div key={filter.name}>
          <select 
            name={filter.name}
            value={filter.value}
            onChange={onChange}
            data-testid={`filter-${filter.name}`}
          >
            <option value="">{filter.emptyOptionText}</option>
            {filter.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}));

// Mock del componente RoleBasedComponent
vi.mock('../../../components/auth/RoleBasedComponent', () => ({
  default: ({ children }) => <div data-testid="mock-role-based">{children}</div>
}));

describe('Vendedores Page', () => {
  let store;

  // Mock data para el estado inicial con estructura completa
  const initialState = {
    vendedores: {
      vendedores: [
        { id: '123456', nombre: 'Edwin', territorio: 'Colombia', visitasCompletadas: 15, visitasProgramadas: 20 },
        { id: '234567', nombre: 'Juan', territorio: 'México', visitasCompletadas: 8, visitasProgramadas: 15 }
      ],
      status: 'succeeded',
      error: null,
      filtros: {
        territorio: '',
        equipo: ''
      }
    },
    auth: {
      user: {
        id: 'test-user',
        email: 'test@example.com',
        role: '1',
        pais: '10'
      },
      isAuthenticated: true
    }
  };

  // Helper function to create store with different states for specific tests
  const createTestStore = (overrideState = {}) => {
    return configureStore({
      reducer: {
        vendedores: () => ({
          ...initialState.vendedores,
          ...overrideState.vendedores
        }),
        auth: () => ({
          ...initialState.auth,
          ...overrideState.auth
        })
      }
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default store setup
    store = createTestStore();
    
    // Mock de las acciones
    fetchVendedores.mockImplementation(() => ({ type: 'vendedores/fetchVendedores' }));
    setFiltros.mockImplementation(filtro => ({ type: 'vendedores/setFiltros', payload: filtro }));
    clearFiltros.mockImplementation(() => ({ type: 'vendedores/clearFiltros' }));
  });

  it('renders the title correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    // Use a more specific selector to get the main heading
    const heading = screen.getByRole('heading', { name: 'Vendedores', level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('fetches vendedores on component mount', () => {
    // Create store with idle status to trigger fetch
    const idleStore = createTestStore({ 
      vendedores: { status: 'idle' }
    });
    
    render(
      <Provider store={idleStore}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    expect(fetchVendedores).toHaveBeenCalled();
  });

  it('renders search and filter components', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-filter-bar')).toBeInTheDocument();
  });

  it('renders the vendedores table with data', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByTestId('mock-vendedores-table')).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Edwin' } });
    
    // Verificar que se actualiza el valor de búsqueda
    expect(searchInput.value).toBe('Edwin');
  });

  it('clears filters when clear button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    // Simular clic en botón limpiar
    fireEvent.click(screen.getByTestId('clear-button'));
    
    // Verificar que se llama a la acción clearFiltros
    expect(clearFiltros).toHaveBeenCalled();
  });

  it('shows loading state when vendedores are loading', () => {
    // Create store with loading status
    const loadingStore = createTestStore({
      vendedores: { status: 'loading' }
    });
    
    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    // Verificar que se muestra el indicador de carga
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error message when loading vendedores fails', () => {
    // Create store with failed status and error
    const errorStore = createTestStore({
      vendedores: { 
        status: 'failed',
        error: 'Error al cargar vendedores'
      }
    });
    
    render(
      <Provider store={errorStore}>
        <BrowserRouter>
          <Vendedores />
        </BrowserRouter>
      </Provider>
    );
    
    // Verificar que se muestra el mensaje de error
    expect(screen.getByText(/Error al cargar/)).toBeInTheDocument();
  });
});
