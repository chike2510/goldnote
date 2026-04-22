import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useGameState } from './hooks/useGameState';
import { GENRE_TREND_CYCLES } from './data/gameData';
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
import WeeklySummary from './components/WeeklySummary';
import Toasts from './components/Toasts';
import {
  IconHome, IconUsers, IconShoppingBag, IconBriefcase,
  IconActivity, IconBarChart, IconSettings, IconMusic, IconDollarSign,
} from './components/Icons';

function GameShell({ careerId, labelName, ownerName, difficulty, onExit }) {
  const [tab, setTab] = useState('home');
  const {
    game, loading, toasts, pendingEvent, weekSummary,
    initGame, manualSave,
    signArtist, dropArtist, releaseMusic,
    bookTour, launchMerch, acceptSyncDeal,
    hireStaff, startTraining, takeLoan,
    resolveDrama, advanceWeek, dismissSummary,
  } = useGameState(careerId);

  useEffect(() => {
    if (!loading && !game && labelName && ownerName) {
      initGame(labelName, ownerName, difficulty || 'normal');
    }
  }, [loading, game, labelName, ownerName, difficulty]);

  if (loading || !game) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', flexDirection:'column', gap:16 }}>
        <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,var(--gold),var(--gold-light))', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <IconMusic size={26} color="#0a0804" />
        </div>
        <div style={{ fontFamily:'var(--font-display)', color:'var(--gold-dim)', letterSpacing:'0.15em', fontSize:13, textTransform:'uppercase' }}>Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id:'home',   label:'HQ',     icon:<IconHome size={20} />         },
    { id:'roster', label:'Roster', icon:<IconUsers size={20} />        },
    { id:'market', label:'Market', icon:<IconShoppingBag size={20} />  },
    { id:'biz',    label:'Biz',    icon:<IconBriefcase size={20} />    },
    { id:'ops',    label:'Ops',    icon:<IconDollarSign size={20} />   },
    { id:'charts', label:'Charts', icon:<IconBarChart size={20} />     },
  ];

  const imgColor = (game.imageHealth||100)>=70?'#2ecc71':(game.imageHealth||100)>=40?'#f39c12':'#e74c3c';
  const trendGenre = (game.currentTrendIdx!=null) ? GENRE_TREND_CYCLES[game.currentTrendIdx]?.genre : null;

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      {/* Top nav */}
      <div className="top-nav">
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:15, color:'var(--gold-light)', letterSpacing:'0.05em', lineHeight:1 }}>{game.labelName}</div>
          <div style={{ display:'flex', gap:10, marginTop:2, alignItems:'center' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)' }}>
              Wk {game.week} · ${(game.cash/1000000).toFixed(2)}M
            </span>
            <span style={{ fontSize:11, color:imgColor, fontFamily:'var(--font-mono)' }}>◆{Math.round(game.imageHealth||100)}</span>
            {trendGenre && <span style={{ fontSize:10, color:'var(--gold-dim)', fontFamily:'var(--font-display)' }}>📈{trendGenre}</span>}
          </div>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {pendingEvent && (
            <div style={{ padding:'5px 10px', background:'rgba(231,76,60,0.15)', border:'1px solid rgba(231,76,60,0.4)', borderRadius:'var(--radius)', animation:'goldPulse 1.5s infinite' }}>
              <span style={{ fontSize:10, color:'#e74c3c', fontFamily:'var(--font-display)', letterSpacing:'0.08em' }}>EVENT!</span>
            </div>
          )}
          <button className="btn btn-outline btn-sm" onClick={()=>setTab('settings')} aria-label="Settings" style={{ padding:'8px 10px' }}>
            <IconSettings size={16} />
          </button>
        </div>
      </div>

      {/* Feed ticker */}
      {tab!=='feed' && game.socialFeed.length>0 && (
        <div onClick={()=>setTab('feed')} style={{ background:'var(--bg-2)', borderBottom:'1px solid var(--border)', padding:'6px 16px', cursor:'pointer', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
          <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase', marginRight:6 }}>
            {game.socialFeed[0]?.important ? '🔔' : '📰'}
          </span>
          <span style={{ fontSize:12, color:game.socialFeed[0]?.important?'var(--text)':'var(--text-dim)' }}>
            {game.socialFeed[0]?.text?.slice(0,90)}{game.socialFeed[0]?.text?.length>90?'…':''}
          </span>
        </div>
      )}

      {/* Page */}
      <div style={{ flex:1 }}>
        {tab==='home'     && <Dashboard game={game} advanceWeek={advanceWeek} manualSave={manualSave} />}
        {tab==='roster'   && <Roster game={game} releaseMusic={releaseMusic} bookTour={bookTour} launchMerch={launchMerch} dropArtist={dropArtist} />}
        {tab==='market'   && <Market game={game} signArtist={signArtist} />}
        {tab==='biz'      && <Business game={game} acceptSyncDeal={acceptSyncDeal} />}
        {tab==='ops'      && <StaffFinance game={game} hireStaff={hireStaff} startTraining={startTraining} takeLoan={takeLoan} />}
        {tab==='feed'     && <SocialFeed game={game} />}
        {tab==='charts'   && <Charts game={game} />}
        {tab==='settings' && <Settings game={game} manualSave={manualSave} onExitToMenu={onExit} careerId={careerId} />}
      </div>

      {/* Tab bar */}
      <nav className="tab-bar">
        {tabs.map(t=>(
          <button key={t.id} className={`tab-item ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)} aria-label={t.label}>
            {t.icon}
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Overlays */}
      {pendingEvent && <DramaModal event={pendingEvent} game={game} onResolve={resolveDrama} />}
      {weekSummary && !pendingEvent && <WeeklySummary report={weekSummary} game={game} onClose={dismissSummary} />}
      <Toasts toasts={toasts} />
    </div>
  );
}

function AppRouter() {
  const { currentUser } = useAuth();
  const [screen, setScreen] = useState('auth');
  const [activeCareer, setActiveCareer] = useState(null);
  const [pendingCareer, setPendingCareer] = useState(null);

  useEffect(() => {
    if (currentUser && screen==='auth') setScreen('careers');
    if (!currentUser && screen!=='auth') setScreen('auth');
  }, [currentUser]);

  const selectCareer  = (id) => { setActiveCareer(id); setPendingCareer(null); setScreen('game'); };
  const newCareer     = (id, labelName, ownerName, difficulty) => { setActiveCareer(id); setPendingCareer({id,labelName,ownerName,difficulty}); setScreen('game'); };
  const exit          = () => { setActiveCareer(null); setPendingCareer(null); setScreen('careers'); };

  if (screen==='auth')    return <AuthScreen onAuth={()=>setScreen('careers')} />;
  if (screen==='careers') return <CareerSelect onSelectCareer={selectCareer} onNewCareer={newCareer} />;
  if (screen==='game' && activeCareer) return (
    <GameShell
      careerId={activeCareer}
      labelName={pendingCareer?.labelName}
      ownerName={pendingCareer?.ownerName}
      difficulty={pendingCareer?.difficulty}
      onExit={exit}
    />
  );
  return null;
}

export default function App() {
  return <AuthProvider><AppRouter /></AuthProvider>;
}
