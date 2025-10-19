import { useState, useCallback } from 'react';

/**
 * Hook para manejar la lógica de búsqueda y filtrado
 * @param {Array} initialData - Datos iniciales
 * @param {Function} filterFunction - Función para filtrar los datos
 */
function useSearch(initialData, filterFunction) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(initialData);

  // Actualizar el término de búsqueda
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(value, filters);
  }, [filters]);

  // Actualizar un filtro específico
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    setFilters(updatedFilters);
    applyFilters(searchTerm, updatedFilters);
  }, [searchTerm, filters]);

  // Aplicar todos los filtros
  const applyFilters = useCallback((search, filterValues) => {
    const result = filterFunction(initialData, search, filterValues);
    setFilteredData(result);
  }, [initialData, filterFunction]);

  // Limpiar todos los filtros
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({});
    setFilteredData(initialData);
  }, [initialData]);

  // Ejecutar búsqueda manualmente
  const executeSearch = useCallback(() => {
    applyFilters(searchTerm, filters);
  }, [searchTerm, filters, applyFilters]);

  return {
    searchTerm,
    filters,
    filteredData,
    handleSearchChange,
    handleFilterChange,
    executeSearch,
    clearFilters,
    setFilters
  };
}

export default useSearch;
