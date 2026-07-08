import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import FanDashboard from './pages/FanDashboard';

vi.mock('./components/AIChatInterface', () => ({
  default: () => <div data-testid="chat-interface">Chat</div>
}));

describe('Fan Dashboard', () => {
  it('renders interactive map correctly', () => {
    render(
      <BrowserRouter>
        <FanDashboard language="English" />
      </BrowserRouter>
    );
    expect(screen.getByText(/Interactive Map/i)).toBeInTheDocument();
  });

  it('renders chat interface', () => {
    render(
      <BrowserRouter>
        <FanDashboard language="English" />
      </BrowserRouter>
    );
    expect(screen.getByTestId('chat-interface')).toBeInTheDocument();
  });
});
