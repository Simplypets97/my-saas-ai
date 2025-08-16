"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";

export default function CareerCopilotPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- NEW STATE VARIABLES ---
  const [answers, setAnswers] = useState({}); // Stores generated answers, using the question as the key
  const [loadingAnswerFor, setLoadingAnswerFor] = useState(null); // Tracks which question is currently loading

  const handleGetAnswer = async (question) => {
    if (answers[question]) return; // Don't fetch if answer already exists

    setLoadingAnswerFor(question);
    try {
      const response = await fetch('/api/get-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, jobDescription: jobDescriptionText }), // Send the question AND the JD for context
      });

      if (!response.ok) throw new Error("Failed to fetch answer.");

      const data = await response.json();
      setAnswers(prev => ({ ...prev, [question]: data.answer })); // Add the new answer to our state
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswers(prev => ({ ...prev, [question]: "Sorry, we couldn't generate an answer at this time." }));
    } finally {
      setLoadingAnswerFor(null);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResults(null);
    setAnswers({}); // Reset answers on new generation

    // ... (rest of handleSubmit is the same)
    try {
      const response = await fetch('/api/career-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescriptionText }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown server error occurred.');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch results:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* --- INPUT CARD (No changes) --- */}
      <Card>
        {/* ... (Card content is the same) ... */}
         <CardHeader>
          <CardTitle>AI Career Co-pilot</CardTitle>
          <CardDescription>
            Provide your resume and a job description to get a tailored resume and a custom interview question sheet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="resume-text">Your Original Resume</Label>
                <Textarea id="resume-text" placeholder="Paste your entire resume here..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} required rows={20} />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="job-description-text">The Job Description</Label>
                <Textarea id="job-description-text" placeholder="Paste the full job description here..." value={jobDescriptionText} onChange={(e) => setJobDescriptionText(e.target.value)} required rows={20} />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating Full Application Pack..." : "Generate Application Pack"}
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && <p className="text-center text-gray-500">The AI agents are hard at work... 🤖</p>}

      {/* --- RESULTS CARD (Accordion is now fully interactive) --- */}
      {results && !isLoading && (
        <Card>
          {/* ... (CardHeader and TabsList are the same) ... */}
           <CardHeader>
            <CardTitle>Your Application Pack</CardTitle>
            <CardDescription>
              Use the tabs below to switch between your tailored resume and practice interview questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="resume" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resume">Tailored Resume</TabsTrigger>
                <TabsTrigger value="questions">Interview Questions</TabsTrigger>
              </TabsList>
              <TabsContent value="resume">
                <div className="p-4 mt-4 bg-secondary rounded-lg prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans">{results.tailoredResume}</pre>
                </div>
              </TabsContent>
              <TabsContent value="questions">
                <div className="mt-4 space-y-4">
                  {results.interviewQuestions.map((category, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg mb-2">{category.category}</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((question, qIndex) => (
                          <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                            <AccordionTrigger onClick={() => handleGetAnswer(question)}>
                              {question}
                            </AccordionTrigger>
                            <AccordionContent>
                              {loadingAnswerFor === question && <p className="text-gray-500 italic">Generating answer...</p>}
                              {answers[question] && <pre className="whitespace-pre-wrap font-sans text-sm">{answers[question]}</pre>}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}