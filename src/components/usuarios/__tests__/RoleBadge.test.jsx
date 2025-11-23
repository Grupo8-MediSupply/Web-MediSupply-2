import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RoleBadge, { ROLES } from '../RoleBadge';

describe('RoleBadge', () => {
  it('renders Super Admin role', () => {
    render(<RoleBadge rolId={1} />);
    expect(screen.getByText('Super Admin')).toBeInTheDocument();
  });

  it('renders Vendedor role', () => {
    render(<RoleBadge rolId={20} />);
    expect(screen.getByText('Vendedor')).toBeInTheDocument();
  });

  it('renders Cliente role', () => {
    render(<RoleBadge rolId={30} />);
    expect(screen.getByText('Cliente')).toBeInTheDocument();
  });

  it('renders Proveedor role', () => {
    render(<RoleBadge rolId={40} />);
    expect(screen.getByText('Proveedor')).toBeInTheDocument();
  });

  it('renders unknown role with ID', () => {
    render(<RoleBadge rolId={999} />);
    expect(screen.getByText('Rol 999')).toBeInTheDocument();
  });

  it('has correct roles mapping', () => {
    expect(ROLES[1].label).toBe('Super Admin');
    expect(ROLES[20].label).toBe('Vendedor');
    expect(ROLES[30].label).toBe('Cliente');
    expect(ROLES[40].label).toBe('Proveedor');
  });
});
