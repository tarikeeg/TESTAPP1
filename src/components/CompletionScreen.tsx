import React, { useEffect, useState } from 'react';
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
    <div className="max-w-md mx-auto text-center">
      <div className="bg-gray-900 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl mb-6">Study Complete</h2>
        
        {sending ? (
          <div className="flex items-center justify-center gap-3 text-blue-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Sending results...</span>
          </div>
        ) : sent ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-green-400">
              <Check className="w-6 h-6" />
              <span>Results sent successfully!</span>
            </div>
            <p className="text-gray-300">
              A copy of your results has been sent to:
              <br />
              <strong className="text-blue-400">{userData.email}</strong>
            </p>
          </div>
        ) : (
          <div className="text-red-400">
            {error}
          </div>
        )}

        <p className="mt-8 text-gray-400">
          Thank you for participating in our study.
          <br />
          You may now close this window.
        </p>
      </div>
    </div>
  );
}