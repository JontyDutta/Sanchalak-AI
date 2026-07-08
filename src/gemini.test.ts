import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGeminiResponse } from './services/ai/gemini';

vi.stubGlobal('fetch', vi.fn());

describe('Gemini Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle successful response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Mocked AI Response' }),
    } as any);

    const response = await getGeminiResponse('Fan', 'Hello', 'English');
    expect(response).toBe('Mocked AI Response');
    expect(fetch).toHaveBeenCalledWith('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'Fan', prompt: 'Hello', language: 'English' }),
    });
  });

  it('should throw error when fetch fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Database connection failed' }),
    } as any);

    await expect(getGeminiResponse('Fan', 'Hello', 'English')).rejects.toThrow('Database connection failed');
  });

  it('should throw default error when response body is not JSON or has no error key', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => { throw new Error('Not JSON') },
    } as any);

    await expect(getGeminiResponse('Fan', 'Hello', 'English')).rejects.toThrow('HTTP error! status: 404');
  });
});
