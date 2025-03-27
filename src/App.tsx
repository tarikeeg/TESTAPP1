import React, { useState } from 'react';
import { Brain, ChevronRight, Mail } from 'lucide-react';
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
    <div className="min-h-screen bg-black text-white font-['Arial'] font-bold">
      <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-['Consolas'] tracking-widest bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">MAPLAB</span>
        </div>
        {userData && (
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            <span>{userData.email}</span>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 pt-20 pb-8">
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