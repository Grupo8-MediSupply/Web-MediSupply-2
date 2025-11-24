import { describe, it, expect, vi, beforeEach } from 'vitest';
import proveedoresReducer, {
  fetchHistorialCompras,
  clearHistorialCompras
} from '../proveedoresSlice';

// Mock del API
vi.mock('../../api', () => ({
  default: {
    proveedores: {
      getHistorialCompras: vi.fn()
    }
  }
}));

describe('proveedoresSlice - historial de compras', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      proveedores: [],
      status: 'idle',
      error: null,
      filtros: { pais: '' },
      addStatus: 'idle',
      addError: null,
      historialCompras: [],
      historialStatus: 'idle',
      historialError: null
    };
  });

  it('should handle initial state', () => {
    expect(proveedoresReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearHistorialCompras', () => {
    const stateWithData = {
      ...initialState,
      historialCompras: [{ producto: 'test' }],
      historialStatus: 'succeeded',
      historialError: 'some error'
    };

    const newState = proveedoresReducer(stateWithData, clearHistorialCompras());
    
    expect(newState.historialCompras).toEqual([]);
    expect(newState.historialStatus).toBe('idle');
    expect(newState.historialError).toBeNull();
  });

  it('should handle fetchHistorialCompras.pending', () => {
    const action = { type: fetchHistorialCompras.pending.type };
    const state = proveedoresReducer(initialState, action);
    
    expect(state.historialStatus).toBe('loading');
  });

  it('should handle fetchHistorialCompras.fulfilled with array', () => {
    const compras = [
      { producto: 'Test 1', cantidad: 10 },
      { producto: 'Test 2', cantidad: 20 }
    ];
    
    const action = {
      type: fetchHistorialCompras.fulfilled.type,
      payload: compras
    };
    
    const state = proveedoresReducer(initialState, action);
    
    expect(state.historialStatus).toBe('succeeded');
    expect(state.historialCompras).toEqual(compras);
  });

  it('should handle fetchHistorialCompras.fulfilled with empty array', () => {
    const action = {
      type: fetchHistorialCompras.fulfilled.type,
      payload: []
    };
    
    const state = proveedoresReducer(initialState, action);
    
    expect(state.historialStatus).toBe('succeeded');
    expect(state.historialCompras).toEqual([]);
  });

  it('should handle fetchHistorialCompras.rejected', () => {
    const action = {
      type: fetchHistorialCompras.rejected.type,
      payload: 'Error al obtener historial'
    };
    
    const state = proveedoresReducer(initialState, action);
    
    expect(state.historialStatus).toBe('failed');
    expect(state.historialError).toBe('Error al obtener historial');
  });
});
