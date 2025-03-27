import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const PANAS_WORDS = [
  { word: 'Active', type: 'positive' },
  { word: 'Afraid', type: 'negative' },
  { word: 'Alert', type: 'positive' },
  { word: 'Ashamed', type: 'negative' },
  { word: 'Attentive', type: 'positive' },
  { word: 'Distressed', type: 'negative' },
  { word: 'Determined', type: 'positive' },
  { word: 'Guilty', type: 'negative' },
  { word: 'Enthusiastic', type: 'positive' },
  { word: 'Hostile', type: 'negative' },
  { word: 'Excited', type: 'positive' },
  { word: 'Irritable', type: 'negative' },
  { word: 'Inspired', type: 'positive' },
  { word: 'Jittery', type: 'negative' },
  { word: 'Interested', type: 'positive' },
  { word: 'Nervous', type: 'negative' },
  { word: 'Proud', type: 'positive' },
  { word: 'Scared', type: 'negative' },
  { word: 'Strong', type: 'positive' },
  { word: 'Upset', type: 'negative' }
];

interface Props {
  onComplete: (ratings: Record<string, number>) => void;
}

export function MoodRating({ onComplete }: Props) {
  const [page, setPage] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    PANAS_WORDS.forEach(({ word }) => {
      initial[word.toLowerCase()] = 5;
    });
    return initial;
  });

  const currentWords = PANAS_WORDS.slice(page * 10, (page + 1) * 10);

  const handleRatingChange = (word: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [word.toLowerCase()]: value
    }));
  };

  const handleNext = () => {
    if (page === 0) {
      setPage(1);
    } else {
      onComplete(ratings);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl mb-8">Part 2: Current Mood Rating (Page {page + 1}/2)</h2>
        
        <div className="space-y-6">
          {currentWords.map(({ word, type }) => (
            <div key={word} className="space-y-2">
              <label className={`block text-lg ${type === 'positive' ? 'text-blue-400' : 'text-red-400'}`}>
                {word}
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm w-24">Not at all</span>
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={ratings[word.toLowerCase()]}
                    onChange={(e) => handleRatingChange(word, parseInt(e.target.value))}
                    className={`w-full h-3 rounded-lg appearance-none cursor-pointer
                      bg-gray-700 
                      [&::-webkit-slider-thumb]:appearance-none 
                      [&::-webkit-slider-thumb]:w-6 
                      [&::-webkit-slider-thumb]:h-6 
                      [&::-webkit-slider-thumb]:rounded-full 
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:${type === 'positive' ? 'bg-blue-400' : 'bg-red-400'}
                      [&::-webkit-slider-thumb]:hover:${type === 'positive' ? 'bg-blue-600' : 'bg-red-600'}
                      [&::-webkit-slider-thumb]:transition-colors`}
                  />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-l-lg ${
                      type === 'positive' ? 'bg-blue-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${((ratings[word.toLowerCase()] - 1) / 8) * 100}%` }}
                  />
                </div>
                <span className="text-sm w-24 text-right">Extremely</span>
                <span className="w-8 text-center font-medium">
                  {ratings[word.toLowerCase()]}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            {page === 0 ? 'Next Page' : 'Complete Study'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}