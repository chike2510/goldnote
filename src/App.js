import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useGameState } from './hooks/useGameState';
import AuthScreen from './pages/AuthScreen';
import CareerSelect from './pages/CareerSelect';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Roster from './pages/Roster';
import Business from './pages/Business';
import SocialFeed from './pages/SocialFeed';
import Charts from './pages/Charts';
import Settings from './pages/Settings';
import Toasts from './components/Toasts';
import {
  IconHome, IconUsers, IconShoppingBag, IconBriefcase,
  IconActivity, IconBarChart, IconSettings, IconMusic
} from './components/Icons';

function GameShell({ careerId, labelName, ownerName, onExit }) {
  const [tab, setTab] = useState('home');
  const {
    game, loading, toasts, addToast,
    initGame, manualSave,
    signArtist, dropArtist, releaseMusic,
    bookTour, launchMerch, acceptSyncDeal,
    advanceWeek,
  } = useGameState(careerId);

  // Initialize new game if no saved state
  useEffect(() => {
    if (!loading && !game && labelName && ownerName) {
      initGame(labelName, ownerName);
    }
  }, [loading, game, labelName, ownerName]);

  if (loading || !game) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconMusic size={24} color="#0a0804" />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-dim)', letterSpacing: '0.15em', fontSize: 13, textTransform: 'uppercase' }}>
          Loading...
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home',    label: 'HQ',      icon: <IconHome size={20} /> },
    { id: 'roster',  label: 'Roster',  icon: <IconUsers size={20} /> },
    { id: 'market',  label: 'Market',  icon: <IconShoppingBag size={20} /> },
    { id: 'biz',     label: 'Biz',     icon: <IconBriefcase size={20} /> },
    { id: 'feed',    label: 'Feed',    icon: <IconActivity size={20} /> },
    { id: 'charts',  label: 'Charts',  icon: <IconBarChart size={20} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div className="top-nav">
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--gold-light)', letterSpacing: '0.06em', lineHeight: 1 }}>
            {game.labelName}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
            Wk {game.week} · ${(game.cash / 1000000).toFixed(2)}M
          </div>
        </div>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setTab('settings')}
          aria-label="Settings"
          style={{ padding: '8px 12px', gap: 6 }}
        >
          <IconSettings size={16} />
          <span style={{ fontSize: 11 }}>Settings</span>
        </button>
      </div>

      {/* Page content */}
      <div style={{ flex: 1 }}>
        {tab === 'home'     && <Dashboard game={game} advanceWeek={advanceWeek} manualSave={manualSave} />}
        {tab === 'roster'   && <Roster game={game} releaseMusic={releaseMusic} bookTour={bookTour} launchMerch={launchMerch} dropArtist={dropArtist} />}
        {tab === 'market'   && <Market game={game} signArtist={signArtist} />}
        {tab === 'biz'      && <Business game={game} acceptSyncDeal={acceptSyncDeal} />}
        {tab === 'feed'     && <SocialFeed game={game} />}
        {tab === 'charts'   && <Charts game={game} />}
        {tab === 'settings' && <Settings game={game} manualSave={manualSave} onExitToMenu={onExit} careerId={careerId} />}
      </div>

      {/* Tab bar */}
      <nav className="tab-bar">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`tab-item ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
            aria-label={t.label}
          >
            {t.icon}
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>

      <Toasts toasts={toasts} />
    </div>
  );
}

function AppRouter() {
  const { currentUser } = useAuth();
  // screen: 'auth' | 'careers' | 'game'
  const [screen, setScreen] = useState('auth');
  const [activeCareerId, setActiveCareerId] = useState(null);
  // For new career init
  const [pendingCareer, setPendingCareer] = useState(null); // { id, labelName, ownerName }

  // Auto-advance to careers if logged in
  useEffect(() => {
    if (currentUser && screen === 'auth') setScreen('careers');
    if (!currentUser && screen !== 'auth') setScreen('auth');
  }, [currentUser]);

  const handleAuth = () => setScreen('careers');

  const handleSelectCareer = (id) => {
    setActiveCareerId(id);
    setPendingCareer(null);
    setScreen('game');
  };

  const handleNewCareer = (id, labelName, ownerName) => {
    setActiveCareerId(id);
    setPendingCareer({ id, labelName, ownerName });
    setScreen('game');
  };

  const handleExitToMenu = () => {
    setActiveCareerId(null);
    setPendingCareer(null);
    setScreen('careers');
  };

  if (screen === 'auth') return <AuthScreen onAuth={handleAuth} />;
  if (screen === 'careers') return (
    <CareerSelect
      onSelectCareer={handleSelectCareer}
      onNewCareer={handleNewCareer}
    />
  );
  if (screen === 'game' && activeCareerId) return (
    <GameShell
      careerId={activeCareerId}
      labelName={pendingCareer?.labelName}
      ownerName={pendingCareer?.ownerName}
      onExit={handleExitToMenu}
    />
  );

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
