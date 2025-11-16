import { describe, it, expect, vi, beforeEach } from 'vitest';
import catalogoService from '../catalogoService';
import * as apiClient from '../../apiClient';

vi.mock('../../apiClient', () => ({
  apiRequest: vi.fn(),
  withAuth: vi.fn(() => ({ headers: { 'Authorization': 'Bearer test-token' } }))
}));

describe('catalogoService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('solicitarLote', () => {
    it('should call apiRequest with correct parameters', async () => {
      const mockLoteData = [
        { sku: 'MED-203', cantidad: 65 },
        { sku: 'EQP-003', cantidad: 200 }
      ];
      
      const mockResponse = {
        success: true,
        timestamp: '2025-11-16T19:53:01.823Z'
      };

      apiClient.apiRequest.mockResolvedValue(mockResponse);
      const authHeaders = apiClient.withAuth();

      const response = await catalogoService.solicitarLote(mockLoteData);

      expect(apiClient.apiRequest).toHaveBeenCalledWith('/producto/solicitar-lote', {
        method: 'POST',
        body: JSON.stringify(mockLoteData),
        ...authHeaders
      });
      expect(response).toEqual(mockResponse);
    });

    it('should propagate errors from the API', async () => {
      const mockLoteData = [{ sku: 'MED-203', cantidad: 65 }];
      const mockError = new Error('API error');

      apiClient.apiRequest.mockRejectedValue(mockError);

      await expect(catalogoService.solicitarLote(mockLoteData))
        .rejects.toThrow('API error');
    });
  });
});
