import { Brain, ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export function SplashScreen({ onStart }: Props) {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center text-center">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 ring-1 ring-indigo-100">
        <Brain className="h-10 w-10 text-indigo-600" />
      </div>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Emotion Ratings Study
      </h1>
      <p className="mb-10 max-w-md text-base text-gray-500">
        You&apos;ll rate a series of images and then describe your current mood. It only takes a few
        minutes.
      </p>
      <button
        onClick={onStart}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3.5 text-lg font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Start Rating
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
