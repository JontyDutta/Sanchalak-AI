import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

vi.mock('./services/ai/gemini', () => ({
  getGeminiResponse: vi.fn()
}))

describe('App Component', () => {
  it('renders the landing page initially', async () => {
    render(<App />)
    expect(await screen.findByText(/SANCHALAK/i)).toBeInTheDocument()
  })
})
