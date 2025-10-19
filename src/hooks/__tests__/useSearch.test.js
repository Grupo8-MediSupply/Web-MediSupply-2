import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSearch from '../useSearch';

describe('useSearch Hook', () => {
  const mockData = [
    { id: 1, name: 'Producto A', category: 'Categoría 1' },
    { id: 2, name: 'Producto B', category: 'Categoría 2' },
    { id: 3, name: 'Producto C', category: 'Categoría 1' }
  ];
  
  const mockFilterFunction = (data, searchTerm, filters) => {
    return data.filter(item => {
      // Filtro por término de búsqueda
      const nameMatch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro por categoría
      const categoryMatch = !filters.category || item.category === filters.category;
      
      return nameMatch && categoryMatch;
    });
  };

  it('initializes with the provided data', () => {
    const { result } = renderHook(() => useSearch(mockData, mockFilterFunction));
    
    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.filters).toEqual({});
  });

  it('filters data when search term changes', () => {
    const { result } = renderHook(() => useSearch(mockData, mockFilterFunction));
    
    act(() => {
      // Simular cambio en el término de búsqueda
      result.current.handleSearchChange({ target: { value: 'Producto A' } });
    });
    
    // Verificar que los datos filtrados contengan solo "Producto A"
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Producto A');
  });

  it('filters data when filters change', () => {
    const { result } = renderHook(() => useSearch(mockData, mockFilterFunction));
    
    act(() => {
      // Simular cambio en el filtro de categoría
      result.current.handleFilterChange({ 
        target: { name: 'category', value: 'Categoría 1' } 
      });
    });
    
    // Verificar que los datos filtrados contengan solo productos de "Categoría 1"
    expect(result.current.filteredData).toHaveLength(2);
    expect(result.current.filteredData.every(item => item.category === 'Categoría 1')).toBe(true);
  });

  it('clears filters and returns to initial data', () => {
    const { result } = renderHook(() => useSearch(mockData, mockFilterFunction));
    
    // Primero aplicar filtros
    act(() => {
      result.current.handleSearchChange({ target: { value: 'Producto' } });
      result.current.handleFilterChange({ 
        target: { name: 'category', value: 'Categoría 1' } 
      });
    });
    
    // Luego limpiar filtros
    act(() => {
      result.current.clearFilters();
    });
    
    // Verificar que se hayan limpiado los filtros y se muestren todos los datos
    expect(result.current.searchTerm).toBe('');
    expect(result.current.filters).toEqual({});
    expect(result.current.filteredData).toEqual(mockData);
  });

  it('executes search manually', () => {
    const { result } = renderHook(() => useSearch(mockData, mockFilterFunction));
    
    act(() => {
      result.current.handleSearchChange({ target: { value: 'Producto B' } });
    });
    
    // Ejecutar búsqueda manualmente
    act(() => {
      result.current.executeSearch();
    });
    
    // Verificar que los datos se filtren correctamente
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Producto B');
  });
});
