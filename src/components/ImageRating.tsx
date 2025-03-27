import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

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
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80'
];

interface Props {
  onComplete: (ratings: ImageRating[]) => void;
}

export function ImageRating({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<Rating>({
    arousal: 5,
    valence: 5,
    craving: 5
  });
  const [allRatings, setAllRatings] = useState<ImageRating[]>([]);

  const handleRatingChange = (type: keyof Rating, value: number) => {
    setRatings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleNext = () => {
    const newRating = { ...ratings, imageUrl: IMAGES[currentIndex] };
    const updatedRatings = [...allRatings, newRating];
    
    if (currentIndex < IMAGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setRatings({ arousal: 5, valence: 5, craving: 5 });
      setAllRatings(updatedRatings);
    } else {
      onComplete(updatedRatings);
    }
  };

  const ratingColors = {
    arousal: ['bg-red-400', 'bg-red-600'],
    valence: ['bg-green-400', 'bg-green-600'],
    craving: ['bg-purple-400', 'bg-purple-600']
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl mb-4">
            Part 1: Image Ratings ({currentIndex + 1}/20)
          </h2>
          
          <div className="aspect-video mb-8 overflow-hidden rounded-lg">
            <img 
              src={IMAGES[currentIndex]} 
              alt={`Nature image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            {(['arousal', 'valence', 'craving'] as const).map((type) => (
              <div key={type} className="space-y-2">
                <label className={`block text-lg text-${type === 'arousal' ? 'red' : type === 'valence' ? 'green' : 'purple'}-400 capitalize`}>
                  {type} Rating
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-24">Not at all</span>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="1"
                      max="9"
                      value={ratings[type]}
                      onChange={(e) => handleRatingChange(type, parseInt(e.target.value))}
                      className={`w-full h-3 rounded-lg appearance-none cursor-pointer
                        bg-gray-700 
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-6 
                        [&::-webkit-slider-thumb]:h-6 
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:${ratingColors[type][0]}
                        [&::-webkit-slider-thumb]:hover:${ratingColors[type][1]}
                        [&::-webkit-slider-thumb]:transition-colors
                        [&::-moz-range-thumb]:${ratingColors[type][0]}
                        [&::-moz-range-thumb]:hover:${ratingColors[type][1]}`}
                    />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-l-lg ${ratingColors[type][0]}`}
                      style={{ width: `${((ratings[type] - 1) / 8) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm w-24 text-right">Extremely</span>
                  <span className="w-8 text-center font-medium">{ratings[type]}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
            >
              {currentIndex === IMAGES.length - 1 ? 'Continue to Part 2' : 'Next Image'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}