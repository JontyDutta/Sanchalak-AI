import { GoogleGenerativeAI } from "@google/generative-ai";
import type { FunctionDeclaration } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";
import { stadiumData } from "../../data/mockData";

const getGateStatusDeclaration: FunctionDeclaration = {
  name: "get_gate_status",
  description: "Get the real-time congestion status of a specific gate",
  parameters: {
    type: SchemaType.OBJECT,
    properties: { gateId: { type: SchemaType.STRING, description: "Gate letter (A, B, C, or D)" } },
    required: ["gateId"],
  },
};

const reportIncidentDeclaration: FunctionDeclaration = {
  name: "report_incident",
  description: "Report a new security or medical incident to the command center",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      type: { type: SchemaType.STRING, description: "Type of incident (Security, Medical, Operational)" },
      location: { type: SchemaType.STRING, description: "Location of the incident" },
    },
    required: ["type", "location"],
  },
};

export const getGeminiResponse = async (role: string, prompt: string, language: string = 'English') => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("VITE_GEMINI_API_KEY is missing.");

  const genAI = new GoogleGenerativeAI(apiKey);
  
  let systemPrompt = `You must respond entirely in ${language}. `;
  switch(role) {
    case 'Fan':
      systemPrompt += `You are a helpful stadium assistant for a fan. Answer questions based on this live data: ${JSON.stringify(stadiumData)}. Focus on helping them find seats, food, and navigating. You can use tools to check specific gate status.`;
      break;
    case 'Volunteer':
      systemPrompt += `You are a Copilot for stadium volunteers. Use this live data: ${JSON.stringify(stadiumData)}. Guide them on handling issues.`;
      break;
    case 'Organizer':
      systemPrompt += `You are an Operational Intelligence AI. Analyze this live data: ${JSON.stringify(stadiumData)}. Give strategic recommendations.`;
      break;
    case 'Security':
      systemPrompt += `You are a Security Operations AI. Monitor this live data: ${JSON.stringify(stadiumData)}. Provide immediate protocols and report new incidents using your tools if requested.`;
      break;
  }

  const fallbackModels = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.5-flash"];
  let lastError;

  for (const modelName of fallbackModels) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        tools: [{ functionDeclarations: [getGateStatusDeclaration, reportIncidentDeclaration] }]
      });

      const chat = model.startChat({
        history: [{ role: "user", parts: [{ text: systemPrompt }] }, { role: "model", parts: [{ text: "Understood. I am ready." }] }]
      });

      let result = await chat.sendMessage(prompt);
      let calls = result.response.functionCalls();

      if (calls && calls.length > 0) {
        const call = calls[0];
        let functionResponse = {};
        
        if (call.name === 'get_gate_status') {
          const args = call.args as Record<string, string>;
          const gateId = args.gateId;
          const gates = stadiumData.gates as Record<string, unknown>;
          const gate = gates[gateId];
          functionResponse = gate ? gate : { error: "Gate not found" };
        } else if (call.name === 'report_incident') {
          functionResponse = { status: "Success", ticketId: "INC-" + Math.floor(Math.random() * 1000) };
        }

        result = await chat.sendMessage([{
          functionResponse: {
            name: call.name,
            response: functionResponse
          }
        }]);
      }

      return result.response.text();
    } catch (error: unknown) {
      const err = error as Error;
      console.warn(`Model ${modelName} failed:`, err);
      lastError = err;
      
      const errorString = (err?.message || String(err)).toLowerCase();
      // If it's a critical error (not a quota/capacity issue), throw immediately
      if (!errorString.includes('503') && !errorString.includes('429') && !errorString.includes('404') && !errorString.includes('quota') && !errorString.includes('overloaded')) {
        throw err;
      }
      // Otherwise, continue to the next fallback model
    }
  }

  console.error("All fallback models failed.");
  throw lastError;
};
