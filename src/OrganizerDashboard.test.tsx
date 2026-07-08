window.HTMLElement.prototype.scrollIntoView = function() {};
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import OrganizerDashboard from './pages/OrganizerDashboard';

describe('OrganizerDashboard', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <OrganizerDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Command Center/)).toBeInTheDocument();
  });
});
