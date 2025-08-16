"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Clipboard, Check } from "lucide-react"; // Import new icons

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [hooks, setHooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(-1); // State to track which hook is copied

  const handleCopy = (hookText, index) => {
    navigator.clipboard.writeText(hookText);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(-1); // Reset after 2 seconds
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setHooks([]);
    setError(null);

    try {
      const response = await fetch('/api/generate-hooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown error occurred.');
      }

      const data = await response.json();
      setHooks(data.hooks);
    } catch (err) {
      console.error('Failed to fetch hooks:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Viral Tweet Hook Generator</CardTitle>
          <CardDescription>
            Enter a topic, and our AI will generate catchy hooks to make your tweets go viral.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="e.g., 'AI in healthcare'"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Hooks"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading && <p className="text-center text-gray-500">Brewing up some amazing ideas... ☕</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {hooks.length > 0 && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Your Hooks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {hooks.map((hook, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                  <p className="font-mono flex-grow pr-4">{hook}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(hook, index)}
                  >
                    {copiedIndex === index ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 