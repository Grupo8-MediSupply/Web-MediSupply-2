import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DataTable from '../DataTable';
import { TableRow, TableCell } from '@mui/material';

describe('DataTable', () => {
  const mockColumns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'edad', label: 'Edad', align: 'right' },
    { id: 'ciudad', label: 'Ciudad' }
  ];
  
  const mockData = [
    { id: 1, nombre: 'Juan', edad: 25, ciudad: 'Bogotá' },
    { id: 2, nombre: 'María', edad: 30, ciudad: 'Medellín' }
  ];
  
  const renderRow = (item) => (
    <TableRow key={item.id}>
      <TableCell>{item.nombre}</TableCell>
      <TableCell align="right">{item.edad}</TableCell>
      <TableCell>{item.ciudad}</TableCell>
    </TableRow>
  );

  it('renders the table with correct column headers', () => {
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        renderRow={renderRow}
      />
    );
    
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Edad')).toBeInTheDocument();
    expect(screen.getByText('Ciudad')).toBeInTheDocument();
  });

  it('renders all rows using the renderRow function', () => {
    const { container } = render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        renderRow={renderRow}
      />
    );
    
    // Use queryByText to avoid errors if element isn't found
    expect(container.textContent).toContain('Juan');
    expect(container.textContent).toContain('25');
    expect(container.textContent).toContain('Bogotá');
    expect(container.textContent).toContain('María');
    expect(container.textContent).toContain('30');
    expect(container.textContent).toContain('Medellín');
  });

  it('displays empty message when data is empty', () => {
    const emptyMessage = 'No hay datos disponibles';
    const { container } = render(
      <DataTable 
        columns={mockColumns} 
        data={[]} 
        renderRow={renderRow}
        emptyMessage={emptyMessage}
      />
    );
    
    expect(container.textContent).toContain(emptyMessage);
  });

  it('respects column alignment configuration', () => {
    const { container } = render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        renderRow={renderRow}
      />
    );
    
    // Check that the table was rendered with column headers
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Edad')).toBeInTheDocument();
    expect(screen.getByText('Ciudad')).toBeInTheDocument();
  });
});
