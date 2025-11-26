import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PosterData } from "../types";

// Initialize the API client
// Note: In a real Vercel deployment, ensure API_KEY is set in environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const posterSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A short, catchy, punchy main headline for the poster (max 5 words).",
    },
    tagline: {
      type: Type.STRING,
      description: "A persuasive sub-headline or tagline (max 10 words).",
    },
    description: {
      type: Type.STRING,
      description: "A brief paragraph providing details (2-3 sentences).",
    },
    primaryColor: {
      type: Type.STRING,
      description: "A hex color code for the main text elements, ensuring high contrast with background.",
    },
    secondaryColor: {
      type: Type.STRING,
      description: "A hex color code for accents or secondary text.",
    },
    backgroundColor: {
      type: Type.STRING,
      description: "A hex color code for the poster background.",
    },
    fontStyle: {
      type: Type.STRING,
      enum: ["sans", "serif", "mono"],
      description: "The suggested font style family.",
    },
  },
  required: ["title", "tagline", "description", "primaryColor", "secondaryColor", "backgroundColor", "fontStyle"],
};

export const generatePosterContent = async (topic: string): Promise<PosterData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a creative digital poster design for the following topic/event: "${topic}". 
      Make the copy engaging, modern, and marketing-oriented. 
      Select colors that convey the mood of the topic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: posterSchema,
        temperature: 0.8, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as PosterData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
