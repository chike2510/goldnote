import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  REAL_ARTISTS, CHART_SONGS, DRAMA_EVENTS, NEWS_EVENTS, NEAR_MISS_EVENTS,
  LABEL_TIERS, RIVAL_LABELS, WEEKLY_OBJECTIVES, AWARD_SHOWS,
  PRODUCERS, ROLLOUT_STRATEGIES, PLATFORM_STRATEGIES, STAFF_ROLES,
  GENRE_TREND_CYCLES, LABEL_OVERHEAD, DIFFICULTY,
  generateAIArtist,
} from '../data/gameData';
import { useAuth } from './useAuth';

// ─── CONSTANTS ────────────────────────────────
const AUTOSAVE_MS = 60000;
const MAX_FEED    = 100;
const MARKET_SLOTS = 12;
const AI_SHARE    = 0.35;

// ─── UTILS ────────────────────────────────────
const ri  = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
const rf  = arr   => arr[Math.floor(Math.random()*arr.length)];
const cl  = (v,lo,hi) => Math.min(hi,Math.max(lo,v));

export function fmtM(n) {
  if (!n&&n!==0) return '$0';
  const a=Math.abs(n); const s=n<0?'-':'';
  if(a>=1e9) return `${s}$${(a/1e9).toFixed(2)}B`;
  if(a>=1e6) return `${s}$${(a/1e6).toFixed(2)}M`;
  if(a>=1e3) return `${s}$${(a/1e3).toFixed(0)}K`;
  return `${s}$${Math.floor(a).toLocaleString()}`;
}

function getTierIdx(rev) {
  let idx=0;
  for(const t of LABEL_TIERS){if(rev>=t.minRevenue)idx=t.idx;}
  return idx;
}

function getOverheadCost(rev, diff) {
  const tierIdx = getTierIdx(rev);
  const overhead = LABEL_OVERHEAD.find(o=>o.tierIdx===tierIdx)||LABEL_OVERHEAD[0];
  return Math.floor(overhead.weeklyCost * (diff?.overheadMult||1));
}

// ─── MARKET BUILDER ───────────────────────────
function buildMarket(rosterIds, week, anrLevel=0) {
  const inRoster = new Set(rosterIds);
  let real = REAL_ARTISTS.filter(a=>!inRoster.has(a.id));

  // Tier gating based on A&R level
  real = real.filter(a => {
    if(a.tier==='S') return anrLevel>=7;  // level 7 unlocks S-tier
    if(a.tier==='A') return anrLevel>=2;  // level 2 unlocks A-tier
    return true;
  });

  const shuffled = [...real].sort(()=>Math.random()-0.5);
  const realCount = Math.floor(MARKET_SLOTS*(1-AI_SHARE));
  const aiCount   = MARKET_SLOTS-realCount;

  return [
    ...shuffled.slice(0, realCount),
    ...Array.from({length:aiCount}, ()=>generateAIArtist(week)),
  ].sort(()=>Math.random()-0.5);
}

// ─── OBJECTIVE CHECKER ────────────────────────
function checkObjectives(state, done) {
  const charts = state.charts||[];
  const yourCharts = charts.filter(c=>c.isYours);
  const bestRank = yourCharts.length ? Math.min(...yourCharts.map(c=>c.rank)) : 999;
  const vals = {
    rosterSize:   state.roster.length,
    releaseCount: state.releases.length,
    chartPos:     bestRank,
    chartNum1:    bestRank===1?1:0,
    totalRevenue: state.totalRevenue,
    syncCount:    state.syncDeals.length,
    aiRoster:     state.roster.filter(a=>!a.isReal).length,
    totalStreams:  state.releases.reduce((s,r)=>s+(r.totalStreams||0),0),
    tierIdx:      getTierIdx(state.totalRevenue),
    rivalBeaten:  state.rivalBeaten||0,
  };
  return WEEKLY_OBJECTIVES.filter(o=>{
    if(done.includes(o.id)) return false;
    const v=vals[o.metric];
    if(v===undefined) return false;
    return o.metric==='chartPos'?v<=o.target:v>=o.target;
  });
}

// ─── MAIN HOOK ────────────────────────────────
export function useGameState(careerId) {
  const { saveCareer, getCareers } = useAuth();
  const [game,         setGame]         = useState(null);
  const [toasts,       setToasts]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [pendingEvent, setPendingEvent] = useState(null);
  const [weekSummary,  setWeekSummary]  = useState(null);
  const gameRef  = useRef(null);
  const autoRef  = useRef(null);

  useEffect(()=>{gameRef.current=game;},[game]);

  useEffect(()=>{
    if(!careerId){setLoading(false);return;}
    const c=getCareers().find(x=>x.id===careerId);
    if(c?.state) setGame(c.state);
    setLoading(false);
  },[careerId]);

  useEffect(()=>{
    if(!game||!careerId) return;
    clearInterval(autoRef.current);
    autoRef.current=setInterval(()=>{
      const g=gameRef.current;
      if(g) saveCareer({id:careerId,name:g.labelName,state:g,savedAt:Date.now()});
    },AUTOSAVE_MS);
    return ()=>clearInterval(autoRef.current);
  },[careerId,game?.labelName]);

  const toast=useCallback((msg,type='info',dur=4500)=>{
    const id=uuidv4();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),dur);
  },[]);

  // ─── INIT ────────────────────────────────────
  const initGame=useCallback((labelName,ownerName,difficulty='normal')=>{
    const diff=DIFFICULTY[difficulty]||DIFFICULTY.normal;
    const market=buildMarket([],1,0);
    const trendIdx=ri(0,GENRE_TREND_CYCLES.length-1);
    const state={
      id:careerId, labelName, ownerName, difficulty,
      week:1, month:1, year:2025,
      cash:diff.startCash,
      totalRevenue:0, totalExpenses:0, equityGiven:0,
      activeLoans:[],
      labelFame:10, imageHealth:100, labelCulture:50,
      roster:[], releases:[],
      activeTours:[], activeMerch:[],
      syncDeals:[], staff:{},
      training:[], objectives:[],
      achievements:[], milestones:[],
      rivalBeaten:0, allTimeTours:0,
      chartRecords:{longestNum1:0,biggestJump:0,mostWeeks:0},
      weeklyReport:null,
      currentTrendIdx:trendIdx, trendWeeksLeft:ri(4,8),
      socialFeed:[
        {id:uuidv4(),text:`🎬 ${labelName} opens its doors. The industry will never be the same.`,week:1,type:'milestone',important:true},
        {id:uuidv4(),text:`📊 Genre trending this week: ${GENRE_TREND_CYCLES[trendIdx].description}`,week:1,type:'trend',important:false},
        {id:uuidv4(),text:`💡 Difficulty: ${diff.label}. Stream rate is $${diff.streamRate.toFixed(4)} per stream.`,week:1,type:'tip',important:false},
      ],
      charts:CHART_SONGS.filter(s=>!s.isAlbum).slice(0,50).map((s,i)=>({...s,rank:i+1,isYours:false,isAI:false,weeksOnChart:Math.max(1,(s.weeksOnChart||1)-ri(0,15)),peakRank:s.peakRank||i+1,prevRank:i+1,movement:0})),
      albumCharts:CHART_SONGS.filter(s=>s.isAlbum).map((s,i)=>({...s,rank:i+1,isYours:false,weeksOnChart:ri(1,20),peakRank:i+1})),
      marketArtists:market,
      rivals:RIVAL_LABELS,
      diff,
    };
    setGame(state);
    return state;
  },[careerId]);

  // ─── SIGN ARTIST ─────────────────────────────
  // contractTerms: { dealType, royaltySplit, albumObligation, advance, contractWeeks, revenueSplit }
  const signArtist=useCallback((artistId, contractTerms)=>{
    setGame(prev=>{
      const artist=prev.marketArtists.find(a=>a.id===artistId)||REAL_ARTISTS.find(a=>a.id===artistId);
      if(!artist) return prev;
      const totalUpfront=(artist.signingBonus||0)+(contractTerms.advance||0);
      if(prev.cash<totalUpfront){toast(`Need ${fmtM(totalUpfront)} upfront (bonus + advance)`,'danger');return prev;}

      const diff=prev.diff||DIFFICULTY.normal;
      // Mood/loyalty affected by deal terms
      const moodBonus=(contractTerms.advance>0?10:0)+((contractTerms.revenueSplit==='30_70'||contractTerms.revenueSplit==='40_60')?8:0);
      const loyaltyBonus=(contractTerms.advance>500000?15:contractTerms.advance>0?8:0);

      const contract={
        dealType:      contractTerms.dealType||'standard',
        royaltySplit:  contractTerms.royaltySplit||0.20,
        revenueSplit:  contractTerms.revenueSplit||'50_50',
        albumObligation:contractTerms.albumObligation||0,
        albumsDelivered:0,
        advance:       contractTerms.advance||0,
        contractWeeks: contractTerms.contractWeeks||52,
        weeksRemaining:contractTerms.contractWeeks||52,
        signingBonus:  artist.signingBonus,
        weeklyFee:     Math.floor(artist.weeklyFee*(diff.artistFeeMult||1)),
        signedWeek:    prev.week,
      };

      const entry={
        ...artist,
        contract,
        loyalty:   cl((artist.loyalty||70)+loyaltyBonus+(prev.labelCulture-50)*0.2, 20, 100),
        mood:      cl((artist.mood||75)+moodBonus, 20, 100),
        imageDecay:100,
        weeklyStreams:Math.floor((artist.fame||30)*6000),
        careerPhase:artist.careerPhase||'rise',
        weeksOnRoster:0,
        peakFame:artist.fame||30,
      };

      const feed=[
        {id:uuidv4(),text:`✍️ SIGNED: ${artist.name} joins ${prev.labelName}${!artist.isReal?' 🤖 (AI Artist)':''} — ${contract.dealType}. Advance: ${fmtM(contract.advance)}.`,week:prev.week,type:'signing',important:true},
        ...prev.socialFeed,
      ].slice(0,MAX_FEED);

      toast(`${artist.name} signed! Upfront: ${fmtM(totalUpfront)}`,'success');
      return{
        ...prev,
        cash:prev.cash-totalUpfront,
        totalExpenses:prev.totalExpenses+totalUpfront,
        roster:[...prev.roster,entry],
        marketArtists:prev.marketArtists.filter(a=>a.id!==artistId),
        labelCulture:cl(prev.labelCulture+1,0,100),
        socialFeed:feed,
      };
    });
  },[toast]);

  // ─── DROP ARTIST ─────────────────────────────
  const dropArtist=useCallback((artistId)=>{
    setGame(prev=>{
      const a=prev.roster.find(x=>x.id===artistId);
      if(!a) return prev;
      const legalLv=prev.staff?.legal||0;
      // Legal team reduces buyout: each 2 levels = 10% reduction, max 100% at level 10
      const disc=Math.max(0,1-legalLv*0.10);
      const buyout=Math.floor(a.contract.weeklyFee*8*disc);
      if(prev.cash<buyout){toast(`Need ${fmtM(buyout)} for buyout!`,'danger');return prev;}
      toast(`Dropped ${a.name} — buyout: ${fmtM(buyout)}`,'warn');
      return{
        ...prev,
        cash:prev.cash-buyout,
        totalExpenses:prev.totalExpenses+buyout,
        roster:prev.roster.filter(x=>x.id!==artistId),
        labelCulture:cl(prev.labelCulture-4,0,100),
        socialFeed:[
          {id:uuidv4(),text:`💔 ${a.name} parts ways with ${prev.labelName}.`,week:prev.week,type:'internal',important:false},
          ...prev.socialFeed,
        ].slice(0,MAX_FEED),
      };
    });
  },[toast]);

  // ─── RELEASE MUSIC ────────────────────────────
  const releaseMusic=useCallback((artistId,releaseType,producerId,mvBudget,title,rolloutId,platformId,featuredArtistId,selectedTrackIds)=>{
    setGame(prev=>{
      const artist=prev.roster.find(a=>a.id===artistId);
      if(!artist) return prev;
      const prod    =PRODUCERS.find(p=>p.id===producerId);
      const rollout =ROLLOUT_STRATEGIES.find(r=>r.id===rolloutId)||ROLLOUT_STRATEGIES[1];
      const plat    =PLATFORM_STRATEGIES.find(p=>p.id===platformId);
      const diff    =prev.diff||DIFFICULTY.normal;

      // Promotion costs scaled by difficulty
      const promoMult=diff.promoMult||1;
      const prodCost=(prod?.cost||0)*promoMult;
      const rollCost=(rollout?.cost||0)*promoMult;
      const platCost=(plat?.cost||0)*promoMult;
      const mvCost  =(mvBudget||0)*promoMult;

      // Featured artist fee
      const featRoster=featuredArtistId?prev.roster.find(a=>a.id===featuredArtistId):null;
      const featNPC   =featuredArtistId&&!featRoster?REAL_ARTISTS.find(a=>a.id===featuredArtistId):null;
      const featFame  =featRoster?.fame||featNPC?.fame||0;
      const featFee   =featNPC?Math.floor((featNPC.signingBonus||0)*0.025+(featNPC.weeklyFee||0)*1.5):0;
      const featBonus =Math.floor(featFame*0.09);

      const totalCost=Math.floor(prodCost+rollCost+platCost+mvCost+featFee);
      if(prev.cash<totalCost){toast(`Need ${fmtM(totalCost)} for this release!`,'danger');return prev;}

      // Quality calc
      const mktLv =prev.staff?.marketing||0;
      const mktBonus=[0,4,8,12,16,20,24,28,32,36,40][mktLv]||0;
      const mvBonus=(mvBudget||0)>800000?14:(mvBudget||0)>400000?9:(mvBudget||0)>150000?5:0;
      const trackBonus=releaseType==='album'&&(selectedTrackIds||[]).length>0?Math.min(12,(selectedTrackIds||[]).length*3):0;
      const quality=cl(
        artist.talent+(prod?prod.qualityBonus:0)+mvBonus+Math.floor(artist.creativity*0.12)+mktBonus+featBonus+trackBonus+ri(-6,6),
        10,100
      );

      // Streams — difficulty affects rate not count
      const trendCycle=GENRE_TREND_CYCLES[prev.currentTrendIdx||0];
      const trendMult =trendCycle?.genre===artist.genre?(trendCycle.mult||1):1.0;
      const mktMult   =[1,1.08,1.16,1.24,1.32,1.40,1.50,1.60,1.72,1.85,2.0][mktLv]||1;
      const featMult  =featFame>0?(1+featFame/220):1;

      // Viral check
      const viralChance=(artist.viralProbability||20)+(plat?.viralBonus||0)+(rollout?.viralBonus||0)+(featFame>80?10:0);
      const viralHit=Math.random()*100<viralChance;
      const viralMult=viralHit?ri(2,5):1;

      const typeMult={single:1.0,ep:1.6,album:3.0}[releaseType]||1;
      // Base weekly streams: talent-based, not inflated
      const baseWeekly=artist.fame*12000*typeMult*(quality/100)*(rollout?.streamMult||1)*mktMult*trendMult*featMult;
      const weeklyStreams=Math.floor(baseWeekly*viralMult*(0.82+Math.random()*0.36));

      const fameGain=Math.floor(quality/10)+(releaseType==='album'?4:1)+(viralHit?6:0)+(featFame>70?2:0);
      const featName=featRoster?.name||featNPC?.name||null;

      const release={
        id:uuidv4(),artistId,artistName:artist.name,
        title:title||`${artist.name} — ${releaseType.toUpperCase()}`,
        type:releaseType,producerId,mvBudget,rolloutId,platformId,
        featuredArtist:featName,
        includedTracks:selectedTrackIds||[],
        quality,weeklyStreams,baseWeekly,
        totalStreams:0,revenue:0,week:prev.week,active:true,
        viralHit,hypeDecay:rollout?.hypeDecay||0.97,
        chartPosition:null,peakChart:null,
        isAI:!artist.isReal,genre:artist.genre,region:artist.region,
        trendBoost:trendMult>1,
        // Track album delivery obligation
        countsAsAlbum:releaseType==='album'||releaseType==='ep',
      };

      const feedMsg=viralHit
        ?`🔥 VIRAL: "${release.title}" is EVERYWHERE. TikTok exploding.`
        :quality>=85?`🎵 "${release.title}" — critics raving. Strong debut expected.`
        :quality>=65?`🎵 "${release.title}" is out. Good early numbers.`
        :`🎵 "${release.title}" dropped. Mixed early reception.`;

      // Track album delivery if applicable
      let updatedRoster=prev.roster.map(a=>{
        if(a.id!==artistId) return a;
        const newAlbumsDelivered=(a.contract.albumsDelivered||0)+(release.countsAsAlbum?1:0);
        return{...a,fame:cl(a.fame+fameGain,0,100),mood:cl(a.mood+6,0,100),peakFame:Math.max(a.peakFame||0,a.fame+fameGain),contract:{...a.contract,albumsDelivered:newAlbumsDelivered}};
      });

      toast(`"${release.title}" released!${viralHit?' 🔥 VIRAL!':''} Q:${quality}/100`,'success');
      return{
        ...prev,
        cash:prev.cash-totalCost,
        totalExpenses:prev.totalExpenses+totalCost,
        releases:[...prev.releases,release],
        labelFame:cl(prev.labelFame+fameGain*0.2,0,100),
        roster:updatedRoster,
        socialFeed:[{id:uuidv4(),text:feedMsg,week:prev.week,type:viralHit?'viral':'release',important:viralHit},...prev.socialFeed].slice(0,MAX_FEED),
      };
    });
  },[toast]);

  // ─── BOOK TOUR ────────────────────────────────
  const bookTour=useCallback((artistId,tier)=>{
    setGame(prev=>{
      const diff=prev.diff||DIFFICULTY.normal;
      const artist=prev.roster.find(x=>x.id===artistId);
      if(!artist){toast('Artist not found','danger');return prev;}

      // Minimum fame check
      if(artist.fame<(tier.minFame||0)){
        toast(`${artist.name} needs ${tier.minFame} fame for this tour (has ${Math.round(artist.fame)})`,'danger');
        return prev;
      }

      // Tour cost scaled by difficulty
      const actualCost=Math.floor(tier.baseCost*(diff.tourCostMult||1));
      if(prev.cash<actualCost){toast(`Need ${fmtM(actualCost)} to book this tour!`,'danger');return prev;}

      // Revenue calculation — based on artist fame, not just formula
      // Artists with lower fame than ideal fill fewer seats
      const famePct=Math.min(1.0,artist.fame/(tier.minFame*1.3));
      const fillRate=0.55+famePct*0.45; // 55-100% capacity based on fame
      const grossRevenue=Math.floor(tier.venues*tier.capacity*tier.ticketPrice*fillRate*0.80);
      // Support costs per week
      const supportPerWeek=(tier.supportCost||0)*(diff.tourCostMult||1);
      const weeksOnTour=Math.ceil(tier.venues/3);
      const totalSupport=Math.floor(supportPerWeek*weeksOnTour);

      // Can actually lose money if artist isn't famous enough
      const netRevenue=grossRevenue-totalSupport;
      const weeklyNet=Math.floor(netRevenue/weeksOnTour);

      const tour={
        id:uuidv4(),artistId,artistName:artist.name,
        tier:tier.id,tierName:tier.name,
        weeksRemaining:weeksOnTour,
        weeklyRevenue:Math.max(-supportPerWeek,weeklyNet), // can go negative
        totalRevenue:netRevenue,
        grossRevenue,totalSupport,
        fillRate:Math.round(fillRate*100),
        cost:actualCost,
      };

      const profitable=netRevenue>0;
      toast(`${artist.name} ${tier.name} booked! Est. ${profitable?'+':''}${fmtM(netRevenue)} net (${Math.round(fillRate*100)}% fill rate)`,profitable?'success':'warn');

      return{
        ...prev,
        cash:prev.cash-actualCost,
        totalExpenses:prev.totalExpenses+actualCost,
        activeTours:[...prev.activeTours,tour],
        allTimeTours:(prev.allTimeTours||0)+1,
      };
    });
  },[toast]);

  // ─── MERCH ────────────────────────────────────
  const launchMerch=useCallback((artistId,line)=>{
    setGame(prev=>{
      if(prev.cash<line.cost){toast('Insufficient funds!','danger');return prev;}
      const a=prev.roster.find(x=>x.id===artistId);
      const merch={id:uuidv4(),artistId,artistName:a?.name||'?',line:line.name,weeklyRevenue:line.weeklyRevenue,cost:line.cost,week:prev.week};
      toast(`${line.name} launched for ${a?.name}!`,'success');
      return{...prev,cash:prev.cash-line.cost,totalExpenses:prev.totalExpenses+line.cost,activeMerch:[...prev.activeMerch,merch]};
    });
  },[toast]);

  // ─── SYNC DEAL ────────────────────────────────
  const acceptSyncDeal=useCallback((artistId,deal)=>{
    setGame(prev=>{
      const a=prev.roster.find(x=>x.id===artistId);
      if(!a) return prev;
      const entry={...deal,artistId,artistName:a.name,week:prev.week};
      toast(`Sync deal accepted! +${fmtM(deal.fee)}`,'success');
      return{
        ...prev,
        cash:prev.cash+deal.fee,
        totalRevenue:prev.totalRevenue+deal.fee,
        syncDeals:[...prev.syncDeals,entry],
        roster:prev.roster.map(x=>x.id===artistId?{...x,fame:cl(x.fame+deal.fameBonus,0,100)}:x),
        imageHealth:cl((prev.imageHealth||100)+2,0,100),
        socialFeed:[{id:uuidv4(),text:`📺 SYNC: ${a.name}'s music lands in ${deal.platform}! ${fmtM(deal.fee)} secured.`,week:prev.week,type:'deal',important:true},...prev.socialFeed].slice(0,MAX_FEED),
      };
    });
  },[toast]);

  // ─── HIRE STAFF ───────────────────────────────
  const hireStaff=useCallback((roleId)=>{
    setGame(prev=>{
      const role=STAFF_ROLES.find(r=>r.id===roleId);
      if(!role) return prev;
      const cur=prev.staff?.[roleId]||0;
      if(cur>=role.levels.length){toast('Already at max level!','warn');return prev;}
      const next=role.levels[cur];
      const cost=next.weeklyCost*4; // 4-week advance payment
      if(prev.cash<cost){toast(`Need ${fmtM(cost)} to hire!`,'danger');return prev;}
      toast(`${next.name} hired! — ${next.bonus}`,'success');
      return{...prev,cash:prev.cash-cost,staff:{...prev.staff,[roleId]:cur+1}};
    });
  },[toast]);

  // ─── TRAINING ─────────────────────────────────
  const startTraining=useCallback((artistId,prog)=>{
    setGame(prev=>{
      if(prev.cash<prog.cost){toast('Insufficient funds!','danger');return prev;}
      const a=prev.roster.find(x=>x.id===artistId);
      const session={id:uuidv4(),artistId,programId:prog.id,stat:prog.stat,gain:prog.gain,weeksLeft:prog.durationWeeks,name:prog.name};
      toast(`${a?.name} enrolled in ${prog.name}`,'info');
      return{...prev,cash:prev.cash-prog.cost,training:[...(prev.training||[]),session]};
    });
  },[toast]);

  // ─── TAKE LOAN ────────────────────────────────
  const takeLoan=useCallback((opt)=>{
    setGame(prev=>{
      if((prev.activeLoans||[]).find(l=>l.id===opt.id&&!l.paid)){toast('Already active!','warn');return prev;}
      const loan={...opt,takenWeek:prev.week,weeksLeft:opt.durationWeeks||0,paid:false,missedPayments:0};
      toast(`+${fmtM(opt.amount)} secured!`,'success');
      return{
        ...prev,
        cash:prev.cash+opt.amount,
        equityGiven:prev.equityGiven+(opt.equityStake||0),
        activeLoans:[...(prev.activeLoans||[]),loan],
        socialFeed:[{id:uuidv4(),text:`💰 ${prev.labelName} secures ${fmtM(opt.amount)} in new capital.`,week:prev.week,type:'deal',important:false},...prev.socialFeed].slice(0,MAX_FEED),
      };
    });
  },[toast]);

  // ─── DRAMA RESOLUTION ─────────────────────────
  const resolveDrama=useCallback((event,choiceIdx,artistId)=>{
    setGame(prev=>{
      const choice=event.choices?.[choiceIdx];
      if(!choice) return prev;
      const rawCost=choice.cost||0;
      const cashChange=rawCost<0?Math.abs(rawCost):-rawCost;
      if(rawCost>0&&prev.cash<rawCost){toast('Cannot afford this choice!','danger');return prev;}
      const prLv=prev.staff?.pr||0;
      const dmgMult=Math.max(0.05,1-prLv*0.095); // Level 10 = 5% damage
      const fameDelta=choice.fameDelta||0;
      const adjustedFame=fameDelta<0?Math.ceil(fameDelta*dmgMult):fameDelta;
      let roster=[...prev.roster];
      let releases=[...prev.releases];
      if(choice.dropsArtist){
        roster=roster.filter(a=>a.id!==artistId);
        toast('Artist dropped.','warn');
      }else{
        roster=roster.map(a=>{
          if(a.id!==artistId) return a;
          let u={...a,mood:cl(a.mood+(choice.moodDelta||0),0,100),fame:cl(a.fame+adjustedFame,0,100),loyalty:cl(a.loyalty+(choice.loyaltyDelta||0),0,100)};
          if(choice.burnoutRiskDelta) u={...u,burnoutRisk:cl((a.burnoutRisk||20)+choice.burnoutRiskDelta,0,100)};
          if(choice.renegotiate) u={...u,contract:{...a.contract,weeklyFee:Math.floor(a.contract.weeklyFee*(choice.renegotiateMultiplier||1))}};
          return u;
        });
        if(choice.streamBoost!==0){
          releases=releases.map(r=>{
            if(r.artistId!==artistId||!r.active) return r;
            return{...r,weeklyStreams:Math.max(0,Math.floor(r.weeklyStreams*(1+(choice.streamBoost||0)/100)))};
          });
        }
      }
      const isCrisis=event.type==='scandal'||event.type==='crisis';
      const imgHit=isCrisis?Math.ceil(-ri(5,14)*dmgMult):0;
      const imgGain=event.type==='award'||event.type==='collab'?ri(1,4):0;
      toast(`${choice.label} — handled.`,isCrisis?'warn':'success');
      return{
        ...prev,
        cash:prev.cash+cashChange,
        totalRevenue:rawCost<0?prev.totalRevenue+Math.abs(rawCost):prev.totalRevenue,
        totalExpenses:rawCost>0?prev.totalExpenses+rawCost:prev.totalExpenses,
        roster,releases,
        imageHealth:cl((prev.imageHealth||100)+imgHit+imgGain,0,100),
        pendingEvent:null,
      };
    });
    setPendingEvent(null);
  },[toast]);

  // ─── ADVANCE WEEK ─────────────────────────────
  const advanceWeek=useCallback(()=>{
    if(pendingEvent){toast('Resolve the active event first!','warn');return;}
    setGame(prev=>{
      if(!prev) return prev;
      const diff=prev.diff||DIFFICULTY.normal;
      let cash=prev.cash;
      let totalRevenue=prev.totalRevenue;
      let totalExpenses=prev.totalExpenses;
      let roster=[...prev.roster];
      let releases=[...prev.releases];
      let activeTours=[...prev.activeTours];
      let training=[...(prev.training||[])];
      let imageHealth=prev.imageHealth??100;
      let labelFame=prev.labelFame;
      let labelCulture=prev.labelCulture??50;
      const newFeed=[];

      // ── 1. GENRE TREND TICK ──────────────────
      let trendIdx=prev.currentTrendIdx||0;
      let trendLeft=prev.trendWeeksLeft||0;
      if(trendLeft<=0){
        trendIdx=(trendIdx+ri(1,3))%GENRE_TREND_CYCLES.length;
        trendLeft=ri(5,9);
        newFeed.push({id:uuidv4(),text:`📈 TREND SHIFT: ${GENRE_TREND_CYCLES[trendIdx].description}`,week:prev.week+1,type:'trend',important:true});
      }

      // ── 2. LABEL OVERHEAD (new!) ─────────────
      const overheadCost=getOverheadCost(prev.totalRevenue,diff);
      cash-=overheadCost;
      totalExpenses+=overheadCost;

      // ── 3. ARTIST FEES ───────────────────────
      let artistFees=0;
      roster=roster.map(a=>{
        artistFees+=a.contract.weeklyFee;
        return{...a,contract:{...a.contract,weeksRemaining:a.contract.weeksRemaining-1},weeksOnRoster:(a.weeksOnRoster||0)+1};
      });
      cash-=artistFees;
      totalExpenses+=artistFees;

      // ── 4. STAFF COSTS ───────────────────────
      let staffCosts=0;
      for(const[rid,lv] of Object.entries(prev.staff||{})){
        const role=STAFF_ROLES.find(r=>r.id===rid);
        if(role&&lv>0&&lv<=role.levels.length) staffCosts+=role.levels[lv-1].weeklyCost;
      }
      cash-=staffCosts;
      totalExpenses+=staffCosts;

      // ── 5. LOAN PAYMENTS ─────────────────────
      let loanPayments=0;
      const activeLoans=(prev.activeLoans||[]).map(loan=>{
        if(loan.type==='equity'||loan.paid||loan.weeksLeft<=0) return loan;
        if(cash>=loan.weeklyPayment){
          loanPayments+=loan.weeklyPayment;
          cash-=loan.weeklyPayment;
          totalExpenses+=loan.weeklyPayment;
          const left=loan.weeksLeft-1;
          return{...loan,weeksLeft:left,paid:left<=0,missedPayments:loan.missedPayments||0};
        }else{
          const missed=(loan.missedPayments||0)+1;
          newFeed.push({id:uuidv4(),text:`⚠️ MISSED LOAN PAYMENT on "${loan.name}". Penalty accumulating. Missed: ${missed}.`,week:prev.week+1,type:'warning',important:true});
          imageHealth=cl(imageHealth-6,0,100);
          // Private money lender takes an artist after 3 missed
          if(missed>=3&&loan.id==='shark'&&roster.length>0){
            const victim=roster.reduce((top,a)=>a.fame>(top?.fame||0)?a:top,null);
            if(victim){
              roster=roster.filter(a=>a.id!==victim.id);
              newFeed.push({id:uuidv4(),text:`🚨 PRIVATE MONEY COLLECTORS seize ${victim.name} as collateral. Your debt has consequences.`,week:prev.week+1,type:'crisis',important:true});
            }
          }
          return{...loan,missedPayments:missed};
        }
      });

      // ── 6. EQUITY DRAIN ──────────────────────
      const weekProfit=Math.max(0,totalRevenue-prev.totalRevenue);
      const equityDrain=Math.floor(weekProfit*(prev.equityGiven||0)*0.5);
      cash-=equityDrain;

      // ── 7. STREAMING REVENUE ─────────────────
      const mktLv=prev.staff?.marketing||0;
      const mktMult=[1,1.08,1.16,1.24,1.32,1.40,1.50,1.60,1.72,1.85,2.0][mktLv]||1;
      const trendGenre=GENRE_TREND_CYCLES[trendIdx]?.genre;
      let streamRevenue=0;

      releases=releases.map(r=>{
        if(!r.active) return r;
        const age=prev.week-r.week;
        const decay=Math.pow(r.hypeDecay||0.97,age);
        const tBonus=r.genre===trendGenre?(GENRE_TREND_CYCLES[trendIdx]?.mult||1):1;
        const noise=0.84+Math.random()*0.32;
        const ws=Math.floor(r.weeklyStreams*decay*tBonus*mktMult*noise);
        const rev=ws*(diff.streamRate||0.0022); // difficulty controls $/stream
        streamRevenue+=rev;
        const stillActive=ws>2000||age<6;
        return{...r,weeklyStreams:Math.max(0,ws),totalStreams:(r.totalStreams||0)+ws,revenue:(r.revenue||0)+rev,active:stillActive};
      });
      cash+=streamRevenue;
      totalRevenue+=streamRevenue;

      // ── 8. TOUR REVENUE ──────────────────────
      let tourRevenue=0;
      activeTours=activeTours.map(t=>{
        if(t.weeksRemaining<=0) return t;
        tourRevenue+=t.weeklyRevenue; // can be negative
        return{...t,weeksRemaining:t.weeksRemaining-1};
      }).filter(t=>t.weeksRemaining>0);
      cash+=tourRevenue;
      if(tourRevenue>0) totalRevenue+=tourRevenue;
      if(tourRevenue<0) totalExpenses+=Math.abs(tourRevenue);

      // ── 9. MERCH REVENUE ─────────────────────
      let merchRevenue=0;
      (prev.activeMerch||[]).forEach(m=>{merchRevenue+=m.weeklyRevenue;});
      cash+=merchRevenue;
      totalRevenue+=merchRevenue;

      // ── 10. TRAINING TICK ────────────────────
      training=training.map(t=>{
        const left=t.weeksLeft-1;
        if(left<=0){
          roster=roster.map(a=>{
            if(a.id!==t.artistId) return a;
            const cur=a[t.stat]??0;
            const nv=cl(cur+t.gain,0,100);
            newFeed.push({id:uuidv4(),text:`✅ ${a.name} completes ${t.name} — ${t.stat} improved!`,week:prev.week+1,type:'milestone',important:false});
            return{...a,[t.stat]:nv};
          });
          return{...t,weeksLeft:0,done:true};
        }
        return{...t,weeksLeft:left};
      }).filter(t=>!t.done);

      // ── 11. ARTIST LIFECYCLE ─────────────────
      roster=roster.map(a=>{
        let{fame,mood,loyalty,careerPhase,burnoutRisk}=a;
        mood=cl(mood+(75-mood)*0.04,20,100);
        const hasActive=releases.some(r=>r.artistId===a.id&&r.active&&r.weeklyStreams>40000);
        if(!hasActive) fame=cl(fame-0.10,0,100);
        if((burnoutRisk||0)>65&&Math.random()<0.06){
          newFeed.push({id:uuidv4(),text:`😮‍💨 ${a.name} is showing serious burnout signs. Intervene now.`,week:prev.week+1,type:'warning',important:true});
          mood=cl(mood-15,20,100);
        }
        if(mood<40) loyalty=cl(loyalty-1.5,10,100);
        if(fame>=80&&careerPhase==='rise') careerPhase='peak';
        if(fame<55&&careerPhase==='peak'&&Math.random()<0.025){
          careerPhase='decline';
          newFeed.push({id:uuidv4(),text:`📉 ${a.name} is entering career decline. A rebrand may help.`,week:prev.week+1,type:'warning',important:true});
        }
        if(careerPhase==='decline'&&Math.random()<0.025){
          careerPhase='comeback';
          newFeed.push({id:uuidv4(),text:`🦋 ${a.name} is staging a comeback.`,week:prev.week+1,type:'milestone',important:true});
        }
        if(loyalty<20&&Math.random()<0.05){
          newFeed.push({id:uuidv4(),text:`🚨 ${a.name}'s loyalty is critical — risk of walking when contract expires.`,week:prev.week+1,type:'warning',important:true});
        }
        return{...a,fame:cl(fame,0,100),mood:cl(mood,0,100),loyalty:cl(loyalty,0,100),careerPhase};
      });

      // ── 12. CONTRACT EXPIRY ──────────────────
      roster.forEach(a=>{
        if(a.contract.weeksRemaining===4) newFeed.push({id:uuidv4(),text:`⚠️ ${a.name}'s contract expires in 4 weeks.`,week:prev.week+1,type:'warning',important:true});
        if(a.contract.weeksRemaining<=0) newFeed.push({id:uuidv4(),text:`📋 ${a.name}'s contract expired — now a free agent.`,week:prev.week+1,type:'warning',important:true});
      });
      roster=roster.filter(a=>a.contract.weeksRemaining>0);

      // ── 13. RIVAL BEHAVIOR (real poaching) ────
      const rivalChance=0.12*(diff.rivalStrength||0.7);
      if(Math.random()<rivalChance){
        const rival=rf(prev.rivals);
        const available=REAL_ARTISTS.filter(a=>!roster.find(r=>r.id===a.id));
        if(available.length>0){
          const target=rf(available.slice(0,12));
          newFeed.push({id:uuidv4(),text:`🏴 ${rival.name} signs ${target.name} — that one was on your watchlist.`,week:prev.week+1,type:'rival',important:false});
        }
        // Rival tries to poach your artist if high loyalty gap
        const poachTarget=roster.find(a=>a.loyalty<50&&a.fame>70);
        if(poachTarget&&Math.random()<0.3){
          newFeed.push({id:uuidv4(),text:`🔥 INTEL: ${rival.name} is making an offer to ${poachTarget.name}. Loyalty is at ${Math.round(poachTarget.loyalty)}. Act fast.`,week:prev.week+1,type:'warning',important:true});
        }
      }

      // ── 14. IMAGE HEALTH ─────────────────────
      const avgControversy=roster.length?roster.reduce((s,a)=>s+(a.controversyLevel||0),0)/roster.length:0;
      if(Math.random()*100<avgControversy*0.10) imageHealth=cl(imageHealth-ri(2,7),0,100);
      imageHealth=cl(imageHealth+0.5,0,100);

      // ── 15. CHARTS UPDATE ────────────────────
      const prevCharts=prev.charts||[];
      let charts=CHART_SONGS.filter(s=>!s.isAlbum).slice(0,50).map((s,i)=>({
        ...s,streams:Math.floor(s.streams*(0.87+Math.random()*0.26)),
        rank:i+1,isYours:false,isAI:false,
        weeksOnChart:Math.min((s.weeksOnChart||1)+1,60),peakRank:s.peakRank||i+1,prevRank:i+1,movement:0,
      }));

      const yourActive=releases.filter(r=>r.active&&r.weeklyStreams>5000);
      yourActive.forEach(r=>{
        const prev_entry=prevCharts.find(c=>c.title===r.title);
        charts.push({
          title:r.title,artist:r.artistName,streams:r.weeklyStreams,
          rank:999,isYours:true,isAI:r.isAI||false,genre:r.genre,
          weeksOnChart:prev_entry?(prev_entry.weeksOnChart||0)+1:1,
          peakRank:999,prevRank:prev_entry?.rank||51,movement:0,
        });
      });

      charts=charts.sort((a,b)=>b.streams-a.streams).slice(0,50);
      charts=charts.map((s,i)=>{
        const rank=i+1;
        const prevEntry=prevCharts.find(c=>c.title===s.title);
        const prevRank=prevEntry?.rank||51;
        return{...s,rank,prevRank,movement:prevRank-rank,peakRank:Math.min(s.peakRank||rank,rank),weeksOnChart:s.weeksOnChart||1};
      });

      const albumCharts=(CHART_SONGS.filter(s=>s.isAlbum)).map((s,i)=>({...s,rank:i+1,isYours:false,weeksOnChart:ri(1,30),peakRank:i+1}));
      const yourCharts=charts.filter(c=>c.isYours);
      const bestRank=yourCharts.length?Math.min(...yourCharts.map(c=>c.rank)):999;
      const biggestJump=yourCharts.reduce((mx,c)=>Math.max(mx,c.movement||0),0);
      const chartRecords={
        longestNum1:Math.max(prev.chartRecords?.longestNum1||0,yourCharts.filter(c=>c.rank===1).reduce((s,c)=>s+(c.weeksOnChart||0),0)),
        biggestJump:Math.max(prev.chartRecords?.biggestJump||0,biggestJump),
        mostWeeks:  Math.max(prev.chartRecords?.mostWeeks||0,yourCharts.reduce((mx,c)=>Math.max(mx,c.weeksOnChart||0),0)),
      };

      // Near-miss engine
      if(bestRank===2){
        const miss=yourCharts.find(c=>c.rank===2);
        newFeed.push({id:uuidv4(),text:`😤 SO CLOSE — "${miss?.title||'Your track'}" peaked at #2. ${fmtM((charts[0]?.streams||0)-(miss?.streams||0))} streams from #1.`,week:prev.week+1,type:'nearMiss',important:true});
      }

      // ── 16. AWARD SHOWS ──────────────────────
      const nextMonth=(prev.month+(prev.week%4===3?1:0)-1)%12+1;
      AWARD_SHOWS.forEach(show=>{
        if(show.months.includes(nextMonth)){
          const eligible=roster.filter(a=>a.fame>=show.minFame);
          if(eligible.length>0){
            const nominee=rf(eligible);
            const wins=Math.random()<(nominee.fame/220);
            newFeed.push({id:uuidv4(),text:wins?`🏆 ${nominee.name} WINS at the ${show.name}! Historic night for ${prev.labelName}.`:`📢 ${nominee.name} nominated at the ${show.name}!`,week:prev.week+1,type:'award',important:true});
            if(wins){roster=roster.map(a=>a.id===nominee.id?{...a,fame:cl(a.fame+8,0,100)}:a);labelFame=cl(labelFame+5,0,100);}
          }
        }
      });

      // ── 17. PASSIVE NEWS ─────────────────────
      if(Math.random()<0.42&&roster.length>0){
        const a=rf(roster);
        const n=rf(NEWS_EVENTS);
        newFeed.push({id:uuidv4(),text:n.text.replace('[ARTIST]',a.name),week:prev.week+1,type:n.type,important:(n.fameBoost||0)>6});
        if(n.fameBoost) roster=roster.map(x=>x.id===a.id?{...x,fame:cl(x.fame+n.fameBoost*0.25,0,100)}:x);
        if(n.streamBoost) releases=releases.map(r=>r.artistId===a.id&&r.active?{...r,weeklyStreams:Math.floor(r.weeklyStreams*(1+n.streamBoost/100))}:r);
      }

      // ── 18. DRAMA EVENT ──────────────────────
      let newPendingEvent=null;
      const prLv=prev.staff?.pr||0;
      const eChance=(diff.eventFreq||0.3)-prLv*0.025; // PR level reduces event chance
      if(Math.random()<eChance&&roster.length>0){
        const a=rf(roster);
        const isHighDrama=a.controversyLevel>60||a.ego>80;
        const pool=DRAMA_EVENTS.filter(e=>{
          if(e.id==='burnout') return(a.burnoutRisk||0)>45;
          if(e.id==='demand_raise') return a.contract.weeksRemaining<20&&a.loyalty>55;
          if(e.id==='drug_problem') return(a.burnoutRisk||0)>55||(a.controversyLevel||0)>70;
          if(e.type==='internal') return a.loyalty<65;
          if(e.type==='crisis') return isHighDrama&&Math.random()<0.35;
          return true;
        });
        if(pool.length>0){
          const evt={...rf(pool),artistId:a.id,artistName:a.name};
          newPendingEvent=evt;
        }
      }

      // ── 19. MARKET REFRESH ───────────────────
      const shouldRefresh=prev.week%4===3||(prev.marketArtists||[]).length<4;
      let marketArtists=prev.marketArtists;
      if(shouldRefresh){
        marketArtists=buildMarket(roster.map(a=>a.id),prev.week,prev.staff?.anr||0);
        newFeed.push({id:uuidv4(),text:`🔄 Talent market refreshed — ${marketArtists.length} artists available.`,week:prev.week+1,type:'news',important:false});
      }

      // ── 20. WEEK TICK ────────────────────────
      let week=prev.week+1;
      let month=prev.month;
      let year=prev.year;
      if(week%4===1) month++;
      if(month>12){month=1;year++;}

      // ── 21. LABEL STATS ──────────────────────
      const netIncome=streamRevenue+tourRevenue+merchRevenue-artistFees-staffCosts-loanPayments-overheadCost;
      labelFame=cl(labelFame+(netIncome>0?0.08:-0.06),0,100);
      labelCulture=cl(labelCulture,0,100);

      // ── 22. WEEKLY REPORT ────────────────────
      const weeklyReport={
        week:prev.week,
        overheadCost:Math.floor(overheadCost),
        streamRevenue:Math.floor(streamRevenue),
        tourRevenue:Math.floor(tourRevenue),
        merchRevenue:Math.floor(merchRevenue),
        artistFees:Math.floor(artistFees),
        staffCosts:Math.floor(staffCosts),
        loanPayments:Math.floor(loanPayments),
        netIncome:Math.floor(netIncome),
        cashBalance:Math.floor(cash),
        topRelease:yourCharts.length?yourCharts.find(c=>c.rank===Math.min(...yourCharts.map(x=>x.rank))):null,
        bestChartPos:bestRank,
        trendGenre:GENRE_TREND_CYCLES[trendIdx]?.genre,
      };

      // ── 23. OBJECTIVES CHECK ─────────────────
      const nextState={
        ...prev,cash:Math.floor(cash),totalRevenue:Math.floor(totalRevenue),
        totalExpenses:Math.floor(totalExpenses),labelFame,imageHealth,labelCulture,
        week,month,year,roster,releases,activeTours,activeMerch:prev.activeMerch,
        activeLoans,training,charts,albumCharts,chartRecords,
        currentTrendIdx:trendIdx,trendWeeksLeft:trendLeft-1,
        marketArtists,weeklyReport,rivals:prev.rivals,rivalBeaten:prev.rivalBeaten||0,
        diff:prev.diff,
      };

      const earned=checkObjectives(nextState,prev.objectives||[]);
      let bonusCash=0;
      const objFeed=earned.map(obj=>{
        bonusCash+=obj.reward;
        return{id:uuidv4(),text:`🎯 OBJECTIVE COMPLETE: "${obj.title}" — +${fmtM(obj.reward)} bonus!`,week,type:'milestone',important:true};
      });

      const combinedFeed=[...newFeed,...objFeed,...prev.socialFeed].slice(0,MAX_FEED);
      const finalState={
        ...nextState,
        cash:Math.floor(cash+bonusCash),
        totalRevenue:Math.floor(totalRevenue+bonusCash),
        objectives:[...(prev.objectives||[]),...earned.map(o=>o.id)],
        socialFeed:combinedFeed,weeklyReport,
      };

      if(newPendingEvent) setTimeout(()=>setPendingEvent(newPendingEvent),150);
      setTimeout(()=>setWeekSummary(weeklyReport),200);
      return finalState;
    });
  },[pendingEvent,toast]);

  const manualSave=useCallback(()=>{
    setGame(prev=>{
      if(!prev||!careerId) return prev;
      saveCareer({id:careerId,name:prev.labelName,state:prev,savedAt:Date.now()});
      toast('Game saved!','success',2000);
      return prev;
    });
  },[careerId,saveCareer,toast]);

  const dismissSummary=useCallback(()=>setWeekSummary(null),[]);

  const getLabelTier=()=>{
    if(!game) return LABEL_TIERS[0];
    return LABEL_TIERS.find(t=>t.idx===getTierIdx(game.totalRevenue))||LABEL_TIERS[0];
  };

  return{
    game,loading,toasts,pendingEvent,weekSummary,
    initGame,manualSave,
    signArtist,dropArtist,releaseMusic,
    bookTour,launchMerch,acceptSyncDeal,
    hireStaff,startTraining,takeLoan,
    resolveDrama,advanceWeek,dismissSummary,
    getLabelTier,fmtM,
  };
}
