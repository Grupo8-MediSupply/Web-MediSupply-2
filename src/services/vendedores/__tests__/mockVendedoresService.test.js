import { describe, it, expect, vi, beforeEach } from 'vitest';
import mockVendedoresService from '../mockVendedoresService';

// Helper to create a mock JWT token
const createMockToken = (pais = '10') => {
  const payload = btoa(JSON.stringify({ pais }));
  return `header.${payload}.signature`;
};

describe('mockVendedoresService', () => {
  // Setup and teardown
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('createVendedor', () => {
    it('should create a vendedor with correct data', async () => {
      // Arrange
      const mockVendedorData = { nombre: 'Test', email: 'test@example.com' };
      localStorage.setItem('access_token', createMockToken('10'));
      
      // Act
      const response = await mockVendedoresService.createVendedor(mockVendedorData);
      
      // Assert
      expect(response.success).toBe(true);
      expect(response.result).toBeDefined();
      expect(response.result.email).toBe(mockVendedorData.email);
      expect(response.result.paisCreacion).toBe('10');
    });

    it('should use the country from JWT token', async () => {
      // Arrange
      const mockVendedorData = { nombre: 'Test', email: 'test@example.com' };
      localStorage.setItem('access_token', createMockToken('20'));
      
      // Act
      const response = await mockVendedoresService.createVendedor(mockVendedorData);
      
      // Assert
      expect(response.result.paisCreacion).toBe('20');
    });

    it('should return error for missing required fields', async () => {
      // Arrange
      const mockVendedorData = { nombre: 'Test' }; // Missing email
      
      // Act
      const response = await mockVendedoresService.createVendedor(mockVendedorData);
      
      // Assert
      expect(response.success).toBe(false);
      expect(response.message).toContain('campos requeridos');
      expect(response.status).toBe(400);
    });
    
    it('should default to Colombia if no token exists', async () => {
      // Arrange
      const mockVendedorData = { nombre: 'Test', email: 'test@example.com' };
      // No token in localStorage
      
      // Act
      const response = await mockVendedoresService.createVendedor(mockVendedorData);
      
      // Assert
      // Since we're now explicitly checking that the value is defaulted to '10'
      expect(response.result.paisCreacion).toBe('10'); // Default to Colombia (10)
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
