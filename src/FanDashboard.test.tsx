import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import FanDashboard from './pages/FanDashboard';

vi.mock('./components/AIChatInterface', () => ({
  default: () => <div data-testid="chat-interface">Chat</div>
}));

describe('Fan Dashboard', () => {
  it('renders interactive map correctly and handles actions', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    render(
      <BrowserRouter>
        <FanDashboard language="English" />
      </BrowserRouter>
    );
    expect(screen.getByText(/Interactive Map/i)).toBeInTheDocument();

    const findSeatBtn = screen.getByText('Find My Seat');
    fireEvent.click(findSeatBtn);

    const planExitBtn = screen.getByText('Plan Exit');
    fireEvent.click(planExitBtn);

    const accessibilityBtn = screen.getByText('Accessibility Options');
    fireEvent.click(accessibilityBtn);

    expect(dispatchSpy).toHaveBeenCalledTimes(3);
  });
});
