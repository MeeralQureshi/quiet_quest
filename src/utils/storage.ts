import { NapSession, DailyStats } from '../types';

const STORAGE_KEYS = {
  NAP_SESSIONS: 'quiet_quest_nap_sessions',
  DAILY_STATS: 'quiet_quest_daily_stats',
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

export const resetDailyData = (): void => {
  const today = new Date().toISOString().split('T')[0];
  const sessions = getNapSessions();
  const filteredSessions = sessions.filter(
    session => new Date(session.createdAt).toISOString().split('T')[0] === today
  );
  saveNapSessions(filteredSessions);
}; 