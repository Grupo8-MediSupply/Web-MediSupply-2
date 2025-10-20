import { describe, it, expect, vi, beforeEach } from 'vitest';
import vendedoresService from '../vendedoresService';
import * as apiClient from '../../apiClient';

// Mock the API client
vi.mock('../../apiClient', () => ({
  apiRequest: vi.fn(),
  withAuth: vi.fn(() => ({ headers: { 'Authorization': 'Bearer test-token' } }))
}));

describe('vendedoresService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createVendedor', () => {
    it('should call apiRequest with correct parameters', async () => {
      // Arrange
      const mockVendedorData = { nombre: 'Test', email: 'test@example.com' };
      const mockResponse = {
        success: true,
        result: {
          email: 'test@example.com',
          paisCreacion: '10'
        },
        timestamp: '2025-10-20T02:48:41.960Z'
      };
      
      apiClient.apiRequest.mockResolvedValue(mockResponse);
      const authHeaders = apiClient.withAuth();

      // Act
      const response = await vendedoresService.createVendedor(mockVendedorData);

      // Assert
      expect(apiClient.apiRequest).toHaveBeenCalledWith('/vendedores', {
        method: 'POST',
        body: JSON.stringify(mockVendedorData),
        ...authHeaders
      });
      expect(response).toEqual(mockResponse);
    });

    it('should propagate errors from the API', async () => {
      // Arrange
      const mockVendedorData = { nombre: 'Test', email: 'test@example.com' };
      const mockError = new Error('API error');
      
      apiClient.apiRequest.mockRejectedValue(mockError);

      // Act & Assert
      await expect(vendedoresService.createVendedor(mockVendedorData))
        .rejects.toThrow('API error');
    });
  });

  describe('getVendedores', () => {
    it('should call apiRequest with correct parameters', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        result: [
          { id: '123456', nombre: 'Test', territorio: 'Colombia' }
        ],
        timestamp: '2025-10-20T02:48:41.960Z'
      };
      
      apiClient.apiRequest.mockResolvedValue(mockResponse);
      const authHeaders = apiClient.withAuth();

      // Act
      const response = await vendedoresService.getVendedores();

      // Assert
      expect(apiClient.apiRequest).toHaveBeenCalledWith('/vendedores', {
        method: 'GET',
        ...authHeaders
      });
      expect(response).toEqual(mockResponse);
    });

    it('should propagate errors from the API', async () => {
      // Arrange
      const mockError = new Error('API error');
      
      apiClient.apiRequest.mockRejectedValue(mockError);

      // Act & Assert
      await expect(vendedoresService.getVendedores())
        .rejects.toThrow('API error');
    });
  });
});
