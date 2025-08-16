import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function POST(req) {
  try {
    const { question, jobDescription } = await req.json();

    if (!question || !jobDescription) {
      return NextResponse.json(
        { error: 'Question and Job Description are required.' },
        { status: 400 }
      );
    }

    const prompt = `
      Act as an expert interview coach. Your task is to provide a concise, high-quality sample answer to the provided INTERVIEW_QUESTION.

      **Instructions:**
      1.  **Analyze Context:** Use the JOB_DESCRIPTION to understand the context of the role (e.g., seniority, key technologies).
      2.  **Use the STAR Method:** For behavioral questions (like "Tell me about a time..."), structure your answer using the STAR method (Situation, Task, Action, Result).
      3.  **Be Specific and Tailored:** The answer should be tailored to the role. For a technical question, provide a clear explanation and a brief code example if applicable.
      4.  **Keep it Concise:** The answer should be a well-articulated paragraph or two. Do not make it excessively long.
      5.  **Format:** Use clean Markdown for formatting (e.g., bolding for STAR elements, code blocks for code).

      **--- JOB_DESCRIPTION ---**
      ${jobDescription}

      **--- INTERVIEW_QUESTION ---**
      "${question}"
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Error in get-answer API:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer. Please check server logs.' },
      { status: 500 }
    );
  }
}