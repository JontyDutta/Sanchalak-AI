import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGeminiResponse } from './services/ai/gemini';
import { GoogleGenerativeAI } from '@google/generative-ai';

vi.mock('@google/generative-ai', async (importOriginal) => {
  const actual = await importOriginal();
  const mockGenerateContent = vi.fn().mockResolvedValue({
    response: { 
      text: () => 'Mocked AI Response',
      functionCalls: () => null
    }
  });
  return {
    ...actual as any,
    GoogleGenerativeAI: class {
      getGenerativeModel() {
        return {
          startChat: vi.fn().mockReturnValue({
            sendMessage: mockGenerateContent
          })
        };
      }
    }
  };
});

describe('Gemini Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return valid AI response', async () => {
    const response = await getGeminiResponse('Fan', 'Hello', 'English', []);
    expect(response).toBe('Mocked AI Response');
  });

  it('should gracefully handle empty prompt', async () => {
    const response = await getGeminiResponse('Fan', '', 'English', []);
    expect(response).toContain('Mocked AI Response');
  });
});
