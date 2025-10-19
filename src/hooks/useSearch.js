import { useState, useCallback, useEffect } from 'react';

/**
 * Hook para manejar la lógica de búsqueda y filtrado
 * @param {Array} initialData - Datos iniciales
 * @param {Function} filterFunction - Función para filtrar los datos
 */
function useSearch(initialData, filterFunction) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(initialData || []);
  const [currentData, setCurrentData] = useState(initialData || []);

  // Actualizar datos internos cuando cambian los datos iniciales
  useEffect(() => {
    setCurrentData(initialData || []);
    // Volver a aplicar filtros con los nuevos datos
    if (searchTerm || Object.keys(filters).length > 0) {
      const result = filterFunction(initialData || [], searchTerm, filters);
      setFilteredData(result);
    } else {
      setFilteredData(initialData || []);
    }
  }, [initialData, filterFunction, searchTerm, filters]);

  // Actualizar el término de búsqueda
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const result = filterFunction(currentData, value, filters);
    setFilteredData(result);
  }, [filters, currentData, filterFunction]);

  // Actualizar un filtro específico
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    setFilters(updatedFilters);
    const result = filterFunction(currentData, searchTerm, updatedFilters);
    setFilteredData(result);
  }, [searchTerm, filters, currentData, filterFunction]);

  // Limpiar todos los filtros
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({});
    setFilteredData(currentData);
  }, [currentData]);

  // Ejecutar búsqueda manualmente
  const executeSearch = useCallback(() => {
    const result = filterFunction(currentData, searchTerm, filters);
    setFilteredData(result);
  }, [searchTerm, filters, currentData, filterFunction]);

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
