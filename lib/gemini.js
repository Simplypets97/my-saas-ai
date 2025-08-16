import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateHooks(topic) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Generate 3 viral tweet hooks about "${topic}". Format each hook on a new line with a "-" prefix.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text()
      .split("\n")
      .filter(line => line.startsWith("-"))
      .map(hook => hook.replace(/^-/, "").trim());
  } catch (error) {
    console.error("Gemini error:", error);
    return ["Failed to generate hooks. Try again later."];
  }
}