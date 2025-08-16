import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required.' },
        { status: 400 }
      );
    }

    // --- THIS IS THE CORRECTED LINE ---
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const prompt = `Generate 5 viral, catchy, and slightly controversial tweet hooks for the topic: "${topic}".
    The hooks should be short and attention-grabbing.
    Format the output as a clean JSON array of strings, like this:
    ["Hook 1", "Hook 2", "Hook 3", "Hook 4", "Hook 5"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json|```/g, '').trim();
    const hooks = JSON.parse(cleanedText);

    return NextResponse.json({ hooks });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      { error: 'Failed to generate hooks. Please check the server logs.' },
      { status: 500 }
    );
  }
}