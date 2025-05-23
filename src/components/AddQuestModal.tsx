import React, { useState } from 'react';

interface AddQuestModalProps {
  onAdd: (quest: { title: string; estimatedTime: number; energyLevel: string }) => void;
  onClose: () => void;
}

const timeOptions = [15, 30, 60];
const energyOptions = [
  { value: '🧘', label: 'Low' },
  { value: '⚡', label: 'Medium' },
  { value: '🚀', label: 'High' },
];

const AddQuestModal: React.FC<AddQuestModalProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [energyLevel, setEnergyLevel] = useState('🧘');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), estimatedTime, energyLevel });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <form
        className="bg-[#18305a] rounded-3xl shadow-2xl px-8 py-10 w-[90vw] max-w-xl flex flex-col items-center relative"
        style={{ minWidth: 320 }}
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-extrabold text-[#f7f3e8] mb-8 tracking-tight">Add Quest</h2>
        <input
          className="w-full bg-[#f7f3e8] text-[#18305a] text-2xl font-bold rounded-2xl px-6 py-4 mb-8 focus:outline-none placeholder-[#18305a]/60"
          placeholder="Organize closet"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
        <div className="w-full mb-6">
          <div className="text-[#f7f3e8] text-xl font-bold mb-3">Time</div>
          <div className="flex gap-4">
            {timeOptions.map(opt => (
              <button
                type="button"
                key={opt}
                className={`flex-1 rounded-2xl px-6 py-4 text-lg font-bold transition-all focus:outline-none ${estimatedTime === opt ? 'bg-[#22305a] text-[#f7f3e8] ring-2 ring-[#f7f3e8]' : 'bg-[#22305a]/70 text-[#f7f3e8]/70'}`}
                onClick={() => setEstimatedTime(opt)}
              >
                {estimatedTime === opt ? '✔️ ' : ''}{opt} min
              </button>
            ))}
          </div>
        </div>
        <div className="w-full mb-8">
          <div className="text-[#f7f3e8] text-xl font-bold mb-3">Energy</div>
          <div className="flex gap-4">
            {energyOptions.map(opt => (
              <button
                type="button"
                key={opt.value}
                className={`flex-1 rounded-2xl px-6 py-4 text-2xl font-bold transition-all focus:outline-none ${energyLevel === opt.value ? 'bg-[#22305a] text-[#f7f3e8] ring-2 ring-[#f7f3e8]' : 'bg-[#22305a]/70 text-[#f7f3e8]/70'}`}
                onClick={() => setEnergyLevel(opt.value)}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full rounded-2xl py-4 text-2xl font-extrabold transition-all ${title.trim() ? 'bg-[#22305a] text-[#f7f3e8] hover:bg-[#2c3e50]' : 'bg-[#22305a]/60 text-[#f7f3e8]/60 cursor-not-allowed'}`}
          disabled={!title.trim()}
        >
          Add Quest
        </button>
      </form>
    </div>
  );
};

export default AddQuestModal; 