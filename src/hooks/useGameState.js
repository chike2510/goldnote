import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  REAL_ARTISTS, CHART_SONGS, DRAMA_EVENTS, NEWS_EVENTS, NEAR_MISS_EVENTS,
  LABEL_TIERS, RIVAL_LABELS, WEEKLY_OBJECTIVES, AWARD_SHOWS,
  PRODUCERS, ROLLOUT_STRATEGIES, PLATFORM_STRATEGIES, STAFF_ROLES,
  GENRE_TREND_CYCLES, REGIONAL_TIERS, DIFFICULTY,
  generateAIArtist,
} from '../data/gameData';
import { useAuth } from './useAuth';

// ─── CONSTANTS ────────────────────────────────
const AUTOSAVE_MS   = 60000;
const BASE_STREAM   = 0.0028;   // $ per stream — balanced rate (was 0.0040)
const MAX_FEED      = 100;
const MARKET_SLOTS  = 12;
const AI_SHARE      = 0.35;     // 35% of market = AI artists

// ─── UTILS ────────────────────────────────────
const ri  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const rf  = arr   => arr[Math.floor(Math.random()*arr.length)];
const cl  = (v,lo,hi) => Math.min(hi,Math.max(lo,v));
const pct = (v,p) => Math.floor(v*(1+p/100));

export function fmtM(n) {
  if (!n && n!==0) return '$0';
  const a = Math.abs(n);
  const s = n < 0 ? '-' : '';
  if (a>=1e9) return `${s}$${(a/1e9).toFixed(2)}B`;
  if (a>=1e6) return `${s}$${(a/1e6).toFixed(2)}M`;
  if (a>=1e3) return `${s}$${(a/1e3).toFixed(0)}K`;
  return `${s}$${Math.floor(a).toLocaleString()}`;
}

function getTierIdx(rev) {
  let idx = 0;
  for (const t of LABEL_TIERS) { if (rev >= t.minRevenue) idx = t.idx; }
  return idx;
}

// ─── MARKET BUILDER ───────────────────────────
// FIX: real artists shown regardless of currentLabel
// Player is competing with rivals — all artists negotiable
function buildMarket(rosterIds, week, anrLevel=0) {
  const inRoster = new Set(rosterIds);
  // All real artists are signable — filter only those already on YOUR roster
  let real = REAL_ARTISTS.filter(a => !inRoster.has(a.id));

  // A&R level improves quality of available pool
  if (anrLevel === 0) real = real.filter(a => a.tier !== 'S');  // can't get S tier without A&R
  if (anrLevel === 1) real = real.filter(a => a.tier !== 'S' || Math.random() > 0.7);
  // A&R level 2+ can get S-tier

  const shuffled = [...real].sort(() => Math.random()-0.5);
  const realCount = Math.floor(MARKET_SLOTS*(1-AI_SHARE));
  const aiCount   = MARKET_SLOTS - realCount;

  return [
    ...shuffled.slice(0, realCount),
    ...Array.from({length:aiCount}, () => generateAIArtist(week)),
  ].sort(() => Math.random()-0.5);
}

// ─── OBJECTIVE CHECKER ────────────────────────
function checkObjectives(state, done) {
  const charts = state.charts || [];
  const yourCharts = charts.filter(c=>c.isYours);
  const bestRank = yourCharts.length ? Math.min(...yourCharts.map(c=>c.rank)) : 999;

  const vals = {
    rosterSize:   state.roster.length,
    releaseCount: state.releases.length,
    chartPos:     bestRank,
    chartNum1:    bestRank === 1 ? 1 : 0,
    cash:         state.cash,
    totalRevenue: state.totalRevenue,
    syncCount:    state.syncDeals.length,
    aiRoster:     state.roster.filter(a=>!a.isReal).length,
    totalStreams:  state.releases.reduce((s,r)=>s+(r.totalStreams||0),0),
    tierIdx:      getTierIdx(state.totalRevenue),
    rivalBeaten:  state.rivalBeaten || 0,
  };

  return WEEKLY_OBJECTIVES.filter(o => {
    if (done.includes(o.id)) return false;
    const v = vals[o.metric];
    if (v===undefined) return false;
    return (o.metric==='chartPos') ? v<=o.target : v>=o.target;
  });
}

// ─── MAIN HOOK ────────────────────────────────
export function useGameState(careerId) {
  const { saveCareer, getCareers } = useAuth();
  const [game,         setGame]         = useState(null);
  const [toasts,       setToasts]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [pendingEvent, setPendingEvent] = useState(null);
  const [weekSummary,  setWeekSummary]  = useState(null); // end-of-week recap
  const gameRef   = useRef(null);
  const autoRef   = useRef(null);

  useEffect(() => { gameRef.current = game; }, [game]);

  // Load
  useEffect(() => {
    if (!careerId) { setLoading(false); return; }
    const c = getCareers().find(x=>x.id===careerId);
    if (c?.state) setGame(c.state);
    setLoading(false);
  }, [careerId]);

  // Autosave
  useEffect(() => {
    if (!game||!careerId) return;
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      const g = gameRef.current;
      if (g) saveCareer({id:careerId, name:g.labelName, state:g, savedAt:Date.now()});
    }, AUTOSAVE_MS);
    return () => clearInterval(autoRef.current);
  }, [careerId, game?.labelName]);

  // Toast
  const toast = useCallback((msg, type='info', dur=4500) => {
    const id = uuidv4();
    setToasts(t => [...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), dur);
  }, []);

  // ─── INIT ──────────────────────────────────
  const initGame = useCallback((labelName, ownerName, difficulty='normal') => {
    const diff = DIFFICULTY[difficulty] || DIFFICULTY.normal;
    const market = buildMarket([], 1, 0);
    const trendIdx = ri(0, GENRE_TREND_CYCLES.length-1);
    const state = {
      id: careerId,
      labelName, ownerName, difficulty,
      week:1, month:1, year:2025,
      cash: diff.startCash,
      totalRevenue:0, totalExpenses:0,
      equityGiven:0,
      activeLoans:[],
      labelFame:10, imageHealth:100,
      labelCulture:50,        // affects who wants to sign with you
      roster:[], releases:[],
      activeTours:[], activeMerch:[],
      syncDeals:[], staff:{},
      training:[], objectives:[],
      achievements:[], milestones:[],
      rivalBeaten:0,
      allTimeTours:0,
      chartRecords:{ longestNum1:0, biggestJump:0, mostWeeks:0 },
      weeklyReport:null,
      weeklySummary:null,
      currentTrendIdx: trendIdx,
      trendWeeksLeft: ri(4,8),
      socialFeed:[
        { id:uuidv4(), text:`🎬 ${labelName} opens its doors. The industry will never be the same.`, week:1, type:'milestone', important:true },
        { id:uuidv4(), text:`📊 Genre trending this week: ${GENRE_TREND_CYCLES[trendIdx].description}`, week:1, type:'trend', important:false },
        { id:uuidv4(), text:'💡 Tip: Releasing in a trending genre gives a massive stream boost.', week:1, type:'tip', important:false },
      ],
      charts: CHART_SONGS.filter(s=>!s.isAlbum).slice(0,50).map((s,i)=>({
        ...s, rank:i+1, isYours:false, isAI:false,
        weeksOnChart: Math.max(1, s.weeksOnChart - ri(0,20)),
        peakRank: s.peakRank||i+1,
        prevRank: i+1,
        movement: 0,
      })),
      albumCharts: CHART_SONGS.filter(s=>s.isAlbum).map((s,i)=>({
        ...s, rank:i+1, isYours:false, weeksOnChart:ri(1,20), peakRank:i+1,
      })),
      marketArtists: market,
      rivals: RIVAL_LABELS,
      diff,
    };
    setGame(state);
    return state;
  }, [careerId]);

  // ─── SIGN ─────────────────────────────────
  const signArtist = useCallback((artistId, dealType, royaltySplit, contractLength) => {
    setGame(prev => {
      const artist = prev.marketArtists.find(a=>a.id===artistId)
                  || REAL_ARTISTS.find(a=>a.id===artistId);
      if (!artist) return prev;
      if (prev.cash < artist.signingBonus) { toast('Not enough cash for signing bonus!','danger'); return prev; }

      // Label culture affects loyalty
      const cultureBonus = Math.floor((prev.labelCulture-50)/10);
      const contract = { dealType, royaltySplit, contractLength, weeksRemaining:contractLength, signingBonus:artist.signingBonus, weeklyFee:artist.weeklyFee, signedWeek:prev.week };
      const entry = {
        ...artist,
        contract,
        loyalty:   cl((artist.loyalty||70)+cultureBonus, 20, 100),
        mood:      cl(artist.mood||75, 20, 100),
        imageDecay:100,
        weeklyStreams: Math.floor((artist.fame||30)*6000*(prev.diff?.streamRate||1)),
        activeTraining:null,
        careerPhase: artist.careerPhase||'rise',
        weeksOnRoster:0,
        peakFame: artist.fame||30,
      };

      const feed = [
        { id:uuidv4(), text:`✍️ SIGNED: ${artist.name} joins ${prev.labelName}${artist.isReal?'':' 🤖 (AI Artist)'} — ${dealType}`, week:prev.week, type:'signing', important:true },
        ...prev.socialFeed,
      ].slice(0,MAX_FEED);

      toast(`${artist.name} signed!${artist.isReal?'':' 🤖 AI Artist — hidden potential unknown'}`, 'success');

      return {
        ...prev,
        cash: prev.cash - artist.signingBonus,
        totalExpenses: prev.totalExpenses + artist.signingBonus,
        roster: [...prev.roster, entry],
        marketArtists: prev.marketArtists.filter(a=>a.id!==artistId),
        labelCulture: cl(prev.labelCulture+1, 0, 100),
        socialFeed: feed,
      };
    });
  }, [toast]);

  // ─── DROP ─────────────────────────────────
  const dropArtist = useCallback((artistId) => {
    setGame(prev => {
      const a = prev.roster.find(x=>x.id===artistId);
      if (!a) return prev;
      const legalLevel = prev.staff?.legal||0;
      const disc = [1,0.75,0.5,0][legalLevel]||1;
      const buyout = Math.floor(a.contract.weeklyFee*8*disc);
      if (prev.cash < buyout) { toast(`Need ${fmtM(buyout)} for buyout!`,'danger'); return prev; }
      toast(`Dropped ${a.name} — buyout: ${fmtM(buyout)}`,'warn');
      return {
        ...prev,
        cash: prev.cash - buyout,
        totalExpenses: prev.totalExpenses + buyout,
        roster: prev.roster.filter(x=>x.id!==artistId),
        labelCulture: cl(prev.labelCulture-3, 0, 100),
        socialFeed: [
          { id:uuidv4(), text:`💔 ${a.name} parts ways with ${prev.labelName}.`, week:prev.week, type:'internal', important:false },
          ...prev.socialFeed,
        ].slice(0,MAX_FEED),
      };
    });
  }, [toast]);

  // ─── RELEASE ──────────────────────────────
  const releaseMusic = useCallback((artistId, releaseType, producerId, mvBudget, title, rolloutId, platformId, featuredArtistId, selectedTrackIds) => {
    setGame(prev => {
      const artist = prev.roster.find(a=>a.id===artistId);
      if (!artist) return prev;
      const prod    = PRODUCERS.find(p=>p.id===producerId);
      const rollout = ROLLOUT_STRATEGIES.find(r=>r.id===rolloutId)||ROLLOUT_STRATEGIES[1];
      const plat    = PLATFORM_STRATEGIES.find(p=>p.id===platformId);
      const totalCost = (mvBudget||0)+(prod?.cost||0)+(rollout?.cost||0)+(plat?.cost||0);
      if (prev.cash < totalCost) { toast('Insufficient funds for release!','danger'); return prev; }

      // Quality calculation — include featured artist bonus
      const mktBonus  = [0,5,12,20][prev.staff?.marketing||0]||0;
      const mvBonus   = (mvBudget||0)>500000?12:(mvBudget||0)>200000?7:0;
      // Featured artist: either NPC (from REAL_ARTISTS pool) or label roster artist
      const featRoster = featuredArtistId ? prev.roster.find(a=>a.id===featuredArtistId) : null;
      const featNPC    = featuredArtistId && !featRoster ? REAL_ARTISTS.find(a=>a.id===featuredArtistId) : null;
      const featFame   = featRoster?.fame || featNPC?.fame || 0;
      const featBonus  = featFame > 0 ? Math.floor(featFame*0.08) : 0;
      const featCollab_fee = featNPC ? Math.floor((featNPC.signingBonus||0)*0.03 + (featNPC.weeklyFee||0)*2) : 0;
      if (featCollab_fee > 0 && prev.cash < totalCost + featCollab_fee) {
        toast(`Need ${fmtM(featCollab_fee)} more for ${featNPC.name}'s collab fee!`, 'danger'); return prev;
      }
      // Album track bonus: including popular singles boosts quality
      const trackBonus = (releaseType==='album' && (selectedTrackIds||[]).length>0)
        ? Math.min(15, (selectedTrackIds||[]).length * 3)
        : 0;
      const quality = cl(
        artist.talent+(prod?prod.qualityBonus:0)+mvBonus+Math.floor(artist.creativity*0.12)+mktBonus+featBonus+trackBonus+ri(-5,5),
        10, 100
      );

      // Stream calculation with difficulty scaling
      const diff       = prev.diff || DIFFICULTY.normal;
      const trendCycle = GENRE_TREND_CYCLES[prev.currentTrendIdx||0];
      const trendMult  = trendCycle?.genre === artist.genre ? trendCycle.mult : 1.0;
      const mktMult    = [1,1.12,1.28,1.45][prev.staff?.marketing||0]||1;
      const featStreamMult = featFame > 0 ? (1 + featFame/200) : 1; // featured artist boosts streams

      // Viral check
      const viralChance = (artist.viralProbability||20)+(plat?.viralBonus||0)+(rollout?.viralBonus||0)+(featFame>80?10:0);
      const viralHit    = Math.random()*100 < viralChance;
      const viralMult   = viralHit ? ri(2,6) : 1;

      const typeMult = {single:1.0, ep:1.5, album:2.8}[releaseType]||1;
      const baseWeekly = artist.fame * 15000 * typeMult * (quality/100) * (rollout?.streamMult||1) * mktMult * trendMult * featStreamMult;
      const weeklyStreams = Math.floor(baseWeekly * viralMult * (0.85+Math.random()*0.3));

      const fameGain = Math.floor(quality/10)+(releaseType==='album'?4:1)+(viralHit?6:0)+(featFame>70?2:0);

      const featName = featRoster?.name || featNPC?.name || null;
      const release = {
        id:uuidv4(), artistId, artistName:artist.name,
        title: title||`${artist.name} — ${releaseType.toUpperCase()}`,
        type:releaseType, producerId, mvBudget, rolloutId, platformId,
        featuredArtist: featName,
        includedTracks: selectedTrackIds||[],
        quality, weeklyStreams, baseWeekly,
        totalStreams:0, revenue:0, week:prev.week, active:true,
        viralHit, hypeDecay: rollout?.hypeDecay||0.97,
        chartPosition:null, peakChart:null,
        isAI:!artist.isReal, genre:artist.genre, region:artist.region,
        trendBoost: trendMult > 1,
      };

      const feedMsg = viralHit
        ? `🔥 VIRAL: "${release.title}" is EVERYWHERE. TikTok exploding.`
        : quality>=85 ? `🎵 "${release.title}" — critics are raving. Strong debut expected.`
        : quality>=65 ? `🎵 "${release.title}" is out now. Good early numbers.`
        : `🎵 "${release.title}" dropped. Mixed early reception.`;

      toast(`"${release.title}" out!${viralHit?' 🔥 VIRAL!':''} Quality: ${quality}/100`, viralHit?'success':'success');

      return {
        ...prev,
        cash: prev.cash - totalCost,
        totalExpenses: prev.totalExpenses + totalCost,
        releases: [...prev.releases, release],
        labelFame: cl(prev.labelFame + fameGain*0.2, 0, 100),
        roster: prev.roster.map(a=>a.id===artistId
          ? {...a, fame:cl(a.fame+fameGain,0,100), mood:cl(a.mood+6,0,100), peakFame:Math.max(a.peakFame||0,a.fame+fameGain)}
          : a
        ),
        socialFeed: [{id:uuidv4(), text:feedMsg, week:prev.week, type:viralHit?'viral':'release', important:viralHit}, ...prev.socialFeed].slice(0,MAX_FEED),
      };
    });
  }, [toast]);

  // ─── TOUR ─────────────────────────────────
  const bookTour = useCallback((artistId, tier) => {
    setGame(prev => {
      if (prev.cash < tier.cost) { toast('Not enough for tour!','danger'); return prev; }
      const a = prev.roster.find(x=>x.id===artistId);
      const fameBoost = Math.max(0.5, (a?.fame||50)/100);
      const rev = Math.floor(tier.venues * tier.capacity * tier.ticketPrice * 0.82 * fameBoost);
      const dur = Math.ceil(tier.venues/3);
      const tour = { id:uuidv4(), artistId, artistName:a?.name||'?', tier:tier.name,
        weeksRemaining:dur, weeklyRevenue:Math.floor(rev/dur), totalRevenue:rev, cost:tier.cost };
      toast(`${a?.name} tour booked! Est. ${fmtM(rev)}`, 'success');
      return {
        ...prev,
        cash: prev.cash - tier.cost,
        totalExpenses: prev.totalExpenses + tier.cost,
        activeTours: [...prev.activeTours, tour],
        allTimeTours: (prev.allTimeTours||0)+1,
      };
    });
  }, [toast]);

  // ─── MERCH ────────────────────────────────
  const launchMerch = useCallback((artistId, line) => {
    setGame(prev => {
      if (prev.cash < line.cost) { toast('Insufficient funds!','danger'); return prev; }
      const a = prev.roster.find(x=>x.id===artistId);
      const merch = { id:uuidv4(), artistId, artistName:a?.name||'?', line:line.name, weeklyRevenue:line.weeklyRevenue, cost:line.cost, week:prev.week };
      toast(`${line.name} launched for ${a?.name}!`, 'success');
      return { ...prev, cash:prev.cash-line.cost, totalExpenses:prev.totalExpenses+line.cost, activeMerch:[...prev.activeMerch,merch] };
    });
  }, [toast]);

  // ─── SYNC DEAL ────────────────────────────
  const acceptSyncDeal = useCallback((artistId, deal) => {
    setGame(prev => {
      const a = prev.roster.find(x=>x.id===artistId);
      if (!a) return prev;
      const entry = {...deal, artistId, artistName:a.name, week:prev.week};
      toast(`Sync deal accepted! +${fmtM(deal.fee)}`, 'success');
      return {
        ...prev,
        cash: prev.cash + deal.fee,
        totalRevenue: prev.totalRevenue + deal.fee,
        syncDeals: [...prev.syncDeals, entry],
        roster: prev.roster.map(x=>x.id===artistId?{...x,fame:cl(x.fame+deal.fameBonus,0,100)}:x),
        imageHealth: cl((prev.imageHealth||100)+2, 0, 100),
        socialFeed: [{id:uuidv4(), text:`📺 SYNC: ${a.name}'s music lands in ${deal.platform}! ${fmtM(deal.fee)} secured.`, week:prev.week, type:'deal', important:true}, ...prev.socialFeed].slice(0,MAX_FEED),
      };
    });
  }, [toast]);

  // ─── STAFF ────────────────────────────────
  const hireStaff = useCallback((roleId) => {
    setGame(prev => {
      const role = STAFF_ROLES.find(r=>r.id===roleId);
      if (!role) return prev;
      const cur  = prev.staff?.[roleId]||0;
      if (cur >= role.levels.length) { toast('Already maxed!','warn'); return prev; }
      const next = role.levels[cur];
      const cost = next.weeklyCost * 4;
      if (prev.cash < cost) { toast('Insufficient funds!','danger'); return prev; }
      toast(`${next.name} hired!`, 'success');
      return { ...prev, cash:prev.cash-cost, staff:{...prev.staff,[roleId]:cur+1} };
    });
  }, [toast]);

  // ─── TRAINING ─────────────────────────────
  const startTraining = useCallback((artistId, prog) => {
    setGame(prev => {
      if (prev.cash < prog.cost) { toast('Insufficient funds!','danger'); return prev; }
      const a = prev.roster.find(x=>x.id===artistId);
      const session = { id:uuidv4(), artistId, programId:prog.id, stat:prog.stat, gain:prog.gain, weeksLeft:prog.durationWeeks, name:prog.name };
      toast(`${a?.name} enrolled in ${prog.name}`, 'info');
      return { ...prev, cash:prev.cash-prog.cost, training:[...(prev.training||[]),session] };
    });
  }, [toast]);

  // ─── LOAN ─────────────────────────────────
  const takeLoan = useCallback((opt) => {
    setGame(prev => {
      if ((prev.activeLoans||[]).find(l=>l.id===opt.id&&!l.paid)) { toast('Already have this!','warn'); return prev; }
      const loan = {...opt, takenWeek:prev.week, weeksLeft:opt.durationWeeks||0, paid:false, missedPayments:0};
      toast(`+${fmtM(opt.amount)} secured!`, 'success');
      return {
        ...prev,
        cash: prev.cash+opt.amount,
        equityGiven: prev.equityGiven+(opt.equityStake||0),
        activeLoans: [...(prev.activeLoans||[]), loan],
        socialFeed: [{id:uuidv4(), text:`💰 ${prev.labelName} secures ${fmtM(opt.amount)} in new capital.`, week:prev.week, type:'deal', important:false}, ...prev.socialFeed].slice(0,MAX_FEED),
      };
    });
  }, [toast]);

  // ─── DRAMA RESOLUTION ─────────────────────
  const resolveDrama = useCallback((event, choiceIdx, artistId) => {
    setGame(prev => {
      const choice = event.choices?.[choiceIdx];
      if (!choice) return prev;
      const rawCost = choice.cost||0;
      const cashChange = rawCost < 0 ? Math.abs(rawCost) : -rawCost; // negative cost = income
      if (-cashChange > prev.cash) { toast('Cannot afford this!','danger'); return prev; }

      const prLevel  = prev.staff?.pr||0;
      const dmgMult  = [1, 0.65, 0.35, 0][prLevel]||1;
      const fameDelta = choice.fameDelta||0;
      const adjustedFame = fameDelta < 0 ? Math.ceil(fameDelta*dmgMult) : fameDelta;
      const adjustedStream = choice.streamBoost||0;

      let roster   = [...prev.roster];
      let releases = [...prev.releases];

      if (choice.dropsArtist) {
        roster = roster.filter(a=>a.id!==artistId);
        toast('Artist dropped.','warn');
      } else {
        roster = roster.map(a => {
          if (a.id!==artistId) return a;
          let updated = {
            ...a,
            mood:    cl(a.mood+(choice.moodDelta||0), 0, 100),
            fame:    cl(a.fame+adjustedFame, 0, 100),
            loyalty: cl(a.loyalty+(choice.loyaltyDelta||0), 0, 100),
          };
          if (choice.burnoutRiskDelta) updated = {...updated, burnoutRisk:cl((a.burnoutRisk||20)+choice.burnoutRiskDelta,0,100)};
          if (choice.renegotiate) updated = {...updated, contract:{...a.contract, weeklyFee:Math.floor(a.contract.weeklyFee*(choice.renegotiateMultiplier||1))}};
          return updated;
        });
        // Boost streams for this artist's active releases
        if (adjustedStream !== 0) {
          releases = releases.map(r => {
            if (r.artistId!==artistId||!r.active) return r;
            return {...r, weeklyStreams:Math.max(0, Math.floor(r.weeklyStreams*(1+adjustedStream/100)))};
          });
        }
      }

      const isCrisis = event.type==='scandal'||event.type==='crisis';
      const imgHit   = isCrisis ? Math.ceil(-ri(5,14)*dmgMult) : 0;
      const imgGain  = event.type==='award'||event.type==='collab' ? ri(1,4) : 0;

      toast(`${choice.label} — handled.`, isCrisis?'warn':'success');

      return {
        ...prev,
        cash: prev.cash+cashChange,
        totalRevenue: rawCost<0 ? prev.totalRevenue+Math.abs(rawCost) : prev.totalRevenue,
        totalExpenses: rawCost>0 ? prev.totalExpenses+rawCost : prev.totalExpenses,
        roster, releases,
        imageHealth: cl((prev.imageHealth||100)+imgHit+imgGain, 0, 100),
        pendingEvent:null,
      };
    });
    setPendingEvent(null);
  }, [toast]);

  // ─── ADVANCE WEEK ─────────────────────────
  const advanceWeek = useCallback(() => {
    if (pendingEvent) { toast('Resolve the active event first!','warn'); return; }

    setGame(prev => {
      if (!prev) return prev;
      const diff = prev.diff||DIFFICULTY.normal;
      let cash = prev.cash;
      let totalRevenue = prev.totalRevenue;
      let totalExpenses = prev.totalExpenses;
      let roster = [...prev.roster];
      let releases = [...prev.releases];
      let activeTours = [...prev.activeTours];
      let training = [...(prev.training||[])];
      let imageHealth = prev.imageHealth??100;
      let labelFame = prev.labelFame;
      let labelCulture = prev.labelCulture??50;
      const newFeed = [];

      // ── 1. GENRE TREND TICK ───────────────
      let trendIdx = prev.currentTrendIdx||0;
      let trendLeft = prev.trendWeeksLeft||0;
      if (trendLeft <= 0) {
        trendIdx = (trendIdx+ri(1,3)) % GENRE_TREND_CYCLES.length;
        trendLeft = ri(5,9);
        newFeed.push({ id:uuidv4(), text:`📈 TREND SHIFT: ${GENRE_TREND_CYCLES[trendIdx].description}`, week:prev.week+1, type:'trend', important:true });
      }

      // ── 2. ARTIST FEES ────────────────────
      let artistFees = 0;
      roster = roster.map(a => {
        artistFees += a.contract.weeklyFee;
        return {...a, contract:{...a.contract, weeksRemaining:a.contract.weeksRemaining-1}, weeksOnRoster:(a.weeksOnRoster||0)+1};
      });
      cash -= artistFees;
      totalExpenses += artistFees;

      // ── 3. STAFF COSTS ────────────────────
      let staffCosts = 0;
      for (const [rid, lv] of Object.entries(prev.staff||{})) {
        const role = STAFF_ROLES.find(r=>r.id===rid);
        if (role && lv>0) staffCosts += role.levels[lv-1].weeklyCost;
      }
      cash -= staffCosts;
      totalExpenses += staffCosts;

      // ── 4. LOAN PAYMENTS ─────────────────
      let loanPayments = 0;
      const activeLoans = (prev.activeLoans||[]).map(loan => {
        if (loan.type==='equity'||loan.paid||loan.weeksLeft<=0) return loan;
        if (cash >= loan.weeklyPayment) {
          loanPayments += loan.weeklyPayment;
          cash -= loan.weeklyPayment;
          totalExpenses += loan.weeklyPayment;
          const left = loan.weeksLeft-1;
          return {...loan, weeksLeft:left, paid:left<=0, missedPayments:loan.missedPayments||0};
        } else {
          // MISSED PAYMENT CONSEQUENCES
          const missed = (loan.missedPayments||0)+1;
          newFeed.push({ id:uuidv4(), text:`⚠️ MISSED LOAN PAYMENT — ${loan.name}. Penalty accumulating.`, week:prev.week+1, type:'warning', important:true });
          imageHealth = cl(imageHealth-5, 0, 100);
          if (missed>=3 && loan.id==='shark' && roster.length>0) {
            const victim = rf(roster);
            roster = roster.filter(a=>a.id!==victim.id);
            newFeed.push({ id:uuidv4(), text:`🚨 PRIVATE MONEY COLLECTORS: ${victim.name} taken as collateral for missed payments.`, week:prev.week+1, type:'crisis', important:true });
          }
          return {...loan, missedPayments:missed, interestRate:Math.min(0.5,(loan.interestRate||0.1)*1.1)};
        }
      });

      // ── 5. EQUITY DRAIN ──────────────────
      const weeklyProfit = Math.max(0, totalRevenue - prev.totalRevenue);
      const equityDrain = Math.floor(weeklyProfit * (prev.equityGiven||0) * 0.5);
      cash -= equityDrain;

      // ── 6. STREAMING REVENUE ─────────────
      const mktMult = [1,1.12,1.28,1.45][prev.staff?.marketing||0]||1;
      const trendGenre = GENRE_TREND_CYCLES[trendIdx]?.genre;
      let streamRevenue = 0;

      releases = releases.map(r => {
        if (!r.active) return r;
        const age = prev.week - r.week;
        const decay = Math.pow(r.hypeDecay||0.97, age);
        const tBonus = r.genre===trendGenre ? (GENRE_TREND_CYCLES[trendIdx]?.mult||1) : 1;
        const noise = 0.86+Math.random()*0.28;
        const ws = Math.floor(r.weeklyStreams * decay * tBonus * mktMult * noise * diff.streamRate/BASE_STREAM);
        const rev = ws * (diff.streamRate||BASE_STREAM);
        streamRevenue += rev;
        const stillActive = ws > 3000 || age < 6;
        return {...r, weeklyStreams:Math.max(0,ws), totalStreams:(r.totalStreams||0)+ws, revenue:(r.revenue||0)+rev, active:stillActive};
      });
      cash += streamRevenue;
      totalRevenue += streamRevenue;

      // ── 7. TOUR REVENUE ──────────────────
      let tourRevenue = 0;
      activeTours = activeTours.map(t => {
        if (t.weeksRemaining<=0) return t;
        tourRevenue += t.weeklyRevenue;
        return {...t, weeksRemaining:t.weeksRemaining-1};
      }).filter(t=>t.weeksRemaining>0);
      cash += tourRevenue;
      totalRevenue += tourRevenue;

      // ── 8. MERCH REVENUE ─────────────────
      let merchRevenue = 0;
      (prev.activeMerch||[]).forEach(m => { merchRevenue += m.weeklyRevenue; });
      cash += merchRevenue;
      totalRevenue += merchRevenue;

      // ── 9. TRAINING TICK ─────────────────
      training = training.map(t => {
        const left = t.weeksLeft-1;
        if (left<=0) {
          roster = roster.map(a => {
            if (a.id!==t.artistId) return a;
            const cur = a[t.stat]??0;
            const nv  = t.stat==='burnoutRisk' ? cl(cur+t.gain,0,100) : cl(cur+t.gain,0,100);
            newFeed.push({id:uuidv4(), text:`✅ ${a.name} completes ${t.name} — ${t.stat} improved!`, week:prev.week+1, type:'milestone', important:false});
            return {...a, [t.stat]:nv};
          });
          return {...t, weeksLeft:0, done:true};
        }
        return {...t, weeksLeft:left};
      }).filter(t=>!t.done);

      // ── 10. ARTIST LIFECYCLE ──────────────
      roster = roster.map(a => {
        let {fame,mood,loyalty,careerPhase,burnoutRisk} = a;
        // Natural mood drift
        mood = cl(mood+(75-mood)*0.04, 20, 100);
        // Fame decay without releases
        const hasActive = releases.some(r=>r.artistId===a.id&&r.active&&r.weeklyStreams>50000);
        if (!hasActive) fame = cl(fame-0.08, 0, 100);
        // Burnout check
        if ((burnoutRisk||0)>65 && Math.random()<0.06) {
          newFeed.push({id:uuidv4(), text:`😮‍💨 ${a.name} is showing serious burnout signs. Intervene now.`, week:prev.week+1, type:'warning', important:true});
          mood = cl(mood-14, 20, 100);
        }
        // Loyalty decay if mood low
        if (mood < 40) loyalty = cl(loyalty-1, 10, 100);
        // Phase transitions
        if (fame>=80&&careerPhase==='rise') careerPhase='peak';
        if (fame<55&&careerPhase==='peak'&&Math.random()<0.02) {
          careerPhase='decline';
          newFeed.push({id:uuidv4(), text:`📉 ${a.name} is entering career decline. A rebrand or collab push may help.`, week:prev.week+1, type:'warning', important:true});
        }
        if (careerPhase==='decline'&&Math.random()<0.025) {
          careerPhase='comeback';
          newFeed.push({id:uuidv4(), text:`🦋 ${a.name} is staging a comeback — momentum building in the streets.`, week:prev.week+1, type:'milestone', important:true});
        }
        // Loyalty flight risk
        if (loyalty<25 && Math.random()<0.04) {
          newFeed.push({id:uuidv4(), text:`🚨 ${a.name}'s loyalty is critical — risk of them leaving when contract expires.`, week:prev.week+1, type:'warning', important:true});
        }
        return {...a, fame:cl(fame,0,100), mood:cl(mood,0,100), loyalty:cl(loyalty,0,100), careerPhase};
      });

      // ── 11. CONTRACT EXPIRY ───────────────
      roster.forEach(a => {
        if (a.contract.weeksRemaining===4) newFeed.push({id:uuidv4(), text:`⚠️ ${a.name}'s contract expires in 4 weeks.`, week:prev.week+1, type:'warning', important:true});
        if (a.contract.weeksRemaining===0) newFeed.push({id:uuidv4(), text:`📋 ${a.name}'s contract expired — now a free agent.`, week:prev.week+1, type:'warning', important:true});
      });
      roster = roster.filter(a=>a.contract.weeksRemaining>0);

      // ── 12. RIVAL COMPETITION ─────────────
      const rivalChance = 0.15 * diff.rivalStrength;
      if (Math.random() < rivalChance) {
        const rival = rf(prev.rivals);
        const availableToSteal = REAL_ARTISTS.filter(a=>!roster.find(r=>r.id===a.id));
        if (availableToSteal.length > 0) {
          const target = rf(availableToSteal.slice(0,10));
          newFeed.push({id:uuidv4(), text:`👀 ${rival.name} signs ${target.name} — that was someone you were watching.`, week:prev.week+1, type:'rival', important:false});
        }
      }

      // ── 13. IMAGE HEALTH ─────────────────
      const avgControversy = roster.length ? roster.reduce((s,a)=>s+(a.controversyLevel||0),0)/roster.length : 0;
      if (Math.random()*100 < avgControversy*0.08) imageHealth = cl(imageHealth-ri(1,6), 0, 100);
      imageHealth = cl(imageHealth+0.4, 0, 100); // slow natural recovery

      // ── 14. CHARTS UPDATE ────────────────
      const prevCharts = prev.charts||[];
      let charts = CHART_SONGS.filter(s=>!s.isAlbum).slice(0,50).map((s,i) => ({
        ...s, streams:Math.floor(s.streams*(0.88+Math.random()*0.24)),
        rank:i+1, isYours:false, isAI:false,
        weeksOnChart:Math.min((s.weeksOnChart||1)+1, 52),
        peakRank: s.peakRank||i+1, prevRank:i+1, movement:0,
      }));

      // Insert your releases
      const yourActive = releases.filter(r=>r.active&&r.weeklyStreams>80000);
      yourActive.forEach(r => {
        const prev_entry = prevCharts.find(c=>c.title===r.title);
        charts.push({
          title:r.title, artist:r.artistName, streams:r.weeklyStreams,
          rank:999, isYours:true, isAI:r.isAI||false, genre:r.genre,
          weeksOnChart: prev_entry ? (prev_entry.weeksOnChart||0)+1 : 1,
          peakRank:999, prevRank:prev_entry?.rank||51, movement:0,
        });
      });

      charts = charts.sort((a,b)=>b.streams-a.streams).slice(0,50);
      charts = charts.map((s,i) => {
        const rank = i+1;
        const prevEntry = prevCharts.find(c=>c.title===s.title);
        const prevRank  = prevEntry?.rank||51;
        const movement  = prevRank - rank; // positive = moved up
        return {
          ...s, rank,
          prevRank,
          movement,
          peakRank: Math.min(s.peakRank||rank, rank),
          weeksOnChart: s.weeksOnChart||1,
        };
      });

      // Album charts
      const albumCharts = (CHART_SONGS.filter(s=>s.isAlbum)).map((s,i)=>({...s,rank:i+1,isYours:false,weeksOnChart:ri(1,30),peakRank:i+1}));

      // Chart records
      const yourCharts = charts.filter(c=>c.isYours);
      const bestRank   = yourCharts.length ? Math.min(...yourCharts.map(c=>c.rank)) : 999;
      const biggestJump = yourCharts.reduce((mx,c)=>Math.max(mx,c.movement||0), 0);
      const mostWeeks   = yourCharts.reduce((mx,c)=>Math.max(mx,c.weeksOnChart||0), 0);
      const num1Weeks   = yourCharts.filter(c=>c.rank===1).reduce((s,c)=>s+(c.weeksOnChart||0),0);
      const chartRecords = {
        longestNum1: Math.max(prev.chartRecords?.longestNum1||0, num1Weeks),
        biggestJump: Math.max(prev.chartRecords?.biggestJump||0, biggestJump),
        mostWeeks:   Math.max(prev.chartRecords?.mostWeeks||0, mostWeeks),
      };

      // Rival beaten?
      let rivalBeaten = prev.rivalBeaten||0;
      // Check if any of our releases beats a rival's chart entry (simplified)

      // ── 15. NEAR-MISS ENGINE ──────────────
      if (bestRank === 2) {
        newFeed.push({id:uuidv4(), text:`📊 SO CLOSE — ${yourCharts.find(c=>c.rank===2)?.title||'your track'} peaked at #2. ${fmtM((charts[0]?.streams||0)-(yourCharts.find(c=>c.rank===2)?.streams||0))} streams away from #1.`, week:prev.week+1, type:'nearMiss', important:true});
      }
      if (bestRank>=3&&bestRank<=5&&Math.random()<0.4) {
        const nm = rf(NEAR_MISS_EVENTS.filter(e=>e.type==='chart'));
        newFeed.push({id:uuidv4(), text:nm.msg(yourCharts[0]?.title||'your track', bestRank), week:prev.week+1, type:'nearMiss', important:false});
      }

      // ── 16. AWARD SHOWS ──────────────────
      const nextMonth = (prev.month + (prev.week%4===3?1:0)-1)%12+1;
      AWARD_SHOWS.forEach(show => {
        if (show.months.includes(nextMonth)) {
          const eligible = roster.filter(a=>a.fame>=show.minFame);
          if (eligible.length>0) {
            const nominee = rf(eligible);
            const wins = Math.random()<(nominee.fame/220);
            newFeed.push({id:uuidv4(),
              text: wins
                ? `🏆 ${nominee.name} WINS at the ${show.name}! Historic night for ${prev.labelName}.`
                : `📢 ${nominee.name} nominated at the ${show.name}!`,
              week:prev.week+1, type:'award', important:true });
            if (wins) {
              roster = roster.map(a=>a.id===nominee.id?{...a,fame:cl(a.fame+8,0,100)}:a);
              labelFame = cl(labelFame+5, 0, 100);
              labelCulture = cl(labelCulture+3, 0, 100);
            }
          }
        }
      });

      // ── 17. PASSIVE NEWS ─────────────────
      if (Math.random()<0.45&&roster.length>0) {
        const a = rf(roster);
        const n = rf(NEWS_EVENTS);
        newFeed.push({id:uuidv4(), text:n.text.replace('[ARTIST]',a.name), week:prev.week+1, type:n.type, important:n.fameBoost>6});
        if (n.fameBoost) roster = roster.map(x=>x.id===a.id?{...x,fame:cl(x.fame+n.fameBoost*0.25,0,100)}:x);
        if (n.streamBoost) releases = releases.map(r=>r.artistId===a.id&&r.active?{...r,weeklyStreams:Math.floor(r.weeklyStreams*(1+n.streamBoost/100))}:r);
      }

      // ── 18. DRAMA EVENT ──────────────────
      let newPendingEvent = null;
      const prLv = prev.staff?.pr||0;
      const eChance = roster.length>0 ? (diff.eventFreq||0.3)-prLv*0.05 : 0;

      if (Math.random()<eChance) {
        const a = rf(roster);
        const isHighDrama = a.controversyLevel>60||a.ego>80;
        const pool = DRAMA_EVENTS.filter(e => {
          if (e.id==='burnout') return (a.burnoutRisk||0)>45;
          if (e.id==='demand_raise') return a.contract.weeksRemaining<20&&a.loyalty>60;
          if (e.type==='internal') return a.loyalty<65;
          if (e.type==='crisis') return isHighDrama&&Math.random()<0.3;
          return true;
        });
        if (pool.length>0) {
          const evt = {...rf(pool), artistId:a.id, artistName:a.name};
          newPendingEvent = evt;
        }
      }

      // ── 19. MARKET REFRESH ───────────────
      let marketArtists = prev.marketArtists;
      if (prev.week%4===0) {
        marketArtists = buildMarket(roster.map(a=>a.id), prev.week, prev.staff?.anr||0);
      }

      // ── 20. WEEK / MONTH / YEAR ───────────
      let week  = prev.week+1;
      let month = prev.month;
      let year  = prev.year;
      if (week%4===1) month++;
      if (month>12)  { month=1; year++; }

      // ── 21. LABEL STATS ──────────────────
      const netIncome = streamRevenue+tourRevenue+merchRevenue-artistFees-staffCosts-loanPayments;
      labelFame     = cl(labelFame+(netIncome>0?0.08:-0.04), 0, 100);
      labelCulture  = cl(labelCulture, 0, 100);

      // ── 22. WEEKLY SUMMARY DATA ──────────
      const weeklyReport = {
        week:prev.week,
        streamRevenue:Math.floor(streamRevenue),
        tourRevenue:Math.floor(tourRevenue),
        merchRevenue:Math.floor(merchRevenue),
        artistFees:Math.floor(artistFees),
        staffCosts:Math.floor(staffCosts),
        loanPayments:Math.floor(loanPayments),
        equityDrain:Math.floor(equityDrain),
        netIncome:Math.floor(netIncome),
        cashBalance:Math.floor(cash),
        topRelease: yourCharts.length ? yourCharts.find(c=>c.rank===Math.min(...yourCharts.map(x=>x.rank))) : null,
        bestChartPos: bestRank,
        trendGenre: GENRE_TREND_CYCLES[trendIdx]?.genre,
      };

      // ── 23. OBJECTIVES CHECK ─────────────
      const nextState = {
        ...prev, cash:Math.floor(cash), totalRevenue:Math.floor(totalRevenue),
        totalExpenses:Math.floor(totalExpenses), labelFame, imageHealth, labelCulture,
        week, month, year, roster, releases, activeTours, activeMerch:prev.activeMerch,
        activeLoans, training, charts, albumCharts, chartRecords,
        currentTrendIdx:trendIdx, trendWeeksLeft:trendLeft-1,
        marketArtists, weeklyReport, rivals:prev.rivals, rivalBeaten,
        diff:prev.diff,
      };

      const earned = checkObjectives(nextState, prev.objectives||[]);
      let bonusCash = 0;
      const objFeed = earned.map(obj => {
        bonusCash += obj.reward;
        return {id:uuidv4(), text:`🎯 OBJECTIVE COMPLETE: "${obj.title}" — +${fmtM(obj.reward)} bonus!`, week, type:'milestone', important:true};
      });

      const combinedFeed = [...newFeed,...objFeed,...prev.socialFeed].slice(0,MAX_FEED);

      const finalState = {
        ...nextState,
        cash: Math.floor(cash+bonusCash),
        totalRevenue: Math.floor(totalRevenue+bonusCash),
        objectives: [...(prev.objectives||[]),...earned.map(o=>o.id)],
        socialFeed: combinedFeed,
        weeklyReport,
      };

      if (newPendingEvent) setTimeout(()=>setPendingEvent(newPendingEvent), 150);
      // Trigger weekly summary
      setTimeout(()=>setWeekSummary(weeklyReport), 200);

      return finalState;
    });
  }, [pendingEvent, toast]);

  // ─── MANUAL SAVE ─────────────────────────
  const manualSave = useCallback(() => {
    setGame(prev => {
      if (!prev||!careerId) return prev;
      saveCareer({id:careerId, name:prev.labelName, state:prev, savedAt:Date.now()});
      toast('Game saved!','success',2000);
      return prev;
    });
  }, [careerId, saveCareer, toast]);

  const dismissSummary = useCallback(() => setWeekSummary(null), []);

  const getLabelTier = () => {
    if (!game) return LABEL_TIERS[0];
    return LABEL_TIERS.find(t=>t.idx===getTierIdx(game.totalRevenue))||LABEL_TIERS[0];
  };

  return {
    game, loading, toasts, pendingEvent, weekSummary,
    initGame, manualSave,
    signArtist, dropArtist, releaseMusic,
    bookTour, launchMerch, acceptSyncDeal,
    hireStaff, startTraining, takeLoan,
    resolveDrama, advanceWeek, dismissSummary,
    getLabelTier, fmtM,
  };
}
