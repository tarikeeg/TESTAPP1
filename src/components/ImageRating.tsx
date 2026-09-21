import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { RatingScale } from './RatingScale';

interface Rating {
  arousal: number;
  valence: number;
  craving: number;
}

interface ImageRatingResult extends Rating {
  imageUrl: string;
}

const IMAGES = [
  '/images/cue-1.png',
  '/images/cue-2.png',
  '/images/cue-3.png',
  '/images/cue-4.png',
  '/images/cue-5.png',
  '/images/cue-6.png',
  '/images/cue-7.png',
  '/images/cue-8.png',
];

const SCALES = [
  { key: 'arousal' as const, label: 'Arousal', accent: '#d97706' },
  { key: 'valence' as const, label: 'Valence', accent: '#059669' },
  { key: 'craving' as const, label: 'Craving', accent: '#7c3aed' },
];

type CurrentRatings = {
  arousal: number | null;
  valence: number | null;
  craving: number | null;
};

const EMPTY: CurrentRatings = { arousal: null, valence: null, craving: null };

interface Props {
  onComplete: (ratings: ImageRatingResult[]) => void;
}

export function ImageRating({ onComplete }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [scaleIndex, setScaleIndex] = useState(0);
  const [current, setCurrent] = useState<CurrentRatings>(EMPTY);
  const [allRatings, setAllRatings] = useState<ImageRatingResult[]>([]);

  const scale = SCALES[scaleIndex];
  const currentValue = current[scale.key];
  const hasValue = currentValue !== null;

  const handleChange = (value: number) => {
    setCurrent((prev) => ({ ...prev, [scale.key]: value }));
  };

  const handleNext = () => {
    if (currentValue === null) return;

    if (scaleIndex < SCALES.length - 1) {
      setScaleIndex((prev) => prev + 1);
      return;
    }

    const result: ImageRatingResult = {
      imageUrl: IMAGES[imageIndex],
      arousal: current.arousal!,
      valence: current.valence!,
      craving: current.craving!,
    };
    const updated = [...allRatings, result];

    if (imageIndex < IMAGES.length - 1) {
      setImageIndex((prev) => prev + 1);
      setScaleIndex(0);
      setCurrent(EMPTY);
      setAllRatings(updated);
    } else {
      onComplete(updated);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && hasValue) handleNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const isLastImage = imageIndex === IMAGES.length - 1;
  const isLastScale = scaleIndex === SCALES.length - 1;
  const overallProgress =
    ((imageIndex * SCALES.length + scaleIndex + 1) / (IMAGES.length * SCALES.length)) * 100;

  return (
    <div className="mx-auto flex max-w-xl flex-col">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
          <span className="font-semibold uppercase tracking-wide text-indigo-600">Part 1</span>
          <span className="tabular-nums">
            Image {imageIndex + 1} / {IMAGES.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="aspect-square w-full overflow-hidden bg-gray-100 sm:aspect-[4/3]">
          <img
            src={IMAGES[imageIndex] || '/placeholder.svg'}
            alt={`Study image ${imageIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">
              Rating {scaleIndex + 1} of {SCALES.length}
            </span>
            <span className="text-xs text-gray-400">Tap a number, the slider, or press 1–9</span>
          </div>

          <RatingScale
            key={`${imageIndex}-${scale.key}`}
            label={scale.label}
            accent={scale.accent}
            value={currentValue}
            onChange={handleChange}
            enableKeyboard
          />

          <button
            onClick={handleNext}
            disabled={!hasValue}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isLastImage && isLastScale ? 'Continue to Part 2' : isLastScale ? 'Next Image' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
