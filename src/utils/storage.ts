import { NapSession, DailyStats } from '../types';

const STORAGE_KEYS = {
  NAP_SESSIONS: 'quiet_quest_nap_sessions',
  DAILY_STATS: 'quiet_quest_daily_stats',
  LAST_RESET: 'quiet_quest_last_reset',
};

export const getNapSessions = (): NapSession[] => {
  const sessions = localStorage.getItem(STORAGE_KEYS.NAP_SESSIONS);
  return sessions ? JSON.parse(sessions) : [];
};

export const saveNapSessions = (sessions: NapSession[]): void => {
  localStorage.setItem(STORAGE_KEYS.NAP_SESSIONS, JSON.stringify(sessions));
};

export const getDailyStats = (): DailyStats[] => {
  const stats = localStorage.getItem(STORAGE_KEYS.DAILY_STATS);
  return stats ? JSON.parse(stats) : [];
};

export const saveDailyStats = (stats: DailyStats[]): void => {
  localStorage.setItem(STORAGE_KEYS.DAILY_STATS, JSON.stringify(stats));
};

const getLastResetDate = (): string => {
  return localStorage.getItem(STORAGE_KEYS.LAST_RESET) || '';
};

const setLastResetDate = (date: string): void => {
  localStorage.setItem(STORAGE_KEYS.LAST_RESET, date);
};

const shouldResetData = (): boolean => {
  const lastReset = getLastResetDate();
  const today = new Date().toISOString().split('T')[0];
  return lastReset !== today;
};

export const resetDailyData = (): void => {
  const today = new Date().toISOString().split('T')[0];
  
  // Only keep today's nap sessions
  const sessions = getNapSessions();
  const filteredSessions = sessions.filter(
    session => new Date(session.createdAt).toISOString().split('T')[0] === today
  );
  saveNapSessions(filteredSessions);

  // Archive yesterday's stats if they exist
  const stats = getDailyStats();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  // If we have stats from yesterday, archive them
  if (stats.length > 0 && stats[stats.length - 1].date === yesterdayStr) {
    // Keep the last 30 days of stats
    const recentStats = stats.slice(-30);
    saveDailyStats(recentStats);
  }

  // Update last reset date
  setLastResetDate(today);
};

export const checkAndResetDailyData = (): void => {
  if (shouldResetData()) {
    resetDailyData();
  }
}; 