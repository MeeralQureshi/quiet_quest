import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NapSessionCard from '../components/NapSessionCard';
import QuestCard from '../components/QuestCard';
import { NapSession, Quest } from '../types';
import { getNapSessions, saveNapSessions, resetDailyData } from '../utils/storage';
import NapTimer from '../components/NapTimer';

// Star SVGs for background
const StarryBackground = () => (
  <svg className="starry-bg" width="100vw" height="100vh" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:0,pointerEvents:'none'}}>
    {/* Yellow stars */}
    <circle cx="10%" cy="10%" r="2" fill="#F9D76E"/>
    <circle cx="20%" cy="30%" r="1.5" fill="#FCD34D"/>
    <circle cx="80%" cy="20%" r="1.5" fill="#F9D76E"/>
    <circle cx="60%" cy="80%" r="2" fill="#FCD34D"/>
    <circle cx="90%" cy="60%" r="1.2" fill="#F9D76E"/>
    <circle cx="40%" cy="70%" r="1.2" fill="#FCD34D"/>
    <circle cx="70%" cy="40%" r="1.5" fill="#F9D76E"/>
    <circle cx="30%" cy="60%" r="1.2" fill="#FCD34D"/>
    <circle cx="50%" cy="50%" r="1.5" fill="#F9D76E"/>
    {/* More yellow stars for density */}
    <circle cx="15%" cy="80%" r="1.1" fill="#F9D76E"/>
    <circle cx="25%" cy="15%" r="1.3" fill="#FCD34D"/>
    <circle cx="35%" cy="40%" r="1.2" fill="#F9D76E"/>
    <circle cx="45%" cy="20%" r="1.4" fill="#FCD34D"/>
    <circle cx="55%" cy="75%" r="1.1" fill="#F9D76E"/>
    <circle cx="65%" cy="10%" r="1.3" fill="#FCD34D"/>
    <circle cx="75%" cy="60%" r="1.2" fill="#F9D76E"/>
    <circle cx="85%" cy="35%" r="1.4" fill="#FCD34D"/>
    <circle cx="95%" cy="80%" r="1.1" fill="#F9D76E"/>
    <circle cx="12%" cy="55%" r="1.2" fill="#FCD34D"/>
    <circle cx="22%" cy="75%" r="1.3" fill="#F9D76E"/>
    <circle cx="32%" cy="85%" r="1.1" fill="#FCD34D"/>
    <circle cx="42%" cy="60%" r="1.2" fill="#F9D76E"/>
    <circle cx="52%" cy="30%" r="1.4" fill="#FCD34D"/>
    <circle cx="62%" cy="55%" r="1.1" fill="#F9D76E"/>
    <circle cx="72%" cy="75%" r="1.3" fill="#FCD34D"/>
    <circle cx="82%" cy="85%" r="1.1" fill="#F9D76E"/>
    <circle cx="92%" cy="40%" r="1.2" fill="#FCD34D"/>
    <circle cx="18%" cy="50%" r="1.2" fill="#F9D76E"/>
    <circle cx="28%" cy="65%" r="1.3" fill="#FCD34D"/>
    <circle cx="38%" cy="25%" r="1.1" fill="#F9D76E"/>
    <circle cx="48%" cy="90%" r="1.2" fill="#FCD34D"/>
    <circle cx="58%" cy="15%" r="1.4" fill="#F9D76E"/>
    <circle cx="68%" cy="50%" r="1.1" fill="#FCD34D"/>
    <circle cx="78%" cy="70%" r="1.3" fill="#F9D76E"/>
    <circle cx="88%" cy="25%" r="1.1" fill="#FCD34D"/>
    <circle cx="98%" cy="10%" r="1.2" fill="#F9D76E"/>
    {/* Dark blue stars for depth */}
    <circle cx="8%" cy="18%" r="1.7" fill="#25325a"/>
    <circle cx="18%" cy="88%" r="1.3" fill="#22305a"/>
    <circle cx="28%" cy="48%" r="1.5" fill="#25325a"/>
    <circle cx="36%" cy="12%" r="1.1" fill="#22305a"/>
    <circle cx="44%" cy="78%" r="1.4" fill="#25325a"/>
    <circle cx="53%" cy="63%" r="1.2" fill="#22305a"/>
    <circle cx="61%" cy="27%" r="1.6" fill="#25325a"/>
    <circle cx="69%" cy="85%" r="1.2" fill="#22305a"/>
    <circle cx="77%" cy="13%" r="1.5" fill="#25325a"/>
    <circle cx="86%" cy="57%" r="1.1" fill="#22305a"/>
    <circle cx="94%" cy="33%" r="1.3" fill="#25325a"/>
    <circle cx="25%" cy="55%" r="1.2" fill="#22305a"/>
    <circle cx="55%" cy="10%" r="1.1" fill="#25325a"/>
    <circle cx="80%" cy="90%" r="1.3" fill="#22305a"/>
  </svg>
);

const Dashboard: React.FC = () => {
  const [napSessions, setNapSessions] = useState<NapSession[]>([]);
  const [newNapName, setNewNapName] = useState('');
  const [timerActive, setTimerActive] = React.useState(true);
  const [showAddNap, setShowAddNap] = React.useState(false);

  useEffect(() => {
    // Reset daily data on component mount
    resetDailyData();
    const sessions = getNapSessions();
    setNapSessions(sessions);
  }, []);

  const createNapSession = () => {
    if (!newNapName.trim()) return;

    const newSession: NapSession = {
      id: uuidv4(),
      name: newNapName,
      startTime: null,
      endTime: null,
      quests: [],
      createdAt: Date.now(),
    };

    const updatedSessions = [...napSessions, newSession];
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
    setNewNapName('');
  };

  const startTimer = (sessionId: string) => {
    const updatedSessions = napSessions.map(session =>
      session.id === sessionId
        ? { ...session, startTime: Date.now(), endTime: null }
        : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
  };

  const stopTimer = (sessionId: string) => {
    const updatedSessions = napSessions.map(session =>
      session.id === sessionId
        ? { ...session, endTime: Date.now() }
        : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
  };

  const addQuest = (sessionId: string) => {
    const newQuest: Quest = {
      id: uuidv4(),
      title: 'New Quest',
      estimatedTime: 30,
      energyLevel: '🧘',
      emoji: '📝',
      status: 'pending',
      createdAt: Date.now(),
    };

    const updatedSessions = napSessions.map(session =>
      session.id === sessionId
        ? { ...session, quests: [...session.quests, newQuest] }
        : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
  };

  const updateQuestStatus = (sessionId: string, questId: string, status: Quest['status']) => {
    const updatedSessions = napSessions.map(session =>
      session.id === sessionId
        ? {
            ...session,
            quests: session.quests.map(quest =>
              quest.id === questId ? { ...quest, status } : quest
            ),
          }
        : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
  };

  const deleteQuest = (sessionId: string, questId: string) => {
    const updatedSessions = napSessions.map(session =>
      session.id === sessionId
        ? {
            ...session,
            quests: session.quests.filter(quest => quest.id !== questId),
          }
        : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
  };

  const editQuest = (sessionId: string, questId: string, updatedQuest: Partial<Quest>) => {
    const updatedSessions = napSessions.map(session =>
      session.id === sessionId
        ? {
            ...session,
            quests: session.quests.map(quest =>
              quest.id === questId ? { ...quest, ...updatedQuest } : quest
            ),
          }
        : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
  };

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

  // Helper to format duration in ms to '1h 45m' style
  const formatDuration = (ms: number) => {
    const totalMinutes = Math.floor(ms / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden">
      <StarryBackground />
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 pt-12 pb-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">QuietQuest</h1>
            <span className="text-4xl md:text-5xl" role="img" aria-label="moon">🌙</span>
          </div>
          <p className="mt-2 text-lg md:text-xl text-blue-200 font-medium tracking-wide text-center">Your magical quest begins when the baby naps.</p>
        </div>
        <NapTimer
          time={formatTime(totalNapMs)}
          isActive={timerActive}
          onToggle={() => setTimerActive((v) => !v)}
        />
        <div className="w-full">
          {napSessions.map(session => {
            // Calculate session duration
            let sessionMs = 0;
            if (session.startTime && session.endTime) {
              sessionMs = session.endTime - session.startTime;
            }
            return (
              <NapSessionCard
                key={session.id}
                session={session}
                duration={formatDuration(sessionMs)}
                onAddQuest={addQuest}
              >
                {session.quests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onStatusChange={(id, status) => updateQuestStatus(session.id, id, status)}
                    onDelete={(id) => deleteQuest(session.id, id)}
                    onEdit={(id, updatedQuest) => editQuest(session.id, id, updatedQuest)}
                  />
                ))}
              </NapSessionCard>
            );
          })}
        </div>
        {/* Add Nap Session Button */}
        <div className="w-full flex flex-col items-center mt-8">
          {showAddNap ? (
            <div className="w-full flex flex-col items-center mb-4">
              <input
                type="text"
                value={newNapName}
                onChange={(e) => setNewNapName(e.target.value)}
                placeholder="Enter nap session name..."
                className="w-full bg-[#34495E] text-white px-4 py-3 rounded-2xl font-light placeholder-gray-400 mb-2 border-none outline-none shadow-md"
                autoFocus
              />
              <div className="flex gap-2 w-full">
                <button
                  onClick={createNapSession}
                  className={`flex-1 font-bold py-2 rounded-2xl shadow transition ${newNapName.trim() ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-blue-200 text-blue-100 cursor-not-allowed'}`}
                  disabled={!newNapName.trim()}
                >
                  Add
                </button>
                <button
                  onClick={() => { setShowAddNap(false); setNewNapName(''); }}
                  className="flex-1 bg-gray-400 text-white font-bold py-2 rounded-2xl shadow hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddNap(true)}
              className="w-full bg-[#31416a] text-blue-100 font-extrabold text-lg py-4 rounded-full shadow-lg flex items-center justify-center hover:bg-[#3b4a6b] transition border-2 border-blue-300"
            >
              + Add Nap Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 