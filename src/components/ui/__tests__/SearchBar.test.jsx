import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders search input and buttons', () => {
    render(
      <SearchBar 
        value="" 
        onChange={() => {}} 
        onSearch={() => {}} 
        onClear={() => {}} 
      />
    );

    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /limpiar filtros/i })).toBeInTheDocument();
  });

  it('calls onChange when typing in the search input', () => {
    const handleChange = vi.fn();
    
    render(
      <SearchBar 
        value="" 
        onChange={handleChange} 
        onSearch={() => {}} 
        onClear={() => {}} 
      />
    );

    const searchInput = screen.getByPlaceholderText('Buscar por nombre...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when search button is clicked', () => {
    const handleSearch = vi.fn();
    
    render(
      <SearchBar 
        value="test" 
        onChange={() => {}} 
        onSearch={handleSearch} 
        onClear={() => {}} 
      />
    );

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);
    
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onClear when clear filters button is clicked', () => {
    const handleClear = vi.fn();
    
    render(
      <SearchBar 
        value="test" 
        onChange={() => {}} 
        onSearch={() => {}} 
        onClear={handleClear} 
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar filtros/i });
    fireEvent.click(clearButton);
    
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('displays the correct search value', () => {
    const searchValue = 'búsqueda de prueba';
    
    render(
      <SearchBar 
        value={searchValue} 
        onChange={() => {}} 
        onSearch={() => {}} 
        onClear={() => {}} 
      />
    );

    const searchInput = screen.getByPlaceholderText('Buscar por nombre...');
    expect(searchInput).toHaveValue(searchValue);
  });
});
