
import { GoogleGenAI } from "@google/genai";
import { CardStyle } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBlessingText = async (recipient: string, theme: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `받는 사람: ${recipient}\n주제: ${theme}\n이 정보를 바탕으로 따뜻하고 감동적인 축복의 메시지를 3-4문장 이내로 작성해줘. 시적이고 다정한 어조를 사용해줘.`,
    config: {
        temperature: 0.8,
    }
  });
  return response.text || "축복이 당신의 삶에 가득하길 바랍니다.";
};

const STYLE_PROMPTS: Record<CardStyle, string> = {
  watercolor: "soft warm watercolor illustration, bleeding colors, cozy, hand-painted aesthetic",
  minimalist: "clean minimalist illustration, simple lines, vast negative space, elegant and modern",
  popart: "vibrant pop art style, bold colors, high contrast, graphic design elements, cheerful",
  fantasy: "mystical fantasy art, glowing particles, ethereal lighting, magical atmosphere, dreamlike"
};

export const generateCardImage = async (theme: string, style: CardStyle): Promise<string> => {
  const ai = getAI();
  const styleDescription = STYLE_PROMPTS[style];
  const prompt = `An artistic illustration for a blessing card. Theme: ${theme}. Style: ${styleDescription}. High quality, professional art, no text on image.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4"
      }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      break;
    }
  }
  return imageUrl;
};

export const generateFigureImage = async (theme: string, recipient: string, style: CardStyle): Promise<string> => {
  const ai = getAI();
  const prompt = `A 3D isometric collectible miniature figure in a display case. The figure represents a blessing for ${recipient} with theme ${theme}. Aesthetic style influenced by ${style}. Studio lighting, clean background, premium toy/art toy aesthetic, adorable and highly detailed.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      break;
    }
  }
  return imageUrl;
};
