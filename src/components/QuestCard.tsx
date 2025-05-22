import React from 'react';
import { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  onStatusChange: (id: string, status: Quest['status']) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedQuest: Partial<Quest>) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onStatusChange,
  onDelete,
  onEdit,
}) => {
  // Color for energy level
  const energyColors: Record<Quest['energyLevel'], string> = {
    '🧘': 'bg-blue-300 text-blue-900',
    '⚡': 'bg-yellow-200 text-yellow-800',
    '🚀': 'bg-yellow-300 text-yellow-900',
  };

  return (
    <div className="flex items-center justify-between bg-[#3b4a6b] rounded-full px-4 py-2 shadow-sm w-full">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl md:text-2xl flex-shrink-0">{quest.emoji}</span>
        <span className="font-bold text-white truncate text-base md:text-lg">{quest.title}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <span className="text-blue-200 text-sm font-semibold">{quest.estimatedTime}m</span>
        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-bold ${energyColors[quest.energyLevel]}`}>{quest.energyLevel}</span>
      </div>
    </div>
  );
};

export default QuestCard; 