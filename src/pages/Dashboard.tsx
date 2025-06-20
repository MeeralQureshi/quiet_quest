import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NapSessionCard from '../components/NapSessionCard';
import QuestCard from '../components/QuestCard';
import { NapSession, Quest } from '../types';
import { getNapSessions, saveNapSessions, checkAndResetDailyData } from '../utils/storage';
import AddQuestModal from '../components/AddQuestModal';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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
  const [showAddNap, setShowAddNap] = React.useState(false);
  const [addQuestSessionId, setAddQuestSessionId] = React.useState<string | null>(null);
  const [editQuestData, setEditQuestData] = useState<{ sessionId: string; quest: Quest } | null>(null);
  const [editSessionData, setEditSessionData] = useState<{ sessionId: string; name: string } | null>(null);

  useEffect(() => {
    // Check for daily reset on component mount
    checkAndResetDailyData();
    const sessions = getNapSessions();
    setNapSessions(sessions);

    // Set up periodic check for daily reset (every minute)
    const resetInterval = setInterval(() => {
      checkAndResetDailyData();
      // Refresh sessions if reset occurred
      const currentSessions = getNapSessions();
      setNapSessions(currentSessions);
    }, 60000);

    return () => clearInterval(resetInterval);
  }, []);

  const createNapSession = () => {
    if (!newNapName.trim()) return;

    const newSession: NapSession = {
      id: uuidv4(),
      name: newNapName,
      quests: [],
      createdAt: Date.now(),
    };

    const updatedSessions = [...napSessions, newSession];
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
    setNewNapName('');
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

  const deleteNapSession = (sessionId: string) => {
    const updatedSessions = napSessions.filter(session => session.id !== sessionId);
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
  };

  const handleEditSession = (sessionId: string, newName: string) => {
    const updatedSessions = napSessions.map(session =>
      session.id === sessionId ? { ...session, name: newName } : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
    setEditSessionData(null);
  };

  // Update onDragEnd to only handle quest reordering
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    
    // Only allow reordering within the same nap session for quests
    if (source.droppableId !== destination.droppableId) return;
    if (source.index === destination.index) return;
    setNapSessions(prevSessions => prevSessions.map(session => {
      if (session.id !== source.droppableId) return session;
      const quests = Array.from(session.quests);
      const [removed] = quests.splice(source.index, 1);
      quests.splice(destination.index, 0, removed);
      const updated = { ...session, quests };
      saveNapSessions(prevSessions.map(s => s.id === session.id ? updated : s));
      return updated;
    }));
  };

  // Add quest with modal data
  const handleAddQuest = (sessionId: string, quest: { title: string; estimatedTime: number; energyLevel: string }) => {
    const newQuest = {
      id: uuidv4(),
      title: quest.title,
      estimatedTime: quest.estimatedTime,
      energyLevel: quest.energyLevel as '🧘' | '⚡' | '🚀',
      emoji: quest.energyLevel, // Default emoji to energy for now
      status: 'pending' as const,
      createdAt: Date.now(),
    };
    const updatedSessions = napSessions.map(session =>
      session.id === sessionId
        ? { ...session, quests: [...session.quests, newQuest] }
        : session
    );
    setNapSessions(updatedSessions);
    saveNapSessions(updatedSessions);
    setAddQuestSessionId(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden font-baloo bg-transparent">
      <StarryBackground />
      <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-10 pb-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">QuietQuest</h1>
            <span className="text-5xl md:text-6xl ml-2" role="img" aria-label="moon">🌙</span>
          </div>
          <p className="mt-2 text-lg md:text-xl text-blue-200 font-medium tracking-wide text-center">Your magical quest begins when the baby naps.</p>
        </div>
        {/* Empty State */}
        {napSessions.length === 0 && (
          <div className="w-full text-center py-16 px-4 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-blue-400/10 blur-2xl animate-pulse"></div>
            </div>
            <div className="relative">
              <span className="text-6xl mb-6 block animate-float" role="img" aria-label="moon">🌙</span>
              <p className="text-2xl text-blue-200 font-medium tracking-wide mb-4">
                Add your first nap session
              </p>
              <p className="text-xl text-blue-300/80 font-medium tracking-wide">
                to get started on your magical journey
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <span className="text-2xl animate-sparkle-1" role="img" aria-label="sparkle">✨</span>
                <span className="text-2xl animate-sparkle-2" role="img" aria-label="sparkle">✨</span>
                <span className="text-2xl animate-sparkle-3" role="img" aria-label="sparkle">✨</span>
              </div>
            </div>
          </div>
        )}
        {/* Nap Sessions Section */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full space-y-5">
            {napSessions.map(session => (
              <NapSessionCard
                key={session.id}
                session={session}
                onAddQuest={() => setAddQuestSessionId(session.id)}
                onEdit={(sessionId) => setEditSessionData({ sessionId, name: session.name })}
                onDelete={deleteNapSession}
              >
                <Droppable droppableId={session.id}>
                  {(provided) => (
                    <div 
                      className="flex flex-col gap-2 mb-1" 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {session.quests.map((quest, idx) => (
                        <Draggable key={quest.id} draggableId={quest.id} index={idx}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <QuestCard
                                quest={quest}
                                sessionId={session.id}
                                onStatusChange={updateQuestStatus}
                                onDelete={deleteQuest}
                                onEdit={(sessionId, quest) => setEditQuestData({ sessionId, quest })}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </NapSessionCard>
            ))}
          </div>
        </DragDropContext>
        {/* Add Nap Session Button */}
        <div className="w-full flex flex-col items-center mt-8">
          {showAddNap ? (
            <div className="w-full flex flex-col items-center mb-4">
              <form 
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newNapName.trim()) {
                    createNapSession();
                    setShowAddNap(false);
                  }
                }}
              >
                <input
                  type="text"
                  value={newNapName}
                  onChange={(e) => setNewNapName(e.target.value)}
                  placeholder="Enter nap session name..."
                  className="w-full bg-[#31416a] text-white px-6 py-4 rounded-2xl font-bold placeholder-blue-200/70 mb-4 border-2 border-blue-300/30 outline-none focus:border-blue-300/70 shadow-lg text-lg"
                  autoFocus
                />
                <div className="flex gap-4 w-full">
                  <button
                    type="submit"
                    className={`flex-1 font-extrabold py-4 rounded-2xl shadow-lg transition-all text-lg ${
                      newNapName.trim() 
                        ? 'bg-[#22305a] text-blue-200 hover:bg-[#31416a] hover:text-blue-100 border-2 border-blue-300' 
                        : 'bg-[#22305a]/40 text-blue-200/50 cursor-not-allowed border-2 border-blue-300/30'
                    }`}
                    disabled={!newNapName.trim()}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddNap(false); setNewNapName(''); }}
                    className="flex-1 bg-gray-500/30 text-gray-300 font-extrabold py-4 rounded-2xl shadow-lg hover:bg-gray-600/40 hover:text-blue-200 transition-all text-lg border-2 border-gray-400/30"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowAddNap(true)}
              className="w-full bg-[#25325a] text-blue-200 font-extrabold text-2xl py-5 rounded-3xl shadow-lg flex items-center justify-center hover:bg-[#31416a] hover:text-blue-100 transition border-2 border-blue-300 mt-2"
            >
              + Add Nap Session
            </button>
          )}
        </div>
        {/* Add Quest Modal */}
        {addQuestSessionId && (
          <AddQuestModal
            onAdd={quest => handleAddQuest(addQuestSessionId, quest)}
            onClose={() => setAddQuestSessionId(null)}
          />
        )}
        {/* Edit Quest Modal */}
        {editQuestData && (
          <AddQuestModal
            onAdd={quest => {
              editQuest(editQuestData.sessionId, editQuestData.quest.id, {
                title: quest.title,
                estimatedTime: quest.estimatedTime,
                energyLevel: quest.energyLevel as '🧘' | '⚡' | '🚀',
                emoji: quest.energyLevel as '🧘' | '⚡' | '🚀',
              });
              setEditQuestData(null);
            }}
            onClose={() => setEditQuestData(null)}
            initialTitle={editQuestData.quest.title}
            initialEstimatedTime={editQuestData.quest.estimatedTime}
            initialEnergyLevel={editQuestData.quest.energyLevel}
            isEdit
          />
        )}
        {/* Edit Nap Session Modal */}
        {editSessionData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setEditSessionData(null)}>
            <form
              className="bg-[#18305a] rounded-3xl shadow-2xl px-8 py-10 w-[90vw] max-w-xl flex flex-col items-center relative"
              style={{ minWidth: 320 }}
              onClick={e => e.stopPropagation()}
              onSubmit={e => {
                e.preventDefault();
                if (!editSessionData.name.trim()) return;
                handleEditSession(editSessionData.sessionId, editSessionData.name.trim());
              }}
            >
              <h2 className="text-4xl font-extrabold text-[#f7f3e8] mb-8 tracking-tight">Edit Nap Session</h2>
              <input
                className="w-full bg-[#f7f3e8] text-[#18305a] text-2xl font-bold rounded-2xl px-6 py-4 mb-8 focus:outline-none placeholder-[#18305a]/60"
                placeholder="Nap name"
                value={editSessionData.name}
                onChange={e => setEditSessionData({ ...editSessionData, name: e.target.value })}
                autoFocus
              />
              <button
                type="submit"
                className={`w-full rounded-2xl py-4 text-2xl font-extrabold transition-all ${editSessionData.name.trim() ? 'bg-[#22305a] text-[#f7f3e8] hover:bg-[#2c3e50]' : 'bg-[#22305a]/60 text-[#f7f3e8]/60 cursor-not-allowed'}`}
                disabled={!editSessionData.name.trim()}
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;