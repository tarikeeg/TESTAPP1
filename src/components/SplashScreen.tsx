import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export function SplashScreen({ onStart }: Props) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <Brain className="w-24 h-24 text-blue-400 mb-8 animate-pulse" />
      <h1 className="text-5xl mb-4 text-blue-400">MAPLAB</h1>
      <h2 className="text-3xl mb-8">Emotion Ratings App</h2>
      <button
        onClick={onStart}
        className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl flex items-center gap-2 hover:bg-blue-600 transition-colors"
      >
        Start Rating
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}