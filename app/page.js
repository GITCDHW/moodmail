'use client';

import { useState } from 'react';
import RewriteForm from '@/components/RewriteForm';
import ResultDisplay from '@/components/ResultDisplay';

export default function Home() {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('chill');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRewrittenText('');

    if (!text.trim()) {
      setError('Please enter some text to rewrite.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, mood }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong on the server.');
      }

      setRewrittenText(data.rewrittenText);
    } catch (err) {
      console.error('Frontend Fetch Error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center mb-10 w-full">
          AI Text Rewriter <span className="text-blue-500">MVP</span>
        </h1>
      </div>

      <div className="w-full max-w-2xl">
        <RewriteForm
          text={text}
          mood={mood}
          onTextChange={setText}
          onMoodChange={setMood}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <ResultDisplay
          rewrittenText={rewrittenText}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <footer className="w-full max-w-2xl text-center text-gray-500 text-xs mt-12">
        Powered by Google Gemini and Next.js on Vercel.
      </footer>
    </main>
  );
}
