import React, { useState } from 'react';
import { IconPlus, IconX, IconZap, IconInfo } from '../components/Icons';
import {
  DEAL_TYPES, ALBUM_OBLIGATIONS, ADVANCE_OPTIONS,
  REVENUE_SPLITS, DIFFICULTY,
} from '../data/gameData';

function fmtM(n) {
  if (!n && n !== 0) return '$0';
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}

const CONTRACT_LENGTHS = [
  { weeks: 26,  label: '6 Mo',  moodMult: 1.05  },
  { weeks: 52,  label: '1 Yr',  moodMult: 1.0   },
  { weeks: 104, label: '2 Yrs', moodMult: 0.95  },
  { weeks: 208, label: '4 Yrs', moodMult: 0.88  },
  { weeks: 312, label: '6 Yrs', moodMult: 0.80  },
];

const TIER_COLORS = { S:'#f1c40f', A:'#2ecc71', B:'#3498db', C:'#95a5a6', D:'#7f8c8d' };
const TIER_LABELS = { S:'S-Tier Superstar', A:'A-List', B:'Established', C:'Rising', D:'Emerging' };

export default function Market({ game, signArtist }) {
  const [selected, setSelected]     = useState(null);
  const [step,     setStep]         = useState(1); // 1=browse, 2=negotiate
  const [filter,   setFilter]       = useState('all');
  const [search,   setSearch]       = useState('');

  // Contract negotiation state
  const [terms, setTerms] = useState({
    dealTypeId:       'standard',
    albumObligationId:'1album',
    advanceId:        'no_advance',
    revenueSplitId:   '50_50',
    contractWeeks:    52,
  });

  const market   = game.marketArtists || [];
  const anrLevel = game.staff?.anr || 0;
  const diff     = game.diff || DIFFICULTY.normal;

  const genres = ['all','Real','AI',...new Set(market.map(a=>a.genre))].filter((v,i,a)=>a.indexOf(v)===i);

  const filtered = market.filter(a => {
    if (filter === 'Real') return a.isReal;
    if (filter === 'AI')   return !a.isReal;
    if (filter !== 'all' && a.genre !== filter) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.genre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const isLocked = (a) => {
    if (a.tier === 'S' && anrLevel < 7) return `A&R Level 7 required (you have ${anrLevel})`;
    if (a.tier === 'A' && anrLevel < 2) return `A&R Level 2 required (you have ${anrLevel})`;
    return null;
  };

  const canAfford = (a) => {
    const advance = ADVANCE_OPTIONS.find(x=>x.id===terms.advanceId)?.amount||0;
    return game.cash >= (a.signingBonus + advance);
  };

  // Calculate totals for selected artist
  const calcTotals = (artist) => {
    if (!artist) return {};
    const dealType     = DEAL_TYPES.find(d=>d.id===terms.dealTypeId)||DEAL_TYPES[1];
    const advance      = ADVANCE_OPTIONS.find(x=>x.id===terms.advanceId)||ADVANCE_OPTIONS[0];
    const albumOb      = ALBUM_OBLIGATIONS.find(x=>x.id===terms.albumObligationId)||ALBUM_OBLIGATIONS[0];
    const revSplit     = REVENUE_SPLITS.find(x=>x.id===terms.revenueSplitId)||REVENUE_SPLITS[1];
    const contractLen  = CONTRACT_LENGTHS.find(x=>x.weeks===terms.contractWeeks)||CONTRACT_LENGTHS[1];
    const weeklyFee    = Math.floor(artist.weeklyFee * (diff.artistFeeMult||1));
    const totalUpfront = artist.signingBonus + advance.amount;
    const totalFees    = weeklyFee * terms.contractWeeks;

    // Mood/loyalty impact from terms
    const moodImpact = (dealType.moodImpact||0) + (advance.amount>500000?12:advance.amount>0?5:0) + (contractLen.moodMult<1?-8:0);
    const loyaltyImpact = (dealType.loyaltyImpact||0) + (advance.amount>500000?18:advance.amount>0?8:0);

    return { dealType, advance, albumOb, revSplit, contractLen, weeklyFee, totalUpfront, totalFees, moodImpact, loyaltyImpact };
  };

  const openNegotiate = (artist) => {
    setSelected(artist);
    setStep(2);
    setTerms({ dealTypeId:'standard', albumObligationId:'1album', advanceId:'no_advance', revenueSplitId:'50_50', contractWeeks:52 });
  };

  const handleSign = () => {
    if (!selected) return;
    const lockMsg = isLocked(selected);
    if (lockMsg) return;
    const t = calcTotals(selected);
    if (!canAfford(selected)) return;

    const advance = ADVANCE_OPTIONS.find(x=>x.id===terms.advanceId);
    const albumOb = ALBUM_OBLIGATIONS.find(x=>x.id===terms.albumObligationId);

    signArtist(selected.id, {
      dealType:       terms.dealTypeId,
      royaltySplit:   DEAL_TYPES.find(d=>d.id===terms.dealTypeId)?.royaltyRate||0.20,
      revenueSplit:   terms.revenueSplitId,
      albumObligation:albumOb?.albums||0,
      advance:        advance?.amount||0,
      contractWeeks:  terms.contractWeeks,
    });
    setSelected(null);
    setStep(1);
  };

  const t = selected ? calcTotals(selected) : {};

  // ─── STEP 1: BROWSE ───────────────────────────
  if (step === 1) return (
    <div className="page">
      <div style={{ marginBottom:14 }}>
        <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:20 }}>Talent Market</h2>
        <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>
          {market.length} available · {market.filter(a=>!a.isReal).length} AI artists
          {anrLevel < 2 && <span style={{ color:'#f39c12', marginLeft:8 }}>· Hire A&R for A/S-tier artists</span>}
        </p>
      </div>

      <div style={{ marginBottom:10 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search artists, genres..." style={{ fontSize:14 }} />
      </div>

      <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4, marginBottom:14 }}>
        {genres.map(g=>(
          <button key={g} onClick={()=>setFilter(g)} style={{ padding:'5px 12px', borderRadius:20, fontSize:10, whiteSpace:'nowrap', fontFamily:'var(--font-display)', letterSpacing:'0.06em', border:filter===g?'1px solid var(--gold)':'1px solid var(--border)', background:filter===g?'rgba(201,168,76,0.12)':'transparent', color:filter===g?'var(--gold)':'var(--text-muted)', cursor:'pointer', minHeight:34 }}>
            {g}
          </button>
        ))}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.map(artist => {
          const lockMsg = isLocked(artist);
          const affordable = game.cash >= artist.signingBonus;
          return (
            <div key={artist.id} className="artist-card" style={{ opacity:lockMsg?0.5:affordable?1:0.65 }} onClick={()=>!lockMsg&&openNegotiate(artist)}>
              <div className="artist-avatar">{artist.name.charAt(0)}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2 }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:15 }}>{artist.name}</span>
                      {!artist.isReal && <span style={{ fontSize:8, padding:'1px 5px', background:'rgba(155,89,182,0.15)', border:'1px solid rgba(155,89,182,0.4)', borderRadius:2, color:'#9b59b6', fontFamily:'var(--font-display)' }}>AI</span>}
                      {artist.tier && <span style={{ fontSize:8, padding:'1px 5px', background:`${TIER_COLORS[artist.tier]||'#888'}20`, border:`1px solid ${TIER_COLORS[artist.tier]||'#888'}40`, borderRadius:2, color:TIER_COLORS[artist.tier]||'#888', fontFamily:'var(--font-display)' }}>{artist.tier}</span>}
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>
                      {artist.genre} · {artist.region}
                      {artist.currentLabel && artist.isReal && <span> · {artist.currentLabel}</span>}
                    </div>
                  </div>
                  <div className={`badge ${lockMsg?'badge-muted':affordable?'badge-gold':'badge-danger'}`}>
                    {lockMsg ? '🔒 Locked' : fmtM(artist.signingBonus)}
                  </div>
                </div>
                <div style={{ display:'flex', gap:10, marginTop:5 }}>
                  <span style={{ fontSize:11, color:'var(--gold)' }}>★ {artist.fame}</span>
                  <span style={{ fontSize:11, color:'var(--text-muted)' }}>Talent {artist.talent}</span>
                  <span style={{ fontSize:11, color:'var(--text-muted)' }}>{fmtM(artist.weeklyFee)}/wk</span>
                  {!artist.isReal && (artist.viralProbability||0)>55 && <span style={{ fontSize:11, color:'#f39c12' }}><IconZap size={10} color="#f39c12" /> Viral</span>}
                </div>
                {lockMsg && <div style={{ fontSize:10, color:'#e74c3c', marginTop:4 }}>🔒 {lockMsg}</div>}
              </div>
            </div>
          );
        })}
        {filtered.length===0 && <div style={{ textAlign:'center', padding:'40px 0', color:'var(--text-muted)' }}><p>No artists match. Advance a week to refresh.</p></div>}
      </div>
    </div>
  );

  // ─── STEP 2: CONTRACT NEGOTIATION ─────────────
  return (
    <div className="page">
      {/* Back button + artist header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={()=>{setStep(1);setSelected(null);}} className="btn btn-outline btn-sm" style={{ flexShrink:0 }}>← Back</button>
        <div className="artist-avatar" style={{ width:44, height:44, fontSize:18, flexShrink:0 }}>{selected?.name.charAt(0)}</div>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:18 }}>{selected?.name}</h2>
            {selected && !selected.isReal && <span style={{ fontSize:9, padding:'1px 6px', background:'rgba(155,89,182,0.15)', border:'1px solid rgba(155,89,182,0.4)', borderRadius:2, color:'#9b59b6', fontFamily:'var(--font-display)' }}>AI</span>}
          </div>
          <p style={{ fontSize:12, color:'var(--text-muted)' }}>{selected?.genre} · {selected?.region} · Fame {selected?.fame}</p>
        </div>
      </div>

      {/* Artist stats mini */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6, marginBottom:18 }}>
        {[{val:selected?.fame,lbl:'Fame'},{val:selected?.talent,lbl:'Talent'},{val:selected?.workEthic,lbl:'Ethic'},{val:selected?.loyalty,lbl:'Loyalty'}].map(s=>(
          <div key={s.lbl} className="stat-cell" style={{ padding:'8px 4px' }}>
            <div className="val" style={{ fontSize:18 }}>{s.val}</div>
            <div className="lbl" style={{ fontSize:9 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="ornament"><span className="ornament-text">Contract Negotiation</span></div>

      {/* 1. DEAL TYPE */}
      <div className="form-group" style={{ marginTop:14 }}>
        <label>Deal Structure</label>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {DEAL_TYPES.map(d => (
            <div key={d.id} onClick={()=>setTerms(t=>({...t,dealTypeId:d.id}))} style={{ padding:'10px 14px', borderRadius:'var(--radius)', border:terms.dealTypeId===d.id?'1px solid var(--gold)':'1px solid var(--border)', background:terms.dealTypeId===d.id?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer', transition:'all 0.15s' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:terms.dealTypeId===d.id?'var(--gold)':'var(--text)' }}>{d.label}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gold-dim)' }}>{Math.round((d.royaltyRate||0)*100)}% royalty</span>
              </div>
              <div style={{ fontSize:12, color:'var(--text-muted)' }}>{d.desc}</div>
              <div style={{ fontSize:11, marginTop:3, display:'flex', gap:10 }}>
                <span style={{ color:(d.moodImpact||0)>=0?'#2ecc71':'#e74c3c' }}>Mood: {(d.moodImpact||0)>=0?'+':''}{d.moodImpact}</span>
                <span style={{ color:(d.loyaltyImpact||0)>=0?'#2ecc71':'#e74c3c' }}>Loyalty: {(d.loyaltyImpact||0)>=0?'+':''}{d.loyaltyImpact||0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ALBUM OBLIGATION */}
      <div className="form-group">
        <label>Album Delivery Obligation</label>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {ALBUM_OBLIGATIONS.map(ob => (
            <div key={ob.id} onClick={()=>setTerms(t=>({...t,albumObligationId:ob.id}))} style={{ flex:'1 1 45%', padding:'8px 10px', borderRadius:'var(--radius)', border:terms.albumObligationId===ob.id?'1px solid var(--gold)':'1px solid var(--border)', background:terms.albumObligationId===ob.id?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer', minHeight:44 }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:12, color:terms.albumObligationId===ob.id?'var(--gold)':'var(--text)', marginBottom:2 }}>{ob.label}</div>
              <div style={{ fontSize:10, color:'var(--text-muted)' }}>{ob.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ADVANCE */}
      <div className="form-group">
        <label>Signing Advance (on top of bonus)</label>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {ADVANCE_OPTIONS.map(adv => (
            <div key={adv.id} onClick={()=>setTerms(t=>({...t,advanceId:adv.id}))} style={{ padding:'8px 12px', borderRadius:'var(--radius)', border:terms.advanceId===adv.id?'1px solid var(--gold)':'1px solid var(--border)', background:terms.advanceId===adv.id?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:12, color:terms.advanceId===adv.id?'var(--gold)':'var(--text)' }}>{adv.label}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{adv.desc}</div>
              </div>
              {adv.amount > 0 && <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'#e74c3c', flexShrink:0, marginLeft:8 }}>{fmtM(adv.amount)}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. REVENUE SPLIT */}
      <div className="form-group">
        <label>Revenue Split (Label / Artist)</label>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {REVENUE_SPLITS.map(rs => (
            <div key={rs.id} onClick={()=>setTerms(t=>({...t,revenueSplitId:rs.id}))} style={{ padding:'8px 12px', borderRadius:'var(--radius)', border:terms.revenueSplitId===rs.id?'1px solid var(--gold)':'1px solid var(--border)', background:terms.revenueSplitId===rs.id?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:12, color:terms.revenueSplitId===rs.id?'var(--gold)':'var(--text)' }}>{rs.label}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{rs.desc}</div>
              </div>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:rs.labelPct>=0.5?'var(--gold-dim)':'#2ecc71', flexShrink:0, marginLeft:8 }}>
                {Math.round(rs.labelPct*100)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CONTRACT LENGTH */}
      <div className="form-group">
        <label>Contract Length</label>
        <div style={{ display:'flex', gap:6 }}>
          {CONTRACT_LENGTHS.map(c => (
            <button key={c.weeks} onClick={()=>setTerms(t=>({...t,contractWeeks:c.weeks}))} style={{ flex:1, padding:'8px 2px', borderRadius:'var(--radius)', border:terms.contractWeeks===c.weeks?'1px solid var(--gold)':'1px solid var(--border)', background:terms.contractWeeks===c.weeks?'var(--gold-glow)':'var(--bg-2)', color:terms.contractWeeks===c.weeks?'var(--gold)':'var(--text-muted)', fontSize:10, fontFamily:'var(--font-display)', cursor:'pointer', minHeight:40 }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* COST SUMMARY */}
      {selected && (
        <div style={{ background:'var(--bg-3)', border:'1px solid var(--border-2)', borderRadius:'var(--radius-lg)', padding:'14px 16px', marginBottom:16 }}>
          <div style={{ fontSize:10, fontFamily:'var(--font-display)', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold-dim)', marginBottom:10 }}>Contract Summary</div>
          {[
            { label:'Signing Bonus',     val:selected.signingBonus,         color:'#e74c3c', prefix:'-' },
            { label:'Advance Payment',   val:t.advance?.amount||0,          color:'#e74c3c', prefix:'-', skip:!t.advance?.amount },
            { label:'Weekly Fee',        val:t.weeklyFee,                   color:'#e74c3c', suffix:'/wk' },
            { label:'Contract Duration', val:`${terms.contractWeeks} weeks`,color:'var(--text-dim)', noFmt:true },
            { label:'Album Obligation',  val:t.albumOb?.label,              color:'var(--text-dim)', noFmt:true },
            { label:'Revenue Split',     val:`${Math.round((t.revSplit?.labelPct||0.5)*100)}% to label`, color:'var(--gold)', noFmt:true },
            { label:'Artist Mood Impact',val:`${t.moodImpact>=0?'+':''}${t.moodImpact}`, color:t.moodImpact>=0?'#2ecc71':'#e74c3c', noFmt:true },
            { label:'Loyalty Impact',    val:`${(t.loyaltyImpact||0)>=0?'+':''}${t.loyaltyImpact||0}`, color:(t.loyaltyImpact||0)>=0?'#2ecc71':'#e74c3c', noFmt:true },
          ].filter(r=>!r.skip).map(row=>(
            <div key={row.label} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize:13, color:'var(--text-dim)' }}>{row.label}</span>
              <span style={{ fontFamily:row.noFmt?'var(--font-body)':'var(--font-mono)', fontSize:13, color:row.color }}>
                {row.noFmt ? row.val : `${row.prefix||''}${fmtM(row.val)}${row.suffix||''}`}
              </span>
            </div>
          ))}
          <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid var(--border-2)' }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontSize:14, fontFamily:'var(--font-display)', color:'var(--text)' }}>Total Upfront</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'#e74c3c' }}>{fmtM(t.totalUpfront)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
              <span style={{ fontSize:13, color:'var(--text-muted)' }}>Your Cash</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:canAfford(selected)?'#2ecc71':'#e74c3c' }}>{fmtM(game.cash)}</span>
            </div>
          </div>
        </div>
      )}

      {selected && !canAfford(selected) && (
        <div style={{ color:'#e74c3c', fontSize:13, textAlign:'center', marginBottom:12 }}>
          ⚠️ Insufficient funds. Reduce advance or wait to sign.
        </div>
      )}

      <button className="btn btn-gold btn-lg w-full" onClick={handleSign} disabled={!selected||!canAfford(selected)} style={{ opacity:selected&&canAfford(selected)?1:0.5 }}>
        <IconPlus size={18} /> Sign {selected?.name} — {fmtM(t.totalUpfront)}
      </button>
    </div>
  );
}
