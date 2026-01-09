
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface AuditInsight {
  vulnerability: string;
  recommendation: string;
  securityScore: number;
}

export const getAuditInsight = async (command: string): Promise<AuditInsight | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the security implications and ethical use cases for this Kali Linux WiFi command: ${command}. Provide a vulnerability analysis, a defense recommendation, and a security complexity score (1-100).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vulnerability: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            securityScore: { type: Type.NUMBER }
          },
          required: ["vulnerability", "recommendation", "securityScore"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const getScenarioExplanation = async (scenarioTitle: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a cybersecurity expert. Explain why the ${scenarioTitle} attack works, what its prerequisites are, and most importantly, how a system administrator can defend against it. Keep it technical but accessible.`,
    });
    return response.text || "No explanation available.";
  } catch (error) {
    return "Failed to fetch AI explanation.";
  }
};
