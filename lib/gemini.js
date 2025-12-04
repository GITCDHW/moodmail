import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI;

const initializeGemini = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Google Gemini API Key is not set. Please ensure GEMINI_API_KEY is configured in your .env.local file.');
  }
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// Ensure Gemini is initialized once
try {
  initializeGemini();
} catch (error) {
  console.error("Gemini Initialization Error: ", error.message);
}

export async function generateRewrite(text, mood) {
  if (!genAI) {
    throw new Error('Google Gemini AI is not initialized. Check server logs for API key configuration.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Rewrite the following text in a ${mood} tone, ensuring it maintains the core meaning but completely transforms the style and delivery. Focus on capturing the essence of the '${mood}' mood. If the original text is already very short, expand it slightly while maintaining the specified mood.

Original Text:
"""
${text}
"""

Rewritten Text (in ${mood} tone):`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rewrittenText = response.text();
    return rewrittenText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(`Gemini API call failed: ${error.message}`);
  }
}
