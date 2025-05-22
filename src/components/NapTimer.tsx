import React from 'react';

interface NapTimerProps {
  time: string;
  isActive: boolean;
  onToggle: () => void;
}

const NapTimer: React.FC<NapTimerProps> = ({ time, isActive, onToggle }) => {
  return (
    <div className="w-full bg-[#31416a] rounded-3xl shadow-xl px-8 py-6 flex flex-col items-center mb-8 relative">
      <div className="flex w-full justify-between items-center mb-2">
        <span className="text-white text-2xl font-bold tracking-tight">Nap Time</span>
        <button
          className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${isActive ? 'bg-blue-400' : 'bg-gray-400'}`}
          onClick={onToggle}
          aria-label="Toggle nap timer"
        >
          <span
            className={`h-5 w-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isActive ? 'translate-x-5' : ''}`}
          />
        </button>
      </div>
      <div className="text-white text-4xl md:text-5xl font-extrabold tracking-widest tabular-nums drop-shadow-lg">
        {time}
      </div>
    </div>
  );
};

export default NapTimer; 