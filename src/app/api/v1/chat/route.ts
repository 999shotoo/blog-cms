import { NextRequest, NextResponse } from 'next/server';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: NextRequest, res: NextResponse) {
  const { messages } = await req.json();
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });
  
  const { text } = await generateText({
    model: groq('mixtral-8x7b-32768'),
    prompt: messages[0].text,
  });


  return NextResponse.json({ text });
}