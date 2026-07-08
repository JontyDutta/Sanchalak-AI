window.HTMLElement.prototype.scrollIntoView = function() {};
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import SecurityDashboard from './pages/SecurityDashboard';

describe('SecurityDashboard', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <SecurityDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Security Command/)).toBeInTheDocument();
  });
});
