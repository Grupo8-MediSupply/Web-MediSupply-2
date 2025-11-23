import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SeverityChip from '../SeverityChip';

describe('SeverityChip', () => {
  it('renders with ALTA severity', () => {
    render(<SeverityChip severity="ALTA" />);
    expect(screen.getByText('ALTA')).toBeInTheDocument();
  });

  it('renders with MEDIA severity', () => {
    render(<SeverityChip severity="MEDIA" />);
    expect(screen.getByText('MEDIA')).toBeInTheDocument();
  });

  it('renders with BAJA severity', () => {
    render(<SeverityChip severity="BAJA" />);
    expect(screen.getByText('BAJA')).toBeInTheDocument();
  });

  it('renders N/A when no severity provided', () => {
    render(<SeverityChip />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
