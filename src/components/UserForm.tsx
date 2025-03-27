import React, { useState } from 'react';
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
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-8 text-center">Enter Your Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor="participantId" className="block mb-2">
            Participant ID
          </label>
          <input
            type="text"
            id="participantId"
            required
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}