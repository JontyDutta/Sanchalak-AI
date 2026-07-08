window.HTMLElement.prototype.scrollIntoView = function() {};
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import VolunteerDashboard from './pages/VolunteerDashboard';

describe('VolunteerDashboard', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <VolunteerDashboard language="English" />
      </BrowserRouter>
    );
    expect(screen.getByText(/Volunteer Hub/)).toBeInTheDocument();
  });
});
