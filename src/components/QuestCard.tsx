import React from 'react';
import { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  sessionId: string;
  onStatusChange: (sessionId: string, questId: string, status: Quest['status']) => void;
  onDelete: (sessionId: string, questId: string) => void;
  onEdit: (sessionId: string, quest: Quest) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  sessionId,
  onStatusChange,
  onDelete,
  onEdit,
}) => {

  return (
    <div className="flex items-center justify-between gap-2 py-1 bg-transparent">
      <div className="flex items-center gap-2 min-w-0">
        <input 
          type="checkbox" 
          checked={quest.status === 'completed'} 
          onChange={() => onStatusChange(sessionId, quest.id, quest.status === 'completed' ? 'pending' : 'completed')} 
          className="w-5 h-5 rounded border-2 border-blue-300 bg-[#22305a] focus:ring-0" 
        />
        <span className={`text-lg font-bold truncate ${quest.status === 'completed' ? 'line-through text-blue-300' : 'text-white'}`}>
          {quest.title}
        </span>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-2">
        <span className="text-lg md:text-xl flex-shrink-0">{quest.emoji}</span>
        <span className="text-base text-blue-200 font-bold">{quest.estimatedTime} m</span>
        <span className="flex items-center ml-1">
          <button 
            onClick={() => onEdit(sessionId, quest)} 
            className="text-blue-200 hover:text-blue-400 text-base p-1" 
            title="Edit" 
            style={{lineHeight:1}}
          >
            <span role="img" aria-label="Edit">✏️</span>
          </button>
          <button 
            onClick={() => onDelete(sessionId, quest.id)} 
            className="text-blue-200 hover:text-red-400 text-base p-1" 
            title="Delete" 
            style={{lineHeight:1}}
          >
            <span role="img" aria-label="Delete">🗑️</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default QuestCard; 