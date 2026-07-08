window.HTMLElement.prototype.scrollIntoView = function() {};
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import VolunteerDashboard from './pages/VolunteerDashboard';

describe('VolunteerDashboard', () => {
  it('renders correctly and dispatches actions on click', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    render(
      <BrowserRouter>
        <VolunteerDashboard language="English" />
      </BrowserRouter>
    );

    expect(screen.getByText(/Volunteer Hub/)).toBeInTheDocument();

    const buttons = ['SOP Library', 'Ticketing Help', 'Lost & Found', 'Emergency'];
    buttons.forEach((btnText) => {
      const btn = screen.getByText(btnText);
      fireEvent.click(btn);
    });

    const items = ['Handling Lost Items', 'Directing Wheelchair Users'];
    items.forEach((itemText) => {
      const item = screen.getByText(itemText);
      fireEvent.click(item);
    });

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
