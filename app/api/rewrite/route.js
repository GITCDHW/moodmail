import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({\n  apiKey: process.env.OPENAI_API_KEY,\n});

export async function POST(request) {\n  try {\n    const { originalText, mood } = await request.json();\n
    if (!originalText || !mood) {\n      return NextResponse.json({ error: 'Missing originalText or mood' }, { status: 400 });\n    }\n
    // Construct a specific prompt for the AI based on mood\n    const prompt = `Rewrite the following message in a ${mood} tone:\n\n"${originalText}"\n\nRewritten message:`;\n
    const chatCompletion = await openai.chat.completions.create({\n      messages: [{\n        role: 'user',\n        content: prompt,\n      }],\n      model: 'gpt-3.5-turbo', // Or 'gpt-4' or other suitable model\n      temperature: 0.7, // Adjust for creativity\n      max_tokens: 300,  // Limit output length\n    });\n
    const rewrittenText = chatCompletion.choices[0].message.content.trim();\n
    return NextResponse.json({ rewrittenText });\n  } catch (error) {\n    console.error('API Error:', error);\n    return NextResponse.json({ error: 'Failed to rewrite message' }, { status: 500 });\n  }\n}