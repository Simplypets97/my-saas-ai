"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

export default function ResumeBuilderPage() {
  const [originalContent, setOriginalContent] = useState("");
  const [improvedContent, setImprovedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setImprovedContent(""); // Clear previous results

    // --- We are faking an AI call here for now ---
    console.log(`Simulating resume improvement for content: ${originalContent.substring(0, 50)}...`);

    // This setTimeout simulates the time it takes to get a response from an AI
    setTimeout(() => {
      const mockResponse = `**This is a mock AI-improved response.**\n\nBased on the content you provided, here are some key improvements:\n\n*   **Action Verbs:** Replaced passive language with strong, results-oriented action verbs.\n*   **Quantifiable Results:** Added metrics to showcase impact (e.g., "Increased efficiency by 15%").\n*   **Clarity and Conciseness:** Restructured sentences to be clearer and more direct, making it easier for recruiters to scan.`;
      setImprovedContent(mockResponse);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Resume Enhancer</CardTitle>
          <CardDescription>
            Paste a section of your resume or a job description, and our AI will help you tailor and improve it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="resume-content">Paste your content here</Label>
                <Textarea
                  id="resume-content"
                  placeholder="e.g., 'Managed a team of 5 and worked on several projects...'"
                  value={originalContent}
                  onChange={(e) => setOriginalContent(e.target.value)}
                  required
                  rows={10} // Make the text area taller
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Enhancing..." : "Enhance My Resume"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && <p className="text-center text-gray-500">Our AI is polishing your resume... 💎</p>}

      {improvedContent && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Improvements</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Using whitespace-pre-wrap to respect newlines from the mock response */}
            <div className="p-4 bg-secondary rounded-lg font-mono whitespace-pre-wrap">
              {improvedContent}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}