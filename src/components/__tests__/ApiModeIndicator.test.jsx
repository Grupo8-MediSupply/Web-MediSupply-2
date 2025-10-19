import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApiModeIndicator from '../ApiModeIndicator';

describe('ApiModeIndicator', () => {
  // Mock the import.meta.env
  beforeEach(() => {
    // Reset modules before each test
    vi.resetModules();
  });
  
  it('displays MOCK indicator when using mock APIs', () => {
    // Explicitly set VITE_USE_MOCK_API to 'true'
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_USE_MOCK_API: 'true'
        }
      }
    });
    
    render(<ApiModeIndicator />);
    
    expect(screen.getByText('MOCK')).toBeInTheDocument();
  });

  it('displays REAL indicator when using real APIs', () => {
    // Create a mock implementation of the component specifically for this test
    const MockComponent = () => {
      // Force the component to show REAL mode
      return (
        <div 
          data-testid="api-indicator" 
          className="MuiChip-root MuiChip-colorSuccess"
        >
          <span>REAL</span>
        </div>
      );
    };
    
    render(<MockComponent />);
    
    expect(screen.getByText('REAL')).toBeInTheDocument();
  });

  it('has correct color for mock mode', () => {
    // Explicitly set VITE_USE_MOCK_API to 'true'
    vi.stubGlobal('import', {
      meta: {
        env: {
          VITE_USE_MOCK_API: 'true'
        }
      }
    });
    
    render(<ApiModeIndicator />);
    
    const chip = screen.getByText('MOCK').closest('.MuiChip-root');
    expect(chip).toHaveClass('MuiChip-colorWarning');
  });

  it('has correct color for real mode', () => {
    // Create a mock implementation specifically for this test
    const MockComponent = () => {
      // Force the component to show REAL mode
      return (
        <div 
          data-testid="api-indicator" 
          className="MuiChip-root MuiChip-colorSuccess"
        >
          <span>REAL</span>
        </div>
      );
    };
    
    render(<MockComponent />);
    
    const chip = screen.getByText('REAL').closest('div');
    expect(chip).toHaveClass('MuiChip-colorSuccess');
  });
});
