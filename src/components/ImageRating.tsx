import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { RatingScale } from './RatingScale';

interface Rating {
  arousal: number;
  valence: number;
  craving: number;
}

interface ImageRating extends Rating {
  imageUrl: string;
}

const IMAGES = [
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80',
  'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=800&q=80',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80',
  'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&q=80',
  'https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=800&q=80',
  'https://images.unsplash.com/photo-1546514355-7fdc90ccbd03?w=800&q=80',
  'https://images.unsplash.com/photo-1508459855340-fb63ac591728?w=800&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
  'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&q=80',
  'https://images.unsplash.com/photo-1509515837298-2c67a3933321?w=800&q=80',
  'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80',
];

const SCALES = [
  { key: 'arousal' as const, label: 'Arousal', accent: '#d97706' },
  { key: 'valence' as const, label: 'Valence', accent: '#059669' },
  { key: 'craving' as const, label: 'Craving', accent: '#7c3aed' },
];

interface Props {
  onComplete: (ratings: ImageRating[]) => void;
}

export function ImageRating({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<Rating>({
    arousal: 5,
    valence: 5,
    craving: 5,
  });
  const [allRatings, setAllRatings] = useState<ImageRating[]>([]);

  const handleRatingChange = (type: keyof Rating, value: number) => {
    setRatings((prev) => ({ ...prev, [type]: value }));
  };

  const handleNext = () => {
    const newRating = { ...ratings, imageUrl: IMAGES[currentIndex] };
    const updatedRatings = [...allRatings, newRating];

    if (currentIndex < IMAGES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRatings({ arousal: 5, valence: 5, craving: 5 });
      setAllRatings(updatedRatings);
    } else {
      onComplete(updatedRatings);
    }
  };

  const isLast = currentIndex === IMAGES.length - 1;
  const progress = ((currentIndex + 1) / IMAGES.length) * 100;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="mb-2 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Part 1</p>
            <h2 className="text-2xl font-bold text-gray-900">Image Ratings</h2>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {currentIndex + 1} / {IMAGES.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={IMAGES[currentIndex] || '/placeholder.svg'}
            alt={`Study image ${currentIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-3 p-5 sm:p-6">
          {SCALES.map((scale) => (
            <RatingScale
              key={scale.key}
              label={scale.label}
              accent={scale.accent}
              value={ratings[scale.key]}
              onChange={(value) => handleRatingChange(scale.key, value)}
            />
          ))}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              {isLast ? 'Continue to Part 2' : 'Next Image'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
