import { GoogleGenerativeAI } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";

export const stadiumData = {
  gates: {
    gateA: { name: 'Gate A (North)', currentCongestion: 85, capacity: 5000, waitTimeMinutes: 25 },
    gateB: { name: 'Gate B (East)', currentCongestion: 40, capacity: 5000, waitTimeMinutes: 8 },
    gateC: { name: 'Gate C (South)', currentCongestion: 60, capacity: 5000, waitTimeMinutes: 15 },
    gateD: { name: 'Gate D (West)', currentCongestion: 20, capacity: 5000, waitTimeMinutes: 4 },
  },
  facilities: {
    foodCourts: [
      { id: 'fc1', name: 'North Food Court', location: 'Level 1, Near Gate A', crowdLevel: 'High' },
      { id: 'fc2', name: 'South Food Court', location: 'Level 1, Near Gate C', crowdLevel: 'Low' },
      { id: 'fc3', name: 'VIP Lounge', location: 'Level 3, West Wing', crowdLevel: 'Medium' },
    ],
    medical: [
      { id: 'med1', name: 'Main First Aid', location: 'Ground Floor, Near Gate B', status: 'Available' },
      { id: 'med2', name: 'North Aid Station', location: 'Level 2, Section 214', status: 'Busy' },
    ],
    accessibility: [
      { id: 'acc1', name: 'Elevator Bank A', status: 'Operational', waitTime: '2 mins' },
      { id: 'acc2', name: 'Wheelchair Assistance Point', location: 'Gate D', status: 'Available' },
    ]
  },
  parking: {
    lot1: { name: 'VIP Parking', occupancyPercent: 95 },
    lot2: { name: 'General Parking North', occupancyPercent: 88 },
    lot3: { name: 'General Parking South', occupancyPercent: 45 },
  },
  incidents: [
    { id: 'inc1', type: 'Medical', location: 'Section B-214', status: 'Active', severity: 'High', timeReported: '10 mins ago' },
    { id: 'inc2', type: 'Lost Child', location: 'Gate C', status: 'Resolved', severity: 'Medium', timeReported: '45 mins ago' },
  ]
};

const getGateStatusDeclaration = {
  name: "get_gate_status",
  description: "Get the real-time congestion status of a specific gate",
  parameters: {
    type: SchemaType.OBJECT,
    properties: { gateId: { type: SchemaType.STRING, description: "Gate letter (A, B, C, or D)" } },
    required: ["gateId"],
  },
};

const reportIncidentDeclaration = {
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

export const getGeminiResponseBackend = async (role, prompt, language = 'English') => {
  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing on the server.");

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

  const fallbackModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash", "gemini-2.5-flash"];
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
          const args = call.args;
          const gateId = args.gateId;
          const gate = stadiumData.gates[gateId];
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
    } catch (error) {
      console.warn(`Model ${modelName} failed:`, error);
      lastError = error;
      
      const errorString = (error?.message || String(error)).toLowerCase();
      if (!errorString.includes('503') && !errorString.includes('429') && !errorString.includes('404') && !errorString.includes('quota') && !errorString.includes('overloaded')) {
        throw error;
      }
    }
  }

  console.error("All fallback models failed.");
  throw lastError;
};
