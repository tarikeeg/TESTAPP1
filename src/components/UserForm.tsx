import { useState } from 'react';
import { UserData } from '../App';

interface Props {
  onSubmit: (data: UserData) => void;
}

export function UserForm({ onSubmit }: Props) {
  const [email, setEmail] = useState('');
  const [participantId, setParticipantId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, participantId });
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-1 text-center text-2xl font-bold text-gray-900">Enter Your Information</h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Your results will be sent to the email below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label htmlFor="participantId" className="mb-1.5 block text-sm font-medium text-gray-700">
              Participant ID
            </label>
            <input
              type="text"
              id="participantId"
              required
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
