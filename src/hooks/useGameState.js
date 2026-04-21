import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ARTISTS, CHART_SONGS, PR_EVENTS, LABEL_TIERS, RIVAL_LABELS } from '../data/gameData';
import { useAuth } from './useAuth';

const AUTOSAVE_INTERVAL = 60000; // 60 seconds

function calcLabelTier(totalRevenue) {
  const tiers = LABEL_TIERS;
  let tier = tiers[0];
  for (const t of tiers) {
    if (totalRevenue >= t.minRevenue) tier = t;
  }
  return tier;
}

function fmtMoney(n) {
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function useGameState(careerId) {
  const { saveCareer, getCareers } = useAuth();
  const [game, setGame] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const autoSaveRef = useRef(null);

  // Load career
  useEffect(() => {
    if (!careerId) { setLoading(false); return; }
    const careers = getCareers();
    const career = careers.find(c => c.id === careerId);
    if (career) {
      setGame(career.state);
    }
    setLoading(false);
  }, [careerId]);

  // Auto-save
  useEffect(() => {
    if (!game || !careerId) return;
    if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    autoSaveRef.current = setInterval(() => {
      saveCareer({ id: careerId, name: game.labelName, state: game, savedAt: Date.now() });
    }, AUTOSAVE_INTERVAL);
    return () => clearInterval(autoSaveRef.current);
  }, [game, careerId]);

  const addToast = useCallback((msg, type = 'info', duration = 4000) => {
    const id = uuidv4();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration);
  }, []);

  const initGame = (labelName, ownerName) => {
    const unsigned = ARTISTS.filter(a => !a.label).map(a => ({ ...a }));
    const signed = ARTISTS.filter(a => a.label).map(a => ({ ...a }));

    const initialState = {
      id: careerId,
      labelName,
      ownerName,
      week: 1,
      month: 1,
      year: 2025,
      cash: 5000000,
      totalRevenue: 0,
      totalExpenses: 0,
      labelFame: 10,
      roster: [],
      releases: [],
      activeTours: [],
      activeMerch: [],
      syncDeals: [],
      socialFeed: [
        { id: uuidv4(), text: `🎵 ${labelName} opens its doors — the music industry will never be the same.`, week: 1, type: 'milestone' },
        { id: uuidv4(), text: '📊 Industry sources predict a banner year for independent labels.', week: 1, type: 'news' },
      ],
      charts: CHART_SONGS.map((s, i) => ({ ...s, rank: i + 1, isYours: false })),
      weeklyReport: null,
      pendingEvents: [],
      achievements: [],
      rivals: RIVAL_LABELS,
      marketArtists: unsigned.slice(0, 8),
      allArtists: [...unsigned, ...signed],
    };
    setGame(initialState);
    return initialState;
  };

  const save = useCallback((state) => {
    if (!careerId) return;
    saveCareer({ id: careerId, name: state.labelName, state, savedAt: Date.now() });
  }, [careerId, saveCareer]);

  const update = useCallback((fn) => {
    setGame(prev => {
      const next = fn(prev);
      return next;
    });
  }, []);

  // Sign an artist
  const signArtist = useCallback((artistId, dealType, royaltySplit, contractLength) => {
    setGame(prev => {
      const artist = prev.allArtists.find(a => a.id === artistId);
      if (!artist) return prev;
      if (prev.cash < artist.signingBonus) {
        addToast('Insufficient funds for signing bonus!', 'danger');
        return prev;
      }
      const contract = {
        artistId,
        dealType,
        royaltySplit,
        contractLength, // in weeks
        weeksRemaining: contractLength,
        signingBonus: artist.signingBonus,
        weeklyFee: artist.weeklyFee,
        signedWeek: prev.week,
      };
      const rosterEntry = { ...artist, contract, loyalty: 75, weeklyStreams: Math.floor(artist.fame * 8000) };
      const newCash = prev.cash - artist.signingBonus;
      const newFeed = [
        { id: uuidv4(), text: `🖊️ SIGNED: ${artist.name} joins ${prev.labelName} on a ${dealType}!`, week: prev.week, type: 'signing' },
        ...prev.socialFeed
      ].slice(0, 50);
      addToast(`${artist.name} signed!`, 'success');
      return {
        ...prev,
        cash: newCash,
        roster: [...prev.roster, rosterEntry],
        marketArtists: prev.marketArtists.filter(a => a.id !== artistId),
        socialFeed: newFeed,
      };
    });
  }, [addToast]);

  // Drop an artist (with buyout)
  const dropArtist = useCallback((artistId) => {
    setGame(prev => {
      const artist = prev.roster.find(a => a.id === artistId);
      if (!artist) return prev;
      const buyout = artist.contract.weeklyFee * 8;
      if (prev.cash < buyout) {
        addToast('Not enough cash for buyout!', 'danger');
        return prev;
      }
      const newFeed = [
        { id: uuidv4(), text: `💔 ${artist.name} has parted ways with ${prev.labelName}.`, week: prev.week, type: 'release' },
        ...prev.socialFeed
      ].slice(0, 50);
      addToast(`Dropped ${artist.name} (buyout: ${fmtMoney(buyout)})`, 'warn');
      return {
        ...prev,
        cash: prev.cash - buyout,
        roster: prev.roster.filter(a => a.id !== artistId),
        socialFeed: newFeed,
      };
    });
  }, [addToast]);

  // Release music
  const releaseMusic = useCallback((artistId, releaseType, producerId, mvBudget, title) => {
    setGame(prev => {
      const artist = prev.roster.find(a => a.id === artistId);
      if (!artist) return prev;
      const producerCost = mvBudget + (producerId ? 100000 : 0);
      if (prev.cash < producerCost) {
        addToast('Insufficient funds for release!', 'danger');
        return prev;
      }
      const quality = Math.min(100, artist.talent + (producerId ? 15 : 0) + (mvBudget > 200000 ? 10 : 0) + randInt(-5, 5));
      const hypeMultiplier = { single: 1, ep: 1.5, album: 2.5 }[releaseType] || 1;
      const baseStreams = artist.fame * 20000 * hypeMultiplier * (quality / 100);
      const weeklyStreams = Math.floor(baseStreams * (0.8 + Math.random() * 0.4));
      const release = {
        id: uuidv4(),
        artistId,
        artistName: artist.name,
        title: title || `${artist.name} - New ${releaseType}`,
        type: releaseType,
        producerId,
        mvBudget,
        quality,
        weeklyStreams,
        totalStreams: 0,
        week: prev.week,
        revenue: 0,
        chartPosition: null,
        active: true,
      };
      const fameGain = Math.floor(quality / 10) + (releaseType === 'album' ? 3 : 0);
      const newFeed = [
        { id: uuidv4(), text: `🎵 NEW RELEASE: "${release.title}" is OUT NOW! ${quality >= 80 ? '🔥 Critics are raving!' : quality >= 60 ? 'Getting good reviews.' : 'Mixed reviews so far.'}`, week: prev.week, type: 'release' },
        ...prev.socialFeed
      ].slice(0, 50);
      addToast(`"${release.title}" released! Quality: ${quality}/100`, 'success');
      return {
        ...prev,
        cash: prev.cash - producerCost,
        releases: [...prev.releases, release],
        socialFeed: newFeed,
        labelFame: Math.min(100, prev.labelFame + fameGain * 0.3),
        roster: prev.roster.map(a => a.id === artistId ? { ...a, fame: Math.min(100, a.fame + fameGain) } : a),
      };
    });
  }, [addToast]);

  // Book tour
  const bookTour = useCallback((artistId, tourTier) => {
    setGame(prev => {
      if (prev.cash < tourTier.cost) {
        addToast('Insufficient funds for tour!', 'danger');
        return prev;
      }
      const artist = prev.roster.find(a => a.id === artistId);
      const revenue = tourTier.venues * tourTier.capacity * tourTier.ticketPrice * 0.85;
      const tour = {
        id: uuidv4(),
        artistId,
        artistName: artist?.name || 'Unknown',
        tier: tourTier.name,
        weeksRemaining: Math.ceil(tourTier.venues / 3),
        totalRevenue: revenue,
        weeklyRevenue: Math.floor(revenue / Math.ceil(tourTier.venues / 3)),
        cost: tourTier.cost,
      };
      addToast(`${artist?.name} tour booked! Est. revenue: ${fmtMoney(revenue)}`, 'success');
      return {
        ...prev,
        cash: prev.cash - tourTier.cost,
        activeTours: [...prev.activeTours, tour],
      };
    });
  }, [addToast]);

  // Launch merch
  const launchMerch = useCallback((artistId, merchLine) => {
    setGame(prev => {
      if (prev.cash < merchLine.cost) {
        addToast('Insufficient funds for merch!', 'danger');
        return prev;
      }
      const artist = prev.roster.find(a => a.id === artistId);
      const merch = {
        id: uuidv4(),
        artistId,
        artistName: artist?.name || 'Unknown',
        line: merchLine.name,
        weeklyRevenue: merchLine.weeklyRevenue,
        cost: merchLine.cost,
        week: prev.week,
      };
      addToast(`${merchLine.name} launched for ${artist?.name}!`, 'success');
      return {
        ...prev,
        cash: prev.cash - merchLine.cost,
        activeMerch: [...prev.activeMerch, merch],
      };
    });
  }, [addToast]);

  // Accept sync deal
  const acceptSyncDeal = useCallback((artistId, deal) => {
    setGame(prev => {
      const artist = prev.roster.find(a => a.id === artistId);
      const entry = { ...deal, artistId, artistName: artist?.name, week: prev.week };
      const newFeed = [
        { id: uuidv4(), text: `📺 SYNC DEAL: ${artist?.name}'s music lands in ${deal.platform}! Fee: ${fmtMoney(deal.fee)}`, week: prev.week, type: 'deal' },
        ...prev.socialFeed
      ].slice(0, 50);
      addToast(`Sync deal accepted! +${fmtMoney(deal.fee)}`, 'success');
      return {
        ...prev,
        cash: prev.cash + deal.fee,
        totalRevenue: prev.totalRevenue + deal.fee,
        syncDeals: [...prev.syncDeals, entry],
        socialFeed: newFeed,
        roster: prev.roster.map(a => a.id === artistId ? { ...a, fame: Math.min(100, a.fame + deal.fameBonus) } : a),
      };
    });
  }, [addToast]);

  // Advance week — the main simulation tick
  const advanceWeek = useCallback(() => {
    setGame(prev => {
      if (!prev) return prev;

      let cash = prev.cash;
      let totalRevenue = prev.totalRevenue;
      let totalExpenses = prev.totalExpenses;
      const weeklyLog = [];
      let roster = [...prev.roster];
      let releases = [...prev.releases];
      let activeTours = [...prev.activeTours];
      const socialFeed = [...prev.socialFeed];

      // --- Artist fees ---
      let artistFees = 0;
      roster = roster.map(a => {
        artistFees += a.contract.weeklyFee;
        const newWeeksRemaining = a.contract.weeksRemaining - 1;
        return { ...a, contract: { ...a.contract, weeksRemaining: newWeeksRemaining } };
      });
      cash -= artistFees;
      totalExpenses += artistFees;

      // --- Streaming revenue ---
      let streamRevenue = 0;
      releases = releases.map(r => {
        if (!r.active) return r;
        const decay = Math.max(0.7, 1 - (prev.week - r.week) * 0.02);
        const ws = Math.floor(r.weeklyStreams * decay * (0.9 + Math.random() * 0.2));
        const rev = ws * 0.004; // ~$0.004 per stream
        streamRevenue += rev;
        return { ...r, weeklyStreams: ws, totalStreams: r.totalStreams + ws, revenue: r.revenue + rev };
      });
      cash += streamRevenue;
      totalRevenue += streamRevenue;

      // --- Tour revenue ---
      let tourRevenue = 0;
      activeTours = activeTours.map(t => {
        if (t.weeksRemaining <= 0) return t;
        tourRevenue += t.weeklyRevenue;
        return { ...t, weeksRemaining: t.weeksRemaining - 1 };
      }).filter(t => t.weeksRemaining > 0);
      cash += tourRevenue;
      totalRevenue += tourRevenue;

      // --- Merch revenue ---
      let merchRevenue = 0;
      prev.activeMerch.forEach(m => { merchRevenue += m.weeklyRevenue; });
      cash += merchRevenue;
      totalRevenue += merchRevenue;

      // --- Random PR event ---
      let newFeedItems = [];
      if (Math.random() < 0.35 && roster.length > 0) {
        const artist = randFrom(roster);
        const event = randFrom(PR_EVENTS);
        const text = event.text.replace('[ARTIST]', artist.name);
        newFeedItems.push({ id: uuidv4(), text, week: prev.week + 1, type: event.type });
        roster = roster.map(a => a.id === artist.id
          ? { ...a, mood: Math.max(10, Math.min(100, a.mood + event.impact * 0.3)), fame: Math.max(0, Math.min(100, a.fame + event.fameChange * 0.2)) }
          : a
        );
      }

      // --- Refresh market artists periodically ---
      let marketArtists = prev.marketArtists;
      if (prev.week % 4 === 0) {
        const unsigned = prev.allArtists.filter(a => !a.label && !roster.find(r => r.id === a.id));
        const shuffled = [...unsigned].sort(() => Math.random() - 0.5);
        marketArtists = shuffled.slice(0, Math.min(8, shuffled.length));
      }

      // --- Contract expiry warnings ---
      roster.forEach(a => {
        if (a.contract.weeksRemaining === 4) {
          newFeedItems.push({ id: uuidv4(), text: `⚠️ ${a.name}'s contract expires in 4 weeks — renegotiate soon.`, week: prev.week + 1, type: 'warning' });
        }
      });

      // Remove expired contracts (0 weeks left)
      const expiredArtists = roster.filter(a => a.contract.weeksRemaining <= 0);
      expiredArtists.forEach(a => {
        newFeedItems.push({ id: uuidv4(), text: `📋 ${a.name}'s contract has expired and they are now a free agent.`, week: prev.week + 1, type: 'warning' });
      });
      roster = roster.filter(a => a.contract.weeksRemaining > 0);

      // --- Charts update ---
      const yourReleases = releases.filter(r => r.active && r.weeklyStreams > 1000000);
      let charts = [...CHART_SONGS.map((s, i) => ({ ...s, rank: i + 1, isYours: false }))];
      yourReleases.forEach(r => {
        const chartPos = Math.max(1, Math.floor(16 - r.weeklyStreams / 500000));
        if (chartPos <= 15) {
          charts.unshift({ title: r.title, artist: r.artistName, streams: r.weeklyStreams, rank: chartPos, isYours: true });
        }
      });
      charts = charts.sort((a, b) => b.streams - a.streams).slice(0, 15).map((s, i) => ({ ...s, rank: i + 1 }));

      // --- Week/month/year tick ---
      let week = prev.week + 1;
      let month = prev.month;
      let year = prev.year;
      if (week % 4 === 1) { month += 1; }
      if (month > 12) { month = 1; year += 1; }

      // --- Weekly report ---
      const weeklyReport = {
        week: prev.week,
        streamRevenue: Math.floor(streamRevenue),
        tourRevenue: Math.floor(tourRevenue),
        merchRevenue: Math.floor(merchRevenue),
        artistFees: Math.floor(artistFees),
        netIncome: Math.floor(streamRevenue + tourRevenue + merchRevenue - artistFees),
        cashBalance: Math.floor(cash),
      };

      const combinedFeed = [...newFeedItems, ...socialFeed].slice(0, 60);

      return {
        ...prev,
        cash: Math.floor(cash),
        totalRevenue: Math.floor(totalRevenue),
        totalExpenses: Math.floor(totalExpenses),
        labelFame: Math.min(100, prev.labelFame + (weeklyReport.netIncome > 0 ? 0.1 : -0.05)),
        week,
        month,
        year,
        roster,
        releases,
        activeTours,
        activeMerch: prev.activeMerch,
        syncDeals: prev.syncDeals,
        socialFeed: combinedFeed,
        charts,
        weeklyReport,
        marketArtists,
      };
    });
  }, []);

  const manualSave = useCallback(() => {
    setGame(prev => {
      if (!prev || !careerId) return prev;
      saveCareer({ id: careerId, name: prev.labelName, state: prev, savedAt: Date.now() });
      addToast('Game saved!', 'success', 2500);
      return prev;
    });
  }, [careerId, saveCareer, addToast]);

  const getLabelTier = () => game ? calcLabelTier(game.totalRevenue) : LABEL_TIERS[0];
  const fmtCash = (n) => fmtMoney(n ?? 0);

  return {
    game,
    loading,
    toasts,
    addToast,
    initGame,
    save,
    manualSave,
    update,
    signArtist,
    dropArtist,
    releaseMusic,
    bookTour,
    launchMerch,
    acceptSyncDeal,
    advanceWeek,
    getLabelTier,
    fmtCash,
  };
}
