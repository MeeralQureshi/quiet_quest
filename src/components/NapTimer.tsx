import React from 'react';
import { NapSession } from '../types';
import { saveNapSessions } from '../utils/storage';

interface NapTimerProps {
  napSessions: NapSession[];
  onSessionsUpdate: (sessions: NapSession[]) => void;
}

const NapTimer: React.FC<NapTimerProps> = ({ napSessions, onSessionsUpdate }) => {
  const [timerActive, setTimerActive] = React.useState(false);

  // Calculate total nap time for all sessions today
  const totalNapMs = napSessions.reduce((sum, session) => {
    if (session.startTime && session.endTime) {
      return sum + (session.endTime - session.startTime);
    }
    return sum;
  }, 0);

  // Format ms to hh:mm:ss
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((v) => v.toString().padStart(2, '0'))
      .join(':');
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
    if (timerActive) {
      // Stop all active timers
      const updatedSessions = napSessions.map(session => ({
        ...session,
        endTime: session.startTime && !session.endTime ? Date.now() : session.endTime
      }));
      onSessionsUpdate(updatedSessions);
      saveNapSessions(updatedSessions);
    } else {
      // Start timer for active nap session
      const activeSession = napSessions.find(session => !session.endTime);
      if (activeSession) {
        const updatedSessions = napSessions.map(session =>
          session.id === activeSession.id
            ? { ...session, startTime: Date.now(), endTime: null }
            : session
        );
        onSessionsUpdate(updatedSessions);
        saveNapSessions(updatedSessions);
      }
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="rounded-3xl bg-[#25325a] shadow-lg px-6 py-6 flex items-center justify-between">
        <div>
          <div className="text-2xl text-blue-100 font-bold mb-1">Nap Time</div>
          <div className="text-4xl md:text-5xl font-extrabold text-white tracking-wider">{formatTime(totalNapMs)}</div>
        </div>
        <button 
          onClick={toggleTimer}
          className="ml-4 bg-[#31416a] rounded-full w-14 h-14 flex items-center justify-center text-3xl text-blue-100 shadow-md hover:bg-[#3a4d7a] transition-colors"
        >
          {timerActive ? <span>⏸️</span> : <span>▶️</span>}
        </button>
      </div>
    </div>
  );
};

export default NapTimer; 