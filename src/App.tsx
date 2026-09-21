import { useState } from 'react';
import { Brain, Mail } from 'lucide-react';
import { UserForm } from './components/UserForm';
import { ImageRating } from './components/ImageRating';
import { MoodRating } from './components/MoodRating';
import { CompletionScreen } from './components/CompletionScreen';
import { SplashScreen } from './components/SplashScreen';

export type UserData = {
  email: string;
  participantId: string;
};

export type Stage = 'splash' | 'user-form' | 'image-rating' | 'mood-rating' | 'complete';

function App() {
  const [stage, setStage] = useState<Stage>('splash');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [imageRatings, setImageRatings] = useState<any[]>([]);
  const [moodRatings, setMoodRatings] = useState<any>({});

  const handleStart = () => {
    setStage('user-form');
  };

  const handleUserSubmit = (data: UserData) => {
    setUserData(data);
    setStage('image-rating');
  };

  const handleImageRatingsComplete = (ratings: any[]) => {
    setImageRatings(ratings);
    setStage('mood-rating');
  };

  const handleMoodRatingsComplete = (ratings: any) => {
    setMoodRatings(ratings);
    setStage('complete');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-indigo-600" />
          <span className="text-lg font-bold tracking-[0.2em] text-gray-900">MAPLAB</span>
        </div>
        {userData && (
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Mail className="h-4 w-4" />
            <span>{userData.email}</span>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-24 sm:px-6">
        {stage === 'splash' && <SplashScreen onStart={handleStart} />}
        {stage === 'user-form' && <UserForm onSubmit={handleUserSubmit} />}
        {stage === 'image-rating' && <ImageRating onComplete={handleImageRatingsComplete} />}
        {stage === 'mood-rating' && <MoodRating onComplete={handleMoodRatingsComplete} />}
        {stage === 'complete' && (
          <CompletionScreen
            userData={userData!}
            imageRatings={imageRatings}
            moodRatings={moodRatings}
          />
        )}
      </main>
    </div>
  );
}

export default App;
