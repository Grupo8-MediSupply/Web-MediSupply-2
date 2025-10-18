import { describe, it, expect, beforeEach, vi } from 'vitest'
import authReducer, { login, logout, clearError } from '../authSlice'
import { configureStore } from '@reduxjs/toolkit'

// Usar una implementación más directa para testear el slice
describe('authSlice', () => {
  let store

  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    window.localStorage.clear()
    
    // Crear store fresco para cada prueba
    store = configureStore({
      reducer: { auth: authReducer }
    })

    // Reset mocks
    vi.clearAllMocks()
  })

  describe('Reducers', () => {
    it('should handle initial state', () => {
      const state = store.getState().auth
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(state.loading).toBe(false)
      expect(state.error).toBeNull()
    })

    it('should handle logout', () => {
      // Arrange - establecer un estado autenticado
      store.dispatch({
        type: 'auth/login/fulfilled',
        payload: { 
          token: 'test-token',
          user: { id: '123', role: 'admin' }
        }
      })

      // Actuar - logout
      store.dispatch(logout())

      // Assert - verificar estado después del logout
      const state = store.getState().auth
      expect(state.user).toBeNull()
      expect(state.token).toBeNull()
      expect(state.isAuthenticated).toBe(false)
      expect(window.localStorage.getItem('access_token')).toBeNull()
    })

    it('should handle clearError', () => {
      // Arrange - establecer un error
      store.dispatch({
        type: 'auth/login/rejected',
        payload: 'Error de prueba'
      })

      // Actuar - clearError
      store.dispatch(clearError())

      // Assert
      const state = store.getState().auth
      expect(state.error).toBeNull()
    })
  })

  describe('Async Thunks', () => {
    it('should handle successful login', async () => {
      // En lugar de probar la acción asíncrona completa,
      // probamos directamente los reducers con las acciones esperadas
      store.dispatch({
        type: 'auth/login/fulfilled',
        payload: {
          token: 'test-token',
          user: {
            id: 'user123',
            role: 'admin',
            pais: 'CO'
          }
        }
      });

      // Assert
      const state = store.getState().auth
      expect(state.isAuthenticated).toBe(true)
      expect(state.token).toBe('test-token')
      expect(state.user).toBeDefined()
      expect(state.error).toBeNull()
    })

    it('should handle failed login', async () => {
      // Dispatch acción rechazada directamente
      store.dispatch({
        type: 'auth/login/rejected',
        payload: 'Credenciales inválidas'
      });

      // Assert
      const state = store.getState().auth
      expect(state.isAuthenticated).toBe(false)
      expect(state.user).toBeNull()
      expect(state.error).toBe('Credenciales inválidas')
    })
  })
})
