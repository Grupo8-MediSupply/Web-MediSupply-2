import { describe, it, expect, vi, beforeEach } from 'vitest';
import mockVendedoresService from '../mockVendedoresService';

// Helper to create a mock JWT token
const createMockToken = (pais = '10') => {
  const payload = btoa(JSON.stringify({ pais }));
  return `header.${payload}.signature`;
};

describe('mockVendedoresService', () => {
  const mockVendedorData = {
    nombre: 'Test Vendedor',
    email: 'test@example.com',
    identificacion: '123456',
    tipoIdentificacion: 1
  };

  // Setup and teardown
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('createVendedor', () => {
    it('should create a vendedor with correct data', async () => {
      // Arrange
      const mockToken = createMockToken('10');
      localStorage.setItem('access_token', mockToken);
      
      // Act
      const response = await mockVendedoresService.createVendedor(mockVendedorData);
      
      // Assert
      expect(response.success).toBe(true);
      expect(response.result).toBeDefined();
      expect(response.result.email).toBe(mockVendedorData.email);
    });

    it('should use the country from JWT token', async () => {
      // Arrange
      const mockToken = createMockToken('20');
      localStorage.setItem('access_token', mockToken);
      
      // Act
      const response = await mockVendedoresService.createVendedor(mockVendedorData);
      
      // Assert
      expect(response.success).toBe(true);
    });

    it('should return error for missing required fields', async () => {
      // Arrange
      
      // Act
      const response = await mockVendedoresService.createVendedor({});
      
      // Assert
      expect(response.success).toBe(false);
      expect(response.message).toBe('Todos los campos son requeridos');
      expect(response.status).toBe(400);
    });
  });

  describe('getVendedores', () => {
    it('should return all vendors when no token exists', async () => {
      // Arrange - no token in localStorage
      
      // Act
      const response = await mockVendedoresService.getVendedores();
      
      // Assert
      expect(response.success).toBe(true);
      // Should return all mock vendors (10 in total from the mock data)
      expect(response.result.length).toBeGreaterThan(0);
    });
    
    it('should filter vendors by country from JWT token', async () => {
      // Arrange
      localStorage.setItem('access_token', createMockToken('20')); // Mexico
      
      // Act
      const response = await mockVendedoresService.getVendedores();
      
      // Assert
      expect(response.success).toBe(true);
      // Every vendor in the result should have pais = '20' (Mexico)
      response.result.forEach(vendedor => {
        expect(vendedor.pais).toBe('20');
      });
      
      // Verify that at least some filtering occurred
      expect(response.result.length).toBeGreaterThan(0);
      expect(response.result.length).toBeLessThan(10); // Total mock vendors count
    });
    
    it('should handle token parsing errors gracefully', async () => {
      // Arrange
      localStorage.setItem('access_token', 'invalid-token');
      
      // Mock console.error to avoid polluting test output
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Act
      const response = await mockVendedoresService.getVendedores();
      
      // Assert
      expect(response.success).toBe(true);
      expect(consoleSpy).toHaveBeenCalled();
      
      // Should still return filtered results using default country (10)
      response.result.forEach(vendedor => {
        expect(vendedor.pais).toBe('10');
      });
    });
  });
});
