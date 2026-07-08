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

  it('should handle Fan role', async () => {
    const response = await getGeminiResponse('Fan', 'Hello', 'English');
    expect(response).toBe('Mocked AI Response');
  });

  it('should handle Volunteer role', async () => {
    const response = await getGeminiResponse('Volunteer', 'Help', 'Spanish');
    expect(response).toBe('Mocked AI Response');
  });

  it('should handle Organizer role', async () => {
    const response = await getGeminiResponse('Organizer', 'Status');
    expect(response).toBe('Mocked AI Response');
  });

  it('should handle Security role', async () => {
    const response = await getGeminiResponse('Security', 'Alert');
    expect(response).toBe('Mocked AI Response');
  });


});
