import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Corrected import

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

const resumeTailorPrompt = (resume, jd) => `
  Act as an expert career coach and resume writer. Analyze the provided RESUME and JOB_DESCRIPTION, then rewrite the resume to be perfectly tailored for the job.
  **Format:** Use clean Markdown with '###' for headers and '**' for highlighting key tailored phrases.
  **--- RESUME ---**
  ${resume}
  **--- JOB_DESCRIPTION ---**
  ${jd}
`;

// --- THIS PROMPT IS UPDATED ---
const interviewCoachPrompt = (jd) => `
  Act as an expert interview coach. Analyze the provided JOB_DESCRIPTION and generate a list of 10-15 interview questions.

  **Instructions:**
  1.  **Categorize:** Group the questions into logical categories like "Behavioral", "Technical", and "Situational".
  2.  **Tailor:** The questions must be highly relevant to the skills and responsibilities in the job description.
  3.  **Format:** Your final output MUST be a valid JSON array of objects. Each object should have a "category" key and a "questions" key, where "questions" is an array of strings.

  **Example Output:**
  [
    {
      "category": "Behavioral Questions",
      "questions": [
        "Tell me about a time you had to learn a new technology quickly.",
        "Describe a challenging project and how you handled it."
      ]
    },
    {
      "category": "Technical Questions",
      "questions": [
        "What are the benefits of using Next.js over traditional React?",
        "How would you optimize the performance of a web application?"
      ]
    }
  ]

  **--- JOB_DESCRIPTION ---**
  ${jd}
`;

export async function POST(req) {
  try {
    const { resumeText, jobDescriptionText } = await req.json();

    if (!resumeText || !jobDescriptionText) {
      return NextResponse.json({ error: 'Resume and Job Description are required.' }, { status: 400 });
    }

    const resumePromise = model.generateContent(resumeTailorPrompt(resumeText, jobDescriptionText));
    const questionsPromise = model.generateContent(interviewCoachPrompt(jobDescriptionText));

    const [resumeResult, questionsResult] = await Promise.all([resumePromise, questionsPromise]);

    const tailoredResume = resumeResult.response.text();
    
    // --- THIS LOGIC IS UPDATED ---
    // The AI now returns a JSON string, so we need to parse it.
    const questionsText = questionsResult.response.text();
    // Clean up potential markdown formatting around the JSON
    const cleanedJsonText = questionsText.replace(/```json|```/g, '').trim();
    const interviewQuestions = JSON.parse(cleanedJsonText); // Convert the string to a real JavaScript array

    return NextResponse.json({ tailoredResume, interviewQuestions });

  } catch (error) {
    console.error('Error in Career Co-pilot API:', error);
    return NextResponse.json({ error: 'Failed to generate results. Please check server logs.' }, { status: 500 });
  }
}