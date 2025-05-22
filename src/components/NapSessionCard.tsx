import React from 'react';
import { NapSession } from '../types';

interface NapSessionCardProps {
  session: NapSession;
  duration: string;
  children: React.ReactNode;
  onAddQuest: (sessionId: string) => void;
}

const NapSessionCard: React.FC<NapSessionCardProps> = ({
  session,
  duration,
  children,
  onAddQuest,
}) => {
  return (
    <div className="w-full bg-[#31416a] rounded-3xl shadow-xl px-6 py-5 mb-7 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-extrabold text-white tracking-tight">{session.name}</span>
        <span className="text-lg font-bold text-blue-200">{duration}</span>
      </div>
      <div className="flex justify-between text-blue-200 text-xs font-bold mb-2 px-1">
        <span>TO DO</span>
        <span>IN PROGRESS</span>
        <span>DONE</span>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        {children}
      </div>
      <button
        onClick={() => onAddQuest(session.id)}
        className="text-blue-200 text-base font-semibold mt-2 hover:underline focus:outline-none focus:underline transition"
        style={{alignSelf:'flex-start'}}
      >
        + Add Quest
      </button>
    </div>
  );
};

export default NapSessionCard; 