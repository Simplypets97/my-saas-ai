import { generateHooks } from "./gemini.js"; // Explicit .js extension

async function test() {
  const topic = "AI in healthcare";
  const hooks = await generateHooks(topic);
  console.log("Generated hooks:", hooks);
}

test();