import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { RatingScale } from './RatingScale';

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
  { word: 'Upset', type: 'negative' },
];

const POSITIVE_ACCENT = '#4f46e5';
const NEGATIVE_ACCENT = '#e11d48';

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
    setRatings((prev) => ({ ...prev, [word.toLowerCase()]: value }));
  };

  const handleNext = () => {
    if (page === 0) {
      setPage(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(ratings);
    }
  };

  const progress = ((page + 1) / 2) * 100;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Part 2</p>
            <h2 className="text-2xl font-bold text-gray-900">Current Mood Rating</h2>
          </div>
          <span className="text-sm font-medium text-gray-500">Page {page + 1} / 2</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-5 text-sm text-gray-500">
          Indicate to what extent you feel this way right now, at the present moment.
        </p>

        <div className="space-y-4">
          {currentWords.map(({ word, type }) => (
            <RatingScale
              key={word}
              label={word}
              accent={type === 'positive' ? POSITIVE_ACCENT : NEGATIVE_ACCENT}
              value={ratings[word.toLowerCase()]}
              onChange={(value) => handleRatingChange(word, value)}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            {page === 0 ? 'Next Page' : 'Complete Study'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
