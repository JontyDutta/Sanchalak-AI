# Sanchalak AI - Operational Intelligence Copilot
**Submission for Challenge 4 Prompt Wars by Google for Developers**

## Problem Statement
Managing a massive event like the FIFA World Cup involves significant challenges in crowd control, emergency response, fan navigation, and operational efficiency. The challenge was to build an Agentic AI solution using Google Gemini that dynamically handles real-time crowd congestion, security incident reporting, and contextual interactions across diverse roles.

## Solution Overview
Sanchalak AI is a GenAI-enabled stadium operations platform that acts as a real-time decision-making assistant. It leverages multi-agent AI architecture to provide contextual, actionable intelligence to four distinct user groups: Fans, Volunteers, Organizers, and Security Staff.

## Architecture
- **Frontend:** React, Vite, Tailwind CSS
- **AI Engine:** Google Gemini API (Multi-agent router approach)
- **Data:** Simulated JSON datasets (for hackathon MVP)

## Core Features
- **Smart Stadium Navigation:** AI-powered routing for fans.
- **Personalized Exit Planner:** Safe post-match dispersal strategies.
- **Multilingual Support:** Chat in English, Hindi, Spanish, Arabic, French.
- **Organizer Dashboard:** Live heatmaps and AI operational recommendations.
- **Security Copilot:** Automated risk analysis for crowd bottlenecks.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Rename `.env.example` to `.env` and add your `VITE_GEMINI_API_KEY`.
4. Run `npm run dev` to start the development server.

## Future Scope
- Integration with live IoT sensors and CCTV analysis.
- Deployment on Firebase Functions and Firestore for live sync.
- Mobile App wrapper using React Native or Flutter.
