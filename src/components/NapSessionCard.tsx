import React from 'react';
import { NapSession } from '../types';

interface NapSessionCardProps {
  session: NapSession;
  duration: string;
  children: React.ReactNode;
  onAddQuest: (sessionId: string) => void;
  onEdit?: (sessionId: string) => void;
  onDelete?: (sessionId: string) => void;
  isActive?: boolean;
  onClick?: () => void;
}

const NapSessionCard: React.FC<NapSessionCardProps> = ({
  session,
  duration,
  children,
  onAddQuest,
  onEdit,
  onDelete,
  isActive = false,
  onClick,
}) => {
  return (
    <div 
      className={`w-full bg-[#31416a] rounded-3xl shadow-xl px-6 py-5 mb-7 flex flex-col cursor-pointer transition-all ${
        isActive ? 'ring-4 ring-blue-400 transform scale-[1.02]' : 'hover:bg-[#3a4d7a]'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-white tracking-tight">{session.name}</span>
          <span className="flex items-center ml-1">
            <button onClick={(e) => {
              e.stopPropagation();
              onEdit?.(session.id);
            }} className="text-blue-200 hover:text-blue-400 text-base p-1" title="Edit Session" style={{lineHeight:1}}><span role="img" aria-label="Edit">✏️</span></button>
            <button onClick={(e) => {
              e.stopPropagation();
              onDelete?.(session.id);
            }} className="text-blue-200 hover:text-red-400 text-base p-1" title="Delete Session" style={{lineHeight:1}}><span role="img" aria-label="Delete">🗑️</span></button>
          </span>
        </div>
        <span className="text-lg font-bold text-blue-200">{duration}</span>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        {children}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddQuest(session.id);
        }}
        className="text-blue-200 text-base font-semibold mt-2 hover:underline focus:outline-none focus:underline transition"
        style={{alignSelf:'flex-start'}}
      >
        + Add Quest
      </button>
    </div>
  );
};

export default NapSessionCard; 