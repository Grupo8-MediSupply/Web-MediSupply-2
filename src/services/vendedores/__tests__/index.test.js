import { describe, it, expect, vi, beforeEach } from 'vitest';
import vendedoresService from '../index';
import realVendedoresService from '../vendedoresService';
import mockVendedoresService from '../mockVendedoresService';

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_USE_MOCK_API: 'true'
  }
}), { virtual: true });

describe('vendedoresService index', () => {
  it('should export the correct service based on environment settings', () => {
    // In our mocked environment, we set USE_MOCK_API to true
    expect(vendedoresService).toBe(mockVendedoresService);
    
    // To test the real service path, we would need to modify the mock:
    vi.mock('import.meta', () => ({
      env: {
        VITE_USE_MOCK_API: 'false'
      }
    }), { virtual: true });
    
    // Note: Due to how mocking works in Vitest/Jest, this would need to be 
    // tested in a separate file to properly reset the environment
  });

  it('should have the required service methods', () => {
    expect(typeof vendedoresService.createVendedor).toBe('function');
    expect(typeof vendedoresService.getVendedores).toBe('function');
  });
});
