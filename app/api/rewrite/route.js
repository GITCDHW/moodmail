import { NextResponse } from 'next/server';
import { generateRewrite } from '@/lib/gemini';

export async function POST(request) {
  try {
    const { text, mood } = await request.json();

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json({ error: 'Text content is required.' }, { status: 400 });
    }

    const validMoods = ['chill', 'professional', 'savage', 'flirty', 'dramatic'];
    if (!mood || !validMoods.includes(mood)) {
      return NextResponse.json({ error: `Invalid or missing mood. Must be one of: ${validMoods.join(', ')}` }, { status: 400 });
    }

    const rewrittenText = await generateRewrite(text, mood);

    return NextResponse.json({ rewrittenText });
  } catch (error) {
    console.error('API Error:', error);
    // Differentiate between known errors and unexpected ones
    if (error.message.includes('API_KEY_NOT_SET')) {
      return NextResponse.json({ error: 'Google Gemini API key not configured on the server. Please check .env.local' }, { status: 500 });
    } else if (error.message.includes('BLOCKED_PROMPT')) {
      return NextResponse.json({ error: 'The request was blocked due to safety concerns. Please try a different text.' }, { status: 400 });
    } else if (error.message.includes('rate limits')) {
      return NextResponse.json({ error: 'Too many requests. Please try again in a moment.' }, { status: 429 });
    } else if (error.message.includes('Bad Request') || error.message.includes('invalid argument')) {
        return NextResponse.json({ error: 'Invalid input provided to the AI. Please refine your text.' }, { status: 400 });
    } else {
      return NextResponse.json({ error: `Failed to rewrite text: ${error.message}` }, { status: 500 });
    }
  }
}
