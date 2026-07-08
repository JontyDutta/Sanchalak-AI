import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import LandingPage from './pages/LandingPage';

describe('LandingPage', () => {
  it('renders correctly and handles interactions', () => {
    const setDarkMode = vi.fn();
    const setLanguage = vi.fn();
    
    render(
      <BrowserRouter>
        <LandingPage setDarkMode={setDarkMode} darkMode={false} language="English" setLanguage={setLanguage} />
      </BrowserRouter>
    );

    expect(screen.getByText(/SANCHALAK/)).toBeInTheDocument();
    
    const langSelect = screen.getByLabelText('Select Language');
    fireEvent.change(langSelect, { target: { value: 'Hindi' } });
    expect(setLanguage).toHaveBeenCalledWith('Hindi');

    const darkModeBtn = screen.getByLabelText('Switch to Dark Mode');
    fireEvent.click(darkModeBtn);
    expect(setDarkMode).toHaveBeenCalledWith(true);
    
    const archBtn = screen.getByLabelText('View System Architecture');
    fireEvent.click(archBtn);
    expect(screen.getByText(/Production System Architecture/)).toBeInTheDocument();
  });
});
