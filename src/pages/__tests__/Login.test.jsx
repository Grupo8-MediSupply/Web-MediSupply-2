import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import Login from '../Login'
import authReducer, { login, clearError } from '../../redux/features/authSlice'

// Mock de las acciones de autenticación
vi.mock('../../redux/features/authSlice', async () => {
  const actual = await vi.importActual('../../redux/features/authSlice')
  return {
    ...actual,
    login: vi.fn(),
    clearError: vi.fn()
  }
})

// Mock de useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ state: { from: { pathname: '/' } } })
  }
})

describe('Login Component', () => {
  let store

  beforeEach(() => {
    // Reiniciar mocks
    vi.clearAllMocks()

    // Crear store con estado inicial
    store = configureStore({
      reducer: {
        auth: authReducer
      }
    })

    // Configurar mocks para login y clearError
    login.mockImplementation(() => ({ type: 'auth/login' }))
    clearError.mockImplementation(() => ({ type: 'auth/clearError' }))
  })

  it('should render login form correctly', () => {
    // Arrange & Act
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    // Assert
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('should show validation errors when submitting empty form', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    // Act
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    // Assert
    await waitFor(() => {
      expect(screen.getByText('El nombre de usuario es obligatorio')).toBeInTheDocument()
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument()
    })
    expect(login).not.toHaveBeenCalled()
  })

  it('should dispatch login action when form is valid', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    // Act - Completar el formulario y enviarlo
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    // Assert
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'password123'
      })
    })
  })

  it('should toggle password visibility when clicking the eye icon', () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )

    const passwordInput = screen.getByLabelText(/contraseña/i)
    
    // Comprobar que inicialmente el tipo es password (oculto)
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    // Act - Click en el icono del ojo
    const visibilityButton = screen.getByRole('button', { name: /toggle password visibility/i })
    fireEvent.click(visibilityButton)
    
    // Assert - Comprobar que ahora es visible (tipo text)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    // Act - Click nuevamente para ocultar
    fireEvent.click(visibilityButton)
    
    // Assert - Comprobar que vuelve a estar oculto
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
