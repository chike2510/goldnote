import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  REAL_ARTISTS, CHART_SONGS, DRAMA_EVENTS, NEWS_EVENTS,
  LABEL_TIERS, RIVAL_LABELS, WEEKLY_OBJECTIVES, ACHIEVEMENTS,
  AWARD_SHOWS, PRODUCERS, ROLLOUT_STRATEGIES, PLATFORM_STRATEGIES,
  generateAIArtist, STAFF_ROLES,
} from '../data/gameData';
import { useAuth } from './useAuth';

const AUTOSAVE_INTERVAL = 60000;
const STREAM_RATE = 0.0038; // $ per stream
const MAX_FEED = 80;
const MARKET_SIZE = 10;
const AI_MARKET_SHARE = 0.4; // 40% of market slots are AI artists

// ─── UTILITIES ─────────────────────────────────
function rI(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rF(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

function fmtM(n) {
  if (n === undefined || n === null) return '$0';
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}

function getLabelTierIdx(totalRevenue) {
  let idx = 0;
  for (const t of LABEL_TIERS) { if (totalRevenue >= t.minRevenue) idx = t.idx; }
  return idx;
}

function buildMarket(roster, week) {
  const signedIds = new Set(roster.map(a => a.id));
  const unsigned = REAL_ARTISTS.filter(a => !a.label && !signedIds.has(a.id));
  const shuffled = [...unsigned].sort(() => Math.random() - 0.5);

  const aiCount = Math.floor(MARKET_SIZE * AI_MARKET_SHARE);
  const realCount = MARKET_SIZE - aiCount;

  const realSlots = shuffled.slice(0, realCount);
  const aiSlots = Array.from({ length: aiCount }, () => generateAIArtist(week));

  return [...realSlots, ...aiSlots].sort(() => Math.random() - 0.5);
}

function checkObjectives(game, completed) {
  const checks = {
    rosterSize:    game.roster.length,
    releaseCount:  game.releases.length,
    chartPosition: Math.min(...(game.charts.filter(c => c.isYours).map(c => c.rank).concat([999]))),
    cash:          game.cash,
    totalRevenue:  game.totalRevenue,
    syncDeals:     game.syncDeals.length,
    tourCount:     game.activeTours.length + (game.allTimeTours || 0),
    chartNumber1:  game.charts.some(c => c.isYours && c.rank === 1) ? 1 : 0,
    totalStreams:  (game.releases || []).reduce((s, r) => s + (r.totalStreams || 0), 0),
    labelTierIdx:  getLabelTierIdx(game.totalRevenue),
    aiRosterCount: game.roster.filter(a => !a.isReal).length,
    aiChartPos:    Math.min(...(game.charts.filter(c => c.isYours && c.isAI).map(c => c.rank).concat([999]))),
  };

  const earned = [];
  for (const obj of WEEKLY_OBJECTIVES) {
    if (completed.includes(obj.id)) continue;
    let met = false;
    const v = checks[obj.metric];
    if (obj.metric === 'chartPosition' || obj.metric === 'aiChartPos') {
      met = v <= obj.target;
    } else {
      met = v >= obj.target;
    }
    if (met) earned.push(obj);
  }
  return earned;
}

// ─── MAIN HOOK ─────────────────────────────────
export function useGameState(careerId) {
  const { saveCareer, getCareers } = useAuth();
  const [game, setGame]   = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingEvent, setPendingEvent] = useState(null); // drama event waiting for choice
  const autoRef = useRef(null);
  const gameRef = useRef(null);

  // Keep ref in sync for autosave
  useEffect(() => { gameRef.current = game; }, [game]);

  // Load career
  useEffect(() => {
    if (!careerId) { setLoading(false); return; }
    const career = getCareers().find(c => c.id === careerId);
    if (career?.state) setGame(career.state);
    setLoading(false);
  }, [careerId]);

  // Auto-save
  useEffect(() => {
    if (!game || !careerId) return;
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      const g = gameRef.current;
      if (g) saveCareer({ id: careerId, name: g.labelName, state: g, savedAt: Date.now() });
    }, AUTOSAVE_INTERVAL);
    return () => clearInterval(autoRef.current);
  }, [careerId, game?.labelName]);

  const toast = useCallback((msg, type = 'info', dur = 4000) => {
    const id = uuidv4();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), dur);
  }, []);

  // ─── INIT ─────────────────────────────────────
  const initGame = useCallback((labelName, ownerName) => {
    const market = buildMarket([], 1);
    const state = {
      id: careerId,
      labelName, ownerName,
      week: 1, month: 1, year: 2025,
      cash: 5000000,
      totalRevenue: 0,
      totalExpenses: 0,
      equityGiven: 0,       // % given to investors
      activeLoans: [],
      labelFame: 10,
      imageHealth: 100,     // label-wide image (affects sync deals)
      roster: [],
      releases: [],
      activeTours: [],
      activeMerch: [],
      syncDeals: [],
      staff: {},            // { anr: level, pr: level, marketing: level, legal: level }
      training: [],         // active training sessions
      objectives: [],       // completed objective ids
      achievements: [],
      milestones: [],        // history log
      allTimeTours: 0,
      allTimeStreams: 0,
      chartHistory: [],     // { week, rank, title }
      weeklyReport: null,
      pendingEvent: null,
      socialFeed: [
        { id: uuidv4(), text: `${labelName} opens its doors — the music industry will never be the same.`, week: 1, type: 'milestone' },
        { id: uuidv4(), text: 'Industry analysts predict a breakthrough year for independent labels.', week: 1, type: 'news' },
      ],
      charts: CHART_SONGS.slice(0, 30).map((s, i) => ({ ...s, rank: i + 1, isYours: false, isAI: false, weeksOnChart: 1, peakRank: i + 1 })),
      marketArtists: market,
      rivals: RIVAL_LABELS,
    };
    setGame(state);
    return state;
  }, [careerId]);

  // ─── SIGN ARTIST ─────────────────────────────
  const signArtist = useCallback((artistId, dealType, royaltySplit, contractLength) => {
    setGame(prev => {
      const artist = prev.marketArtists.find(a => a.id === artistId)
                  || REAL_ARTISTS.find(a => a.id === artistId);
      if (!artist) return prev;
      if (prev.cash < artist.signingBonus) {
        toast('Insufficient funds for signing bonus!', 'danger'); return prev;
      }
      const contract = { dealType, royaltySplit, contractLength, weeksRemaining: contractLength, signingBonus: artist.signingBonus, weeklyFee: artist.weeklyFee, signedWeek: prev.week };
      const entry = {
        ...artist,
        contract,
        loyalty:       clamp((artist.loyalty || 70), 20, 100),
        mood:          clamp((artist.mood || 75), 20, 100),
        imageDecay:    artist.imageDecay ?? 100,
        weeklyStreams:  Math.floor((artist.fame || 30) * 8000),
        activeTraining: null,
        careerPhase:   artist.careerPhase || 'rise',
      };
      const newFeed = [
        { id: uuidv4(), text: `SIGNED: ${artist.name} joins ${prev.labelName} on a ${dealType}!${artist.isReal ? '' : ' [AI Artist — hidden potential unknown]'}`, week: prev.week, type: 'signing' },
        ...prev.socialFeed,
      ].slice(0, MAX_FEED);
      toast(`${artist.name} signed! ${artist.isReal ? '' : '🤖 AI Artist'}`, 'success');
      return {
        ...prev,
        cash: prev.cash - artist.signingBonus,
        roster: [...prev.roster, entry],
        marketArtists: prev.marketArtists.filter(a => a.id !== artistId),
      };
    });
  }, [toast]);

  // ─── DROP ARTIST ─────────────────────────────
  const dropArtist = useCallback((artistId) => {
    setGame(prev => {
      const artist = prev.roster.find(a => a.id === artistId);
      if (!artist) return prev;
      const legalLevel = prev.staff?.legal || 0;
      const discount = [1, 0.8, 0.6, 0.0][legalLevel] ?? 1;
      const buyout = Math.floor(artist.contract.weeklyFee * 8 * discount);
      if (prev.cash < buyout) { toast('Not enough cash for buyout!', 'danger'); return prev; }
      toast(`Dropped ${artist.name} (buyout: ${fmtM(buyout)})`, 'warn');
      return {
        ...prev,
        cash: prev.cash - buyout,
        roster: prev.roster.filter(a => a.id !== artistId),
        socialFeed: [
          { id: uuidv4(), text: `${artist.name} has parted ways with ${prev.labelName}.`, week: prev.week, type: 'release' },
          ...prev.socialFeed,
        ].slice(0, MAX_FEED),
      };
    });
  }, [toast]);

  // ─── RELEASE MUSIC ────────────────────────────
  const releaseMusic = useCallback((artistId, releaseType, producerId, mvBudget, title, rolloutId, platformId) => {
    setGame(prev => {
      const artist = prev.roster.find(a => a.id === artistId);
      if (!artist) return prev;

      // Find producer cost
      let producerCost = 0;
      if (producerId) {
        const prod = PRODUCERS.find(p => p.id === producerId);
        producerCost = prod ? prod.cost : 100000;
      }
      const totalCost = mvBudget + producerCost;
      if (prev.cash < totalCost) { toast('Insufficient funds for release!', 'danger'); return prev; }

      // Quality calc
      const mktLevel = prev.staff?.marketing || 0;
      const mktBonus = [0, 5, 12, 20][mktLevel] ?? 0;
      let quality = clamp(
        artist.talent
        + (producerId ? 15 : 0)
        + (mvBudget > 500000 ? 12 : mvBudget > 200000 ? 7 : 0)
        + Math.floor(artist.creativity * 0.15)
        + mktBonus
        + rI(-6, 6),
        10, 100
      );

      // Rollout strategy
      const rollout = ROLLOUT_STRATEGIES.find(r => r.id === rolloutId) || ROLLOUT_STRATEGIES[1];
      const platform = PLATFORM_STRATEGIES.find(p => p.id === platformId);
      const extraCost = rollout.cost + (platform?.cost || 0);
      if (prev.cash < totalCost + extraCost) { toast('Not enough for rollout costs!', 'danger'); return prev; }

      const hypeMultiplier = { single: 1.0, ep: 1.5, album: 2.5 }[releaseType] || 1;
      const viralRoll = Math.random() * 100 < (artist.viralProbability || 30) + (platform?.viralBonus || 0) + rollout.viralBonus;
      const viralMult = viralRoll ? rI(2, 5) : 1;

      const baseStreams = artist.fame * 20000 * hypeMultiplier * (quality / 100) * rollout.streamMultiplier;
      const weeklyStreams = Math.floor(baseStreams * viralMult * (platform ? (1 + platform.streamBonus / 100) : 1) * (0.85 + Math.random() * 0.3));

      const fameGain = Math.floor(quality / 10) + (releaseType === 'album' ? 3 : 1) + (viralRoll ? 5 : 0);

      const release = {
        id: uuidv4(),
        artistId, artistName: artist.name,
        title: title || `${artist.name} — Untitled ${releaseType}`,
        type: releaseType,
        producerId, mvBudget, rolloutId, platformId,
        quality, weeklyStreams, baseStreams,
        totalStreams: 0, revenue: 0,
        week: prev.week, active: true,
        viralHit: viralRoll,
        chartPosition: null, peakChart: null,
        hypeDecay: rollout.hypeDecay,
        isAI: !artist.isReal,
      };

      const feedMsg = viralRoll
        ? `VIRAL HIT: "${release.title}" is exploding everywhere! 🔥 (${release.type.toUpperCase()})`
        : quality >= 80
          ? `NEW RELEASE: "${release.title}" — Critics are raving! (${release.type.toUpperCase()})`
          : `NEW RELEASE: "${release.title}" is out now. (${release.type.toUpperCase()})`;

      toast(`"${release.title}" released! Q:${quality}/100${viralRoll ? ' 🔥 VIRAL' : ''}`, viralRoll ? 'success' : 'success');

      return {
        ...prev,
        cash: prev.cash - (totalCost + extraCost),
        totalExpenses: prev.totalExpenses + (totalCost + extraCost),
        releases: [...prev.releases, release],
        labelFame: clamp(prev.labelFame + fameGain * 0.25, 0, 100),
        roster: prev.roster.map(a => a.id === artistId
          ? { ...a, fame: clamp(a.fame + fameGain, 0, 100), mood: clamp(a.mood + 5, 0, 100) }
          : a
        ),
        socialFeed: [{ id: uuidv4(), text: feedMsg, week: prev.week, type: viralRoll ? 'viral' : 'release' }, ...prev.socialFeed].slice(0, MAX_FEED),
      };
    });
  }, [toast]);

  // ─── BOOK TOUR ────────────────────────────────
  const bookTour = useCallback((artistId, tourTier) => {
    setGame(prev => {
      if (prev.cash < tourTier.cost) { toast('Insufficient funds for tour!', 'danger'); return prev; }
      const artist = prev.roster.find(a => a.id === artistId);
      const revenue = tourTier.venues * tourTier.capacity * tourTier.ticketPrice * 0.85;
      const duration = Math.ceil(tourTier.venues / 3);
      const tour = {
        id: uuidv4(), artistId, artistName: artist?.name || '?',
        tier: tourTier.name, weeksRemaining: duration,
        weeklyRevenue: Math.floor(revenue / duration),
        totalRevenue: Math.floor(revenue), cost: tourTier.cost,
      };
      toast(`${artist?.name} tour booked! Est. ${fmtM(revenue)} revenue`, 'success');
      return {
        ...prev,
        cash: prev.cash - tourTier.cost,
        totalExpenses: prev.totalExpenses + tourTier.cost,
        activeTours: [...prev.activeTours, tour],
      };
    });
  }, [toast]);

  // ─── LAUNCH MERCH ─────────────────────────────
  const launchMerch = useCallback((artistId, line) => {
    setGame(prev => {
      if (prev.cash < line.cost) { toast('Insufficient funds for merch!', 'danger'); return prev; }
      const artist = prev.roster.find(a => a.id === artistId);
      const merch = { id: uuidv4(), artistId, artistName: artist?.name || '?', line: line.name, weeklyRevenue: line.weeklyRevenue, cost: line.cost, week: prev.week };
      toast(`${line.name} launched for ${artist?.name}!`, 'success');
      return { ...prev, cash: prev.cash - line.cost, totalExpenses: prev.totalExpenses + line.cost, activeMerch: [...prev.activeMerch, merch] };
    });
  }, [toast]);

  // ─── ACCEPT SYNC DEAL ─────────────────────────
  const acceptSyncDeal = useCallback((artistId, deal) => {
    setGame(prev => {
      const artist = prev.roster.find(a => a.id === artistId);
      const entry = { ...deal, artistId, artistName: artist?.name, week: prev.week };
      toast(`Sync deal accepted! +${fmtM(deal.fee)}`, 'success');
      return {
        ...prev,
        cash: prev.cash + deal.fee,
        totalRevenue: prev.totalRevenue + deal.fee,
        syncDeals: [...prev.syncDeals, entry],
        socialFeed: [
          { id: uuidv4(), text: `SYNC DEAL: ${artist?.name}'s music lands in ${deal.platform}! Fee: ${fmtM(deal.fee)}`, week: prev.week, type: 'deal' },
          ...prev.socialFeed,
        ].slice(0, MAX_FEED),
        roster: prev.roster.map(a => a.id === artistId ? { ...a, fame: clamp(a.fame + deal.fameBonus, 0, 100) } : a),
      };
    });
  }, [toast]);

  // ─── HIRE / UPGRADE STAFF ─────────────────────
  const hireStaff = useCallback((roleId) => {
    setGame(prev => {
      const role = STAFF_ROLES.find(r => r.id === roleId);
      if (!role) return prev;
      const currentLevel = prev.staff?.[roleId] || 0;
      if (currentLevel >= role.levels.length) { toast('Already at max level!', 'warn'); return prev; }
      const nextLevel = role.levels[currentLevel];
      const hiringCost = nextLevel.weeklyCost * 4; // 4-week advance
      if (prev.cash < hiringCost) { toast('Insufficient funds!', 'danger'); return prev; }
      toast(`${role.name} — ${nextLevel.name} hired!`, 'success');
      return {
        ...prev,
        cash: prev.cash - hiringCost,
        staff: { ...prev.staff, [roleId]: currentLevel + 1 },
      };
    });
  }, [toast]);

  // ─── TRAINING ─────────────────────────────────
  const startTraining = useCallback((artistId, program) => {
    setGame(prev => {
      if (prev.cash < program.cost) { toast('Insufficient funds!', 'danger'); return prev; }
      const artist = prev.roster.find(a => a.id === artistId);
      if (!artist) return prev;
      const session = { id: uuidv4(), artistId, programId: program.id, stat: program.stat, gain: program.gain, weeksLeft: program.durationWeeks, name: program.name };
      toast(`${artist.name} enrolled in ${program.name}`, 'info');
      return {
        ...prev,
        cash: prev.cash - program.cost,
        training: [...(prev.training || []), session],
      };
    });
  }, [toast]);

  // ─── TAKE LOAN ────────────────────────────────
  const takeLoan = useCallback((loanOption) => {
    setGame(prev => {
      const existingLoans = prev.activeLoans || [];
      if (existingLoans.find(l => l.id === loanOption.id)) { toast('Already have this loan!', 'warn'); return prev; }
      const loan = { ...loanOption, takenWeek: prev.week, weeksLeft: loanOption.durationWeeks || 52, paid: false };
      toast(`Loan secured: +${fmtM(loanOption.amount)}`, 'success');
      return {
        ...prev,
        cash: prev.cash + loanOption.amount,
        equityGiven: prev.equityGiven + (loanOption.equityStake || 0),
        activeLoans: [...existingLoans, loan],
        socialFeed: [
          { id: uuidv4(), text: `${prev.labelName} secures ${loanOption.type === 'equity' ? 'investment' : 'loan'}: ${fmtM(loanOption.amount)} in new capital.`, week: prev.week, type: 'deal' },
          ...prev.socialFeed,
        ].slice(0, MAX_FEED),
      };
    });
  }, [toast]);

  // ─── DRAMA CHOICE ─────────────────────────────
  const resolveDramaChoice = useCallback((event, choiceIdx, artistId) => {
    setGame(prev => {
      const choice = event.choices[choiceIdx];
      if (!choice) return prev;
      if (prev.cash < (choice.cost || 0)) { toast('Cannot afford this choice!', 'danger'); return prev; }

      let roster = [...prev.roster];
      let cash = prev.cash - Math.max(0, choice.cost || 0);
      // Negative cost = income (e.g., festival headliner fee)
      if ((choice.cost || 0) < 0) cash = prev.cash + Math.abs(choice.cost);

      const mktLevel = prev.staff?.marketing || 0;
      const streamBoost = (choice.streamBoost || 0) * (1 + mktLevel * 0.1);

      if (choice.dropsArtist) {
        roster = roster.filter(a => a.id !== artistId);
        toast('Artist dropped following crisis.', 'warn');
      } else {
        roster = roster.map(a => {
          if (a.id !== artistId) return a;
          let updated = {
            ...a,
            mood:    clamp(a.mood    + (choice.moodDelta    || 0), 0, 100),
            fame:    clamp(a.fame    + (choice.fameDelta    || 0), 0, 100),
            loyalty: clamp(a.loyalty + (choice.loyaltyDelta || 0), 0, 100),
          };
          if (choice.renegotiate) {
            updated = { ...updated, contract: { ...a.contract, weeklyFee: Math.floor(a.contract.weeklyFee * (choice.renegotiateMultiplier || 1)) } };
          }
          return updated;
        });
      }

      // Apply stream boost to active releases of this artist
      const releases = prev.releases.map(r => {
        if (r.artistId !== artistId || !r.active) return r;
        return { ...r, weeklyStreams: Math.max(0, Math.floor(r.weeklyStreams * (1 + streamBoost / 100))) };
      });

      const prLevel = prev.staff?.pr || 0;
      let imageHit = event.type === 'scandal' || event.type === 'crisis' ? -10 : 0;
      imageHit = Math.floor(imageHit * (1 - prLevel * 0.25));
      const imageHealth = clamp((prev.imageHealth || 100) + imageHit, 0, 100);

      toast(`${event.type === 'crisis' ? '🚨' : event.type === 'viral' ? '🔥' : '✓'} ${choice.label} — handled.`, event.type === 'crisis' ? 'warn' : 'success');

      return { ...prev, cash, roster, releases, imageHealth, pendingEvent: null };
    });
    setPendingEvent(null);
  }, [toast]);

  // ─── ADVANCE WEEK ─────────────────────────────
  const advanceWeek = useCallback(() => {
    if (pendingEvent) {
      toast('Resolve the active event first!', 'warn');
      return;
    }

    setGame(prev => {
      if (!prev) return prev;

      let cash = prev.cash;
      let totalRevenue = prev.totalRevenue;
      let totalExpenses = prev.totalExpenses;
      let roster = [...prev.roster];
      let releases = [...prev.releases];
      let activeTours = [...prev.activeTours];
      let training = [...(prev.training || [])];
      let imageHealth = prev.imageHealth ?? 100;
      let labelFame = prev.labelFame;
      const newFeed = [];

      // ── 1. ARTIST FEES ──────────────────────────
      let artistFees = 0;
      roster = roster.map(a => {
        artistFees += a.contract.weeklyFee;
        return { ...a, contract: { ...a.contract, weeksRemaining: a.contract.weeksRemaining - 1 } };
      });
      cash -= artistFees;
      totalExpenses += artistFees;

      // ── 2. STAFF COSTS ──────────────────────────
      let staffCosts = 0;
      for (const [roleId, level] of Object.entries(prev.staff || {})) {
        const role = STAFF_ROLES.find(r => r.id === roleId);
        if (role && level > 0) staffCosts += role.levels[level - 1].weeklyCost;
      }
      cash -= staffCosts;
      totalExpenses += staffCosts;

      // ── 3. LOAN PAYMENTS ─────────────────────────
      let loanPayments = 0;
      const activeLoans = (prev.activeLoans || []).map(loan => {
        if (loan.type === 'equity' || loan.paid || loan.weeksLeft <= 0) return loan;
        loanPayments += loan.weeklyPayment;
        cash -= loan.weeklyPayment;
        totalExpenses += loan.weeklyPayment;
        const newWeeksLeft = loan.weeksLeft - 1;
        return { ...loan, weeksLeft: newWeeksLeft, paid: newWeeksLeft <= 0 };
      });

      // ── 4. STREAMING REVENUE ─────────────────────
      const mktLevel = prev.staff?.marketing || 0;
      const mktMult  = [1, 1.10, 1.25, 1.40][mktLevel] ?? 1;

      let streamRevenue = 0;
      releases = releases.map(r => {
        if (!r.active) return r;
        const age = prev.week - r.week;
        const decay = Math.pow(r.hypeDecay || 0.97, age);
        // Artist burnout reduces streams
        const artist = roster.find(a => a.id === r.artistId);
        const burnoutFactor = artist ? (1 - (artist.burnoutRisk || 20) * 0.001) : 1;
        const ws = Math.floor(r.weeklyStreams * decay * burnoutFactor * mktMult * (0.88 + Math.random() * 0.24));
        const rev = ws * STREAM_RATE;
        streamRevenue += rev;
        // Age out very old, low-performing releases
        const stillActive = ws > 5000 || age < 8;
        return { ...r, weeklyStreams: Math.max(0, ws), totalStreams: (r.totalStreams || 0) + ws, revenue: (r.revenue || 0) + rev, active: stillActive };
      });
      cash += streamRevenue;
      totalRevenue += streamRevenue;

      // ── 5. TOUR REVENUE ──────────────────────────
      let tourRevenue = 0;
      activeTours = activeTours.map(t => {
        if (t.weeksRemaining <= 0) return t;
        tourRevenue += t.weeklyRevenue;
        return { ...t, weeksRemaining: t.weeksRemaining - 1 };
      }).filter(t => t.weeksRemaining > 0);
      cash += tourRevenue;
      totalRevenue += tourRevenue;

      // ── 6. MERCH REVENUE ─────────────────────────
      let merchRevenue = 0;
      (prev.activeMerch || []).forEach(m => { merchRevenue += m.weeklyRevenue; });
      cash += merchRevenue;
      totalRevenue += merchRevenue;

      // ── 7. EQUITY DRAIN ──────────────────────────
      const equityDrain = (totalRevenue - prev.totalRevenue) * (prev.equityGiven || 0) * 0.05;
      cash -= equityDrain;

      // ── 8. TRAINING TICK ─────────────────────────
      training = training.map(t => {
        const newLeft = t.weeksLeft - 1;
        if (newLeft <= 0) {
          // Apply stat gain
          roster = roster.map(a => {
            if (a.id !== t.artistId) return a;
            const statVal = a[t.stat];
            if (statVal === undefined) return a;
            const newVal = t.stat === 'controversyLevel' ? clamp(statVal + t.gain, 0, 100) : clamp(statVal + t.gain, 0, 100);
            newFeed.push({ id: uuidv4(), text: `${a.name} completes ${t.name} — ${t.stat} improved!`, week: prev.week + 1, type: 'milestone' });
            return { ...a, [t.stat]: newVal };
          });
          return { ...t, weeksLeft: 0, done: true };
        }
        return { ...t, weeksLeft: newLeft };
      }).filter(t => !t.done);

      // ── 9. ARTIST GROWTH / CAREER PHASES ────────
      roster = roster.map(a => {
        let { fame, mood, loyalty, careerPhase, burnoutRisk } = a;

        // Natural mood decay toward neutral
        mood = clamp(mood + (75 - mood) * 0.05, 20, 100);

        // Burnout check
        if (burnoutRisk > 60 && Math.random() < 0.05) {
          newFeed.push({ id: uuidv4(), text: `⚠️ ${a.name} is showing signs of burnout — consider lightening their schedule.`, week: prev.week + 1, type: 'warning' });
          mood = clamp(mood - 12, 20, 100);
          burnoutRisk = clamp(burnoutRisk + 5, 0, 100);
        }

        // Fame drift based on recent releases
        const artistReleases = releases.filter(r => r.artistId === a.id && r.active);
        if (artistReleases.length > 0) {
          const avgStreams = artistReleases.reduce((s, r) => s + r.weeklyStreams, 0) / artistReleases.length;
          if (avgStreams > 2000000) fame = clamp(fame + 0.3, 0, 100);
          else if (avgStreams < 200000) fame = clamp(fame - 0.1, 0, 100);
        } else {
          // No active releases — fame slowly decays
          fame = clamp(fame - 0.05, 0, 100);
        }

        // Career phase transitions
        if (fame >= 80 && careerPhase === 'rise') careerPhase = 'peak';
        if (fame < 60 && careerPhase === 'peak' && Math.random() < 0.02) careerPhase = 'decline';
        if (fame < 40 && careerPhase === 'decline' && Math.random() < 0.015) {
          newFeed.push({ id: uuidv4(), text: `📉 ${a.name} is in career decline — consider a rebrand or collab strategy.`, week: prev.week + 1, type: 'warning' });
        }
        if (careerPhase === 'decline' && Math.random() < 0.02) {
          careerPhase = 'comeback';
          newFeed.push({ id: uuidv4(), text: `🦋 ${a.name} is plotting a comeback — momentum building!`, week: prev.week + 1, type: 'milestone' });
        }

        return { ...a, fame, mood, loyalty, careerPhase, burnoutRisk };
      });

      // ── 10. CONTROVERSY / IMAGE ──────────────────
      const controversyRoll = roster.reduce((sum, a) => sum + a.controversyLevel, 0) / Math.max(1, roster.length);
      if (Math.random() * 100 < controversyRoll * 0.1) {
        imageHealth = clamp(imageHealth - rI(2, 8), 0, 100);
      }
      // Slow image recovery
      imageHealth = clamp(imageHealth + 0.5, 0, 100);

      // ── 11. CONTRACT EXPIRY ──────────────────────
      const expiredArtists = roster.filter(a => a.contract.weeksRemaining <= 0);
      expiredArtists.forEach(a => {
        newFeed.push({ id: uuidv4(), text: `📋 ${a.name}'s contract has expired — now a free agent.`, week: prev.week + 1, type: 'warning' });
      });
      roster = roster.filter(a => a.contract.weeksRemaining > 0);

      roster.forEach(a => {
        if (a.contract.weeksRemaining === 4) {
          newFeed.push({ id: uuidv4(), text: `⚠️ ${a.name}'s contract expires in 4 weeks — renegotiate soon.`, week: prev.week + 1, type: 'warning' });
        }
      });

      // ── 12. CHARTS UPDATE ─────────────────────────
      // Build competitor pool from real chart songs with noise
      let charts = CHART_SONGS.map((s, i) => ({
        ...s, rank: i + 1, isYours: false, isAI: false,
        streams: Math.floor(s.streams * (0.9 + Math.random() * 0.2)),
        weeksOnChart: 1, peakRank: i + 1,
      }));

      // Insert your releases
      const yourActive = releases.filter(r => r.active && r.weeklyStreams > 100000);
      yourActive.forEach(r => {
        charts.push({ title: r.title, artist: r.artistName, streams: r.weeklyStreams, rank: 999, isYours: true, isAI: !r.artistId?.startsWith('ai_') ? false : true, weeksOnChart: (prev.week - r.week) + 1, peakRank: 999 });
      });

      charts = charts.sort((a, b) => b.streams - a.streams).slice(0, 30).map((s, i) => {
        const rank = i + 1;
        return { ...s, rank, peakRank: Math.min(s.peakRank || rank, rank) };
      });

      // Chart history
      const chartHistory = [...(prev.chartHistory || [])];
      yourActive.forEach(r => {
        const pos = charts.find(c => c.title === r.title);
        if (pos) chartHistory.push({ week: prev.week, rank: pos.rank, title: r.title });
      });

      // ── 13. DRAMA EVENT ───────────────────────────
      let newPendingEvent = null;
      const prLevel = prev.staff?.pr || 0;
      const eventChance = roster.length > 0 ? 0.30 - prLevel * 0.05 : 0;

      if (Math.random() < eventChance) {
        const artist = rF(roster);
        const dramaticWeight = artist.controversyLevel / 100;
        const pool = DRAMA_EVENTS.filter(e =>
          !(e.type === 'crisis' && Math.random() > dramaticWeight) &&
          !(e.type === 'internal' && artist.loyalty > 70)
        );
        if (pool.length > 0) {
          const evt = { ...rF(pool), artistId: artist.id, artistName: artist.name };
          newPendingEvent = evt;
        }
      } else if (Math.random() < 0.45 && roster.length > 0) {
        // Passive news item (no choice needed)
        const artist = rF(roster);
        const news = rF(NEWS_EVENTS);
        const txt = news.text.replace('[ARTIST]', artist.name);
        newFeed.push({ id: uuidv4(), text: txt, week: prev.week + 1, type: news.type });
        if (news.fameBoost) {
          roster = roster.map(a => a.id === artist.id ? { ...a, fame: clamp(a.fame + news.fameBoost * 0.3, 0, 100) } : a);
        }
        if (news.streamBoost) {
          releases = releases.map(r => r.artistId === artist.id && r.active ? { ...r, weeklyStreams: Math.floor(r.weeklyStreams * (1 + news.streamBoost / 100)) } : r);
        }
      }

      // ── 14. MARKET REFRESH ────────────────────────
      let marketArtists = prev.marketArtists;
      if (prev.week % 4 === 0) {
        marketArtists = buildMarket(roster, prev.week);
      }

      // ── 15. AWARD SHOWS ───────────────────────────
      const nextMonth = prev.month + (prev.week % 4 === 3 ? 1 : 0);
      AWARD_SHOWS.forEach(show => {
        if (show.months.includes(nextMonth)) {
          const eligible = roster.filter(a => a.fame >= show.minFame);
          if (eligible.length > 0) {
            const nominee = rF(eligible);
            const wins = Math.random() < (nominee.fame / 200);
            newFeed.push({
              id: uuidv4(),
              text: wins
                ? `🏆 ${nominee.name} WINS at the ${show.name}! A historic night for ${prev.labelName}.`
                : `📢 ${nominee.name} nominated at the ${show.name} — a massive moment.`,
              week: prev.week + 1, type: 'award',
            });
            if (wins) {
              roster = roster.map(a => a.id === nominee.id ? { ...a, fame: clamp(a.fame + 8, 0, 100) } : a);
              labelFame = clamp(labelFame + 5, 0, 100);
            }
          }
        }
      });

      // ── 16. WEEK / MONTH / YEAR TICK ─────────────
      let week = prev.week + 1;
      let month = prev.month;
      let year = prev.year;
      if (week % 4 === 1) month += 1;
      if (month > 12) { month = 1; year += 1; }

      // ── 17. LABEL FAME ────────────────────────────
      const netIncome = streamRevenue + tourRevenue + merchRevenue - artistFees - staffCosts - loanPayments;
      labelFame = clamp(labelFame + (netIncome > 0 ? 0.08 : -0.04), 0, 100);

      // ── 18. OBJECTIVES CHECK ─────────────────────
      const updatedGame = {
        ...prev, cash: Math.floor(cash), totalRevenue: Math.floor(totalRevenue),
        totalExpenses: Math.floor(totalExpenses), labelFame, imageHealth,
        week, month, year, roster, releases, activeTours, activeMerch: prev.activeMerch,
        activeLoans, training, charts, chartHistory: chartHistory.slice(-200),
        marketArtists, allTimeStreams: (prev.allTimeStreams || 0) + releases.reduce((s, r) => s + (r.weeklyStreams || 0), 0),
        allTimeTours: (prev.allTimeTours || 0) + (activeTours.length > prev.activeTours.length ? 0 : 0),
        weeklyReport: { week: prev.week, streamRevenue: Math.floor(streamRevenue), tourRevenue: Math.floor(tourRevenue), merchRevenue: Math.floor(merchRevenue), artistFees: Math.floor(artistFees), staffCosts: Math.floor(staffCosts), loanPayments: Math.floor(loanPayments), netIncome: Math.floor(netIncome), cashBalance: Math.floor(cash) },
        pendingEvent: null,
      };

      const earnedObjs = checkObjectives(updatedGame, prev.objectives || []);
      let bonusCash = 0;
      const objFeedItems = earnedObjs.map(obj => {
        bonusCash += obj.reward;
        return { id: uuidv4(), text: `🎯 OBJECTIVE COMPLETE: "${obj.title}" — Bonus: ${fmtM(obj.reward)}!`, week: week, type: 'milestone' };
      });

      const combinedFeed = [...newFeed, ...objFeedItems, ...prev.socialFeed].slice(0, MAX_FEED);

      const finalState = {
        ...updatedGame,
        cash: Math.floor(cash + bonusCash),
        totalRevenue: Math.floor(totalRevenue + bonusCash),
        objectives: [...(prev.objectives || []), ...earnedObjs.map(o => o.id)],
        socialFeed: combinedFeed,
      };

      // Set pending event after state update
      if (newPendingEvent) {
        setTimeout(() => setPendingEvent(newPendingEvent), 100);
      }

      return finalState;
    });
  }, [pendingEvent, toast]);

  // ─── MANUAL SAVE ──────────────────────────────
  const manualSave = useCallback(() => {
    setGame(prev => {
      if (!prev || !careerId) return prev;
      saveCareer({ id: careerId, name: prev.labelName, state: prev, savedAt: Date.now() });
      toast('Game saved!', 'success', 2000);
      return prev;
    });
  }, [careerId, saveCareer, toast]);

  // ─── HELPERS ──────────────────────────────────
  const getLabelTier = () => {
    if (!game) return LABEL_TIERS[0];
    return LABEL_TIERS.find(t => t.idx === getLabelTierIdx(game.totalRevenue)) || LABEL_TIERS[0];
  };

  return {
    game, loading, toasts, pendingEvent,
    initGame, manualSave,
    signArtist, dropArtist, releaseMusic,
    bookTour, launchMerch, acceptSyncDeal,
    hireStaff, startTraining, takeLoan,
    resolveDramaChoice,
    advanceWeek,
    getLabelTier,
    fmtM,
  };
}
