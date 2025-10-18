import { describe, it, expect, beforeEach } from 'vitest'
import mockAuthService from '../mockAuthService'

describe('mockAuthService', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('login', () => {
    it('should return success response for valid credentials', async () => {
      // Arrange
      const credentials = {
        email: 'admin@medisupply.com',
        password: 'admin123'
      }

      // Act
      const response = await mockAuthService.login(credentials)

      // Assert
      expect(response.success).toBe(true)
      expect(response.result).toBeDefined()
      expect(response.result.access_token).toBeDefined()
    })

    it('should return error for invalid email', async () => {
      // Arrange
      const credentials = {
        email: 'wrong@example.com',
        password: 'admin123'
      }

      // Act
      const response = await mockAuthService.login(credentials)

      // Assert
      expect(response.success).toBe(false)
      expect(response.message).toBe('Usuario no encontrado')
      expect(response.status).toBe(401)
    })

    it('should return error for invalid password', async () => {
      // Arrange
      const credentials = {
        email: 'admin@medisupply.com',
        password: 'wrongpassword'
      }

      // Act
      const response = await mockAuthService.login(credentials)

      // Assert
      expect(response.success).toBe(false)
      expect(response.message).toBe('Contraseña incorrecta')
      expect(response.status).toBe(401)
    })
  })

  describe('refreshToken', () => {
    it('should return error if no token exists', async () => {
      // Act
      const response = await mockAuthService.refreshToken()

      // Assert
      expect(response.success).toBe(false)
      expect(response.message).toBe('No hay sesión activa')
    })

    it('should return success if token exists', async () => {
      // Arrange
      window.localStorage.setItem('access_token', 'test-token')

      // Act
      const response = await mockAuthService.refreshToken()

      // Assert
      expect(response.success).toBe(true)
      expect(response.result.access_token).toBe('test-token')
    })
  })

  describe('logout', () => {
    it('should always return success response', async () => {
      // Act
      const response = await mockAuthService.logout()

      // Assert
      expect(response.success).toBe(true)
      expect(response.message).toBe('Sesión cerrada correctamente')
    })
  })
})
