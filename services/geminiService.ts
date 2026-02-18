
import { GoogleGenAI, Type } from "@google/genai";
import { OraclePrompt, Ritual } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateOraclePrompt = async (): Promise<OraclePrompt> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate a short, poetic, deeply philosophical question or prompt for two strangers standing near each other on Valentine's day. Max 15 words.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          phrase: { type: Type.STRING }
        },
        required: ["phrase"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    return { phrase: "Tell each other about a dream you never shared." };
  }
};

export const generateRitual = async (): Promise<Ritual> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Create a 7-minute 'Parallel Universe' ritual for two strangers. It should be experiential and focus on presence, not sharing digital data. Examples: silence, walking rhythm, looking at clouds.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          instructions: { type: Type.STRING }
        },
        required: ["title", "instructions"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return { 
      title: "Silent Synchronization", 
      instructions: "Walk together for 4 minutes without speaking, focusing solely on the rhythm of each other's footsteps." 
    };
  }
};
