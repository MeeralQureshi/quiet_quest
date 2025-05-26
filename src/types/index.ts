export interface NapSession {
  id: string;
  name: string;
  quests: Quest[];
  createdAt: number;
}

export interface Quest {
  id: string;
  title: string;
  estimatedTime: number; // in minutes
  energyLevel: '🧘' | '⚡' | '🚀';
  emoji: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: number;
}

export interface DailyStats {
  date: string;
  totalNapTime: number;
  completedQuests: number;
  napCount: number;
} 