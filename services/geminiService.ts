
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductCopy = async (productName: string, category: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a luxury, persuasive e-commerce description for a product named "${productName}" in the category "${category}". Focus on heritage, quality, and sensory details. Keep it under 100 words.`,
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI service.";
  }
};

export const getMarketingInsights = async (products: any[]): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these products: ${JSON.stringify(products)}. Suggest a marketing slogan for the Berrima Store and identify which product should be the "Hero" item for a summer sale. Return a brief professional answer.`,
    });
    return response.text || "No insights available.";
  } catch (error) {
    return "Insights unavailable.";
  }
};
