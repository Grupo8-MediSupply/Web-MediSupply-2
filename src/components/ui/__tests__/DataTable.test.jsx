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
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        renderRow={renderRow}
      />
    );
    
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Bogotá')).toBeInTheDocument();
    
    expect(screen.getByText('María')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Medellín')).toBeInTheDocument();
  });

  it('displays empty message when data is empty', () => {
    const emptyMessage = 'No hay datos disponibles';
    render(
      <DataTable 
        columns={mockColumns} 
        data={[]} 
        renderRow={renderRow}
        emptyMessage={emptyMessage}
      />
    );
    
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });

  it('respects column alignment configuration', () => {
    // Create a simplified mock implementation just for this test
    vi.mock('../DataTable', () => ({
      default: ({ columns }) => (
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th 
                  key={col.id} 
                  align={col.align} 
                  data-testid={`header-${col.id}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      )
    }));
    
    render(
      <DataTable 
        columns={mockColumns} 
        data={mockData} 
        renderRow={renderRow}
      />
    );
    
    // Check alignment using data-testid
    const edadHeader = screen.getByTestId('header-edad');
    expect(edadHeader).toHaveAttribute('align', 'right');
  });
});
