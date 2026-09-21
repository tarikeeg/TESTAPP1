import { useEffect, useState } from 'react';
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
  { key: 'arousal' as const, label: 'Arousal' },
  { key: 'valence' as const, label: 'Valence' },
  { key: 'craving' as const, label: 'Craving' },
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

  const totalSteps = IMAGES.length * SCALES.length;
  const currentStep = imageIndex * SCALES.length + scaleIndex + 1;
  const overallProgress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black text-white">
      <div className="mx-auto flex h-full w-full max-w-md flex-col px-4 py-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-medium tabular-nums text-zinc-500">
            {imageIndex + 1}/{IMAGES.length}
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-2xl bg-zinc-900">
          <img
            src={IMAGES[imageIndex] || '/placeholder.svg'}
            alt={`Study image ${imageIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="pt-4">
          <RatingScale
            key={`${imageIndex}-${scale.key}`}
            label={scale.label}
            value={currentValue}
            onChange={handleChange}
            onAdvance={handleNext}
            enableKeyboard
          />
        </div>
      </div>
    </div>
  );
}
