window.HTMLElement.prototype.scrollIntoView = function() {};
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AIChatInterface from './components/AIChatInterface';
import { getGeminiResponse } from './services/ai/gemini';

vi.mock('./services/ai/gemini', () => ({
  getGeminiResponse: vi.fn(),
}));

describe('AIChatInterface', () => {
  it('handles user sending message successfully', async () => {
    vi.mocked(getGeminiResponse).mockResolvedValueOnce('AI Response text');

    render(<AIChatInterface role="Fan" />);
    
    expect(screen.getByText(/Hello! I am your Fan Copilot/)).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Ask the Fan Copilot...');
    fireEvent.change(input, { target: { value: 'How is the crowd at Gate A?' } });

    const submitBtn = screen.getByLabelText('Send message');
    fireEvent.click(submitBtn);

    expect(screen.getByText('How is the crowd at Gate A?')).toBeInTheDocument();
    expect(screen.getByText('Analyzing context & tools...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('AI Response text')).toBeInTheDocument();
    });
  });

  it('handles user sending message error', async () => {
    vi.mocked(getGeminiResponse).mockRejectedValueOnce(new Error('Quota exceeded'));

    render(<AIChatInterface role="Fan" />);

    const input = screen.getByPlaceholderText('Ask the Fan Copilot...');
    fireEvent.change(input, { target: { value: 'Hello' } });

    const submitBtn = screen.getByLabelText('Send message');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Error connecting to AI: Quota exceeded')).toBeInTheDocument();
    });
  });

  it('listens to external custom events', async () => {
    vi.mocked(getGeminiResponse).mockResolvedValueOnce('Custom AI Response');

    render(<AIChatInterface role="Fan" />);

    fireEvent(window, new CustomEvent('send-ai-message', { detail: 'Quick question' }));

    expect(screen.getByText('Quick question')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Custom AI Response')).toBeInTheDocument();
    });
  });
});
