
import { GoogleGenAI, Type } from "@google/genai";
import { AIInsights } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIInsights = async (word: string): Promise<AIInsights> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide learning insights and translation for the word "${word}". 
      Include:
      1. Hindi translation (Hindi meaning).
      2. EXACTLY 5 diverse example sentences in English and their Hindi translations. Make them cover different contexts (e.g., formal, casual, workplace, academic).
      3. A creative mnemonic device.
      4. Brief etymology.
      5. Practical usage tip.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hindiMeaning: { type: Type.STRING, description: "The primary Hindi translation of the word." },
            examples: {
              type: Type.ARRAY,
              description: "5 different examples in English and Hindi.",
              items: {
                type: Type.OBJECT,
                properties: {
                  english: { type: Type.STRING },
                  hindi: { type: Type.STRING }
                },
                required: ["english", "hindi"]
              }
            },
            mnemonic: { type: Type.STRING, description: "A creative memory aid." },
            etymology: { type: Type.STRING, description: "Brief origin." },
            usageTip: { type: Type.STRING, description: "How to use the word." }
          },
          required: ["hindiMeaning", "examples", "mnemonic", "etymology", "usageTip"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Insights Error:", error);
    return {
      hindiMeaning: "अनुवाद उपलब्ध नहीं है",
      examples: [
        { english: "Knowledge is power.", hindi: "ज्ञान ही शक्ति है।" },
        { english: "Try to use this word in a sentence.", hindi: "इस शब्द को एक वाक्य में प्रयोग करने का प्रयास करें।" },
        { english: "Practice makes perfect.", hindi: "अभ्यास ही मनुष्य को पूर्ण बनाता है।" },
        { english: "Learning never stops.", hindi: "सीखना कभी नहीं रुकता।" },
        { english: "Keep searching for new words.", hindi: "नए शब्दों की खोज जारी रखें।" }
      ],
      mnemonic: "Learn by repetition!",
      etymology: "Check dictionary for origins.",
      usageTip: "Use it in your next conversation."
    };
  }
};
