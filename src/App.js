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
import StaffFinance from './pages/StaffFinance';
import DramaModal from './components/DramaModal';
import Toasts from './components/Toasts';
import {
  IconHome, IconUsers, IconShoppingBag, IconBriefcase,
  IconActivity, IconBarChart, IconSettings, IconMusic,
  IconDollarSign,
} from './components/Icons';

function GameShell({ careerId, labelName, ownerName, onExit }) {
  const [tab, setTab] = useState('home');
  const {
    game, loading, toasts, pendingEvent,
    initGame, manualSave,
    signArtist, dropArtist, releaseMusic,
    bookTour, launchMerch, acceptSyncDeal,
    hireStaff, startTraining, takeLoan,
    resolveDramaChoice,
    advanceWeek,
  } = useGameState(careerId);

  useEffect(() => {
    if (!loading && !game && labelName && ownerName) {
      initGame(labelName, ownerName);
    }
  }, [loading, game, labelName, ownerName]);

  if (loading || !game) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconMusic size={26} color="#0a0804" />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-dim)', letterSpacing: '0.15em', fontSize: 13, textTransform: 'uppercase' }}>
          Loading...
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home',    label: 'HQ',      icon: <IconHome size={20} />        },
    { id: 'roster',  label: 'Roster',  icon: <IconUsers size={20} />       },
    { id: 'market',  label: 'Market',  icon: <IconShoppingBag size={20} /> },
    { id: 'biz',     label: 'Biz',     icon: <IconBriefcase size={20} />   },
    { id: 'ops',     label: 'Ops',     icon: <IconDollarSign size={20} />  },
    { id: 'charts',  label: 'Charts',  icon: <IconBarChart size={20} />    },
  ];

  // Image health indicator
  const imageColor = game.imageHealth >= 70 ? 'var(--success)' : game.imageHealth >= 40 ? '#f39c12' : '#e74c3c';
  const hasPendingEvent = Boolean(pendingEvent);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <div className="top-nav">
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--gold-light)', letterSpacing: '0.06em', lineHeight: 1 }}>
            {game.labelName}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 2, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              Wk {game.week} · ${(game.cash / 1000000).toFixed(2)}M
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: imageColor }}>
              ◆ {Math.round(game.imageHealth || 100)}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {hasPendingEvent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', background: 'rgba(230,126,34,0.15)', border: '1px solid rgba(230,126,34,0.4)', borderRadius: 'var(--radius)', animation: 'goldPulse 1.5s infinite' }}>
              <span style={{ fontSize: 11, color: '#f39c12', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>EVENT!</span>
            </div>
          )}
          <button className="btn btn-outline btn-sm" onClick={() => setTab('settings')} aria-label="Settings" style={{ padding: '8px 12px', gap: 6 }}>
            <IconSettings size={16} />
          </button>
        </div>
      </div>

      {/* Feed indicator bar */}
      {tab !== 'feed' && game.socialFeed.length > 0 && (
        <div
          onClick={() => setTab('feed')}
          style={{
            background: 'var(--bg-2)', borderBottom: '1px solid var(--border)',
            padding: '6px 16px', cursor: 'pointer',
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Latest: {' '}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
            {game.socialFeed[0]?.text?.slice(0, 80)}{game.socialFeed[0]?.text?.length > 80 ? '…' : ''}
          </span>
        </div>
      )}

      {/* Page content */}
      <div style={{ flex: 1 }}>
        {tab === 'home'     && <Dashboard game={game} advanceWeek={advanceWeek} manualSave={manualSave} />}
        {tab === 'roster'   && <Roster game={game} releaseMusic={releaseMusic} bookTour={bookTour} launchMerch={launchMerch} dropArtist={dropArtist} />}
        {tab === 'market'   && <Market game={game} signArtist={signArtist} />}
        {tab === 'biz'      && <Business game={game} acceptSyncDeal={acceptSyncDeal} />}
        {tab === 'ops'      && <StaffFinance game={game} hireStaff={hireStaff} startTraining={startTraining} takeLoan={takeLoan} />}
        {tab === 'feed'     && <SocialFeed game={game} />}
        {tab === 'charts'   && <Charts game={game} />}
        {tab === 'settings' && <Settings game={game} manualSave={manualSave} onExitToMenu={onExit} careerId={careerId} />}
      </div>

      {/* Tab bar */}
      <nav className="tab-bar">
        {tabs.map(t => (
          <button key={t.id} className={`tab-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)} aria-label={t.label}>
            {t.icon}
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Drama event overlay */}
      {pendingEvent && (
        <DramaModal
          event={pendingEvent}
          game={game}
          onResolve={resolveDramaChoice}
          onDismiss={() => {}}
        />
      )}

      <Toasts toasts={toasts} />
    </div>
  );
}

function AppRouter() {
  const { currentUser } = useAuth();
  const [screen, setScreen] = useState('auth');
  const [activeCareerId, setActiveCareerId] = useState(null);
  const [pendingCareer, setPendingCareer] = useState(null);

  useEffect(() => {
    if (currentUser && screen === 'auth') setScreen('careers');
    if (!currentUser && screen !== 'auth') setScreen('auth');
  }, [currentUser]);

  const handleSelectCareer = (id) => { setActiveCareerId(id); setPendingCareer(null); setScreen('game'); };
  const handleNewCareer = (id, labelName, ownerName) => { setActiveCareerId(id); setPendingCareer({ id, labelName, ownerName }); setScreen('game'); };
  const handleExit = () => { setActiveCareerId(null); setPendingCareer(null); setScreen('careers'); };

  if (screen === 'auth') return <AuthScreen onAuth={() => setScreen('careers')} />;
  if (screen === 'careers') return <CareerSelect onSelectCareer={handleSelectCareer} onNewCareer={handleNewCareer} />;
  if (screen === 'game' && activeCareerId) return <GameShell careerId={activeCareerId} labelName={pendingCareer?.labelName} ownerName={pendingCareer?.ownerName} onExit={handleExit} />;
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
