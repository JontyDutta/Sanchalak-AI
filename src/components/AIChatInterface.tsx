import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../services/ai/gemini';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

interface Props {
  role: 'Fan' | 'Volunteer' | 'Organizer' | 'Security';
  language?: string;
}

export default function AIChatInterface({ role, language = 'English' }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: `Hello! I am your ${role} Copilot. How can I assist you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const responseText = await getGeminiResponse(role, textToSend, language);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: responseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: `Error connecting to AI: ${error.message}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleExternalMessage = (e: any) => {
      handleSend(undefined, e.detail);
    };
    window.addEventListener('send-ai-message', handleExternalMessage);
    return () => window.removeEventListener('send-ai-message', handleExternalMessage);
  }, [role]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-fifa-card rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-fifa-red p-4 text-white flex items-center gap-3">
        <Bot size={24} />
        <div>
          <h3 className="font-bold">{role} Copilot</h3>
          <p className="text-xs opacity-80">Powered by Gemini AI</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 flex gap-3 ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
            }`}>
              {msg.sender === 'ai' && <Bot size={20} className="shrink-0 mt-1" aria-hidden="true" />}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              {msg.sender === 'user' && <User size={20} className="shrink-0 mt-1" aria-hidden="true" />}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4 flex gap-3 items-center text-slate-500">
              <Bot size={20} aria-hidden="true" />
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm font-medium animate-pulse">Analyzing context & tools...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask the ${role} Copilot...`}
            aria-label={`Ask the ${role} Copilot`}
            autoFocus
            className="flex-1 bg-white dark:bg-fifa-dark border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fifa-red dark:text-white"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="bg-fifa-red hover:bg-red-700 text-white rounded-lg px-4 py-2 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
