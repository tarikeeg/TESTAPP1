import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { UserData } from '../App';

interface Props {
  userData: UserData;
  imageRatings: any[];
  moodRatings: any;
}

export function CompletionScreen({ userData, imageRatings, moodRatings }: Props) {
  const [sending, setSending] = useState(true);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sendResults = async () => {
      try {
        // Create CSV data
        const imageRatingsCSV = [
          'Image Number,Image URL,Arousal,Valence,Craving',
          ...imageRatings.map((rating, index) => 
            `${index + 1},"${rating.imageUrl}",${rating.arousal},${rating.valence},${rating.craving}`
          )
        ].join('\n');

        const moodRatingsCSV = [
          'Word,Type,Rating',
          ...Object.entries(moodRatings).map(([word, rating]) => {
            const type = ['active', 'alert', 'attentive', 'determined', 'enthusiastic',
                         'excited', 'inspired', 'interested', 'proud', 'strong'].includes(word)
              ? 'Positive'
              : 'Negative';
            return `${word},${type},${rating}`;
          })
        ].join('\n');

        // Create Excel-compatible CSV files with UTF-8 BOM
        const bom = '\uFEFF';
        const imageRatingsBlob = new Blob([bom + imageRatingsCSV], { type: 'text/csv;charset=utf-8' });
        const moodRatingsBlob = new Blob([bom + moodRatingsCSV], { type: 'text/csv;charset=utf-8' });

        // Convert blobs to base64
        const imageRatingsBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(imageRatingsBlob);
        });

        const moodRatingsBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(moodRatingsBlob);
        });

        await emailjs.send(
          'service_maplab', // Replace with your EmailJS service ID
          'template_ratings', // Replace with your EmailJS template ID
          {
            to_email: userData.email,
            participant_id: userData.participantId,
            results_text: `
Participant ID: ${userData.participantId}

PART 1: Image Ratings
${imageRatingsCSV}

PART 2: Mood Ratings
${moodRatingsCSV}
`,
            image_ratings_csv: imageRatingsBase64,
            mood_ratings_csv: moodRatingsBase64
          },
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );

        setSent(true);
      } catch (err) {
        setError('There was an error sending the results. Please contact the lab administrator.');
        console.error('Email error:', err);
      } finally {
        setSending(false);
      }
    };

    sendResults();
  }, []);

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Study Complete</h2>

        {sending ? (
          <div className="flex items-center justify-center gap-3 text-indigo-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Sending results...</span>
          </div>
        ) : sent ? (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <Check className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="font-semibold text-gray-900">Results sent successfully!</p>
            <p className="text-sm text-gray-500">
              A copy of your results has been sent to:
              <br />
              <strong className="text-indigo-600">{userData.email}</strong>
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-rose-50 p-4 text-sm font-medium text-rose-600">{error}</div>
        )}

        <p className="mt-8 text-sm text-gray-400">
          Thank you for participating in our study.
          <br />
          You may now close this window.
        </p>
      </div>
    </div>
  );
}
