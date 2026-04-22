import React, { useState } from 'react';
import { IconPlus, IconX, IconInfo, IconZap } from '../components/Icons';

function fmtM(n) {
  if(!n) return '$0';
  if(n>=1e6) return `$${(n/1e6).toFixed(2)}M`;
  if(n>=1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${n}`;
}

const DEAL_TYPES = [
  { id:'360',          label:'360 Deal',           royalty:0.15, desc:'Label takes 15% of ALL revenue',              moodImpact:-12 },
  { id:'standard',     label:'Standard Record Deal',royalty:0.20, desc:'20% royalty — standard album commitment',    moodImpact:0   },
  { id:'distribution', label:'Distribution Only',   royalty:0.30, desc:'30% cut — artist keeps creative control',   moodImpact:12  },
  { id:'joint',        label:'Joint Venture',       royalty:0.50, desc:'50/50 split — full creative partnership',   moodImpact:6   },
];

const CONTRACT_LENGTHS = [
  { weeks:26, label:'6 Mo' },
  { weeks:52, label:'1 Yr' },
  { weeks:104,label:'2 Yrs'},
  { weeks:208,label:'4 Yrs'},
];

const TIER_LABELS = { S:'S-Tier', A:'A-Tier', B:'B-Tier', C:'C-Tier', D:'D-Tier' };
const TIER_COLORS = { S:'#f1c40f', A:'#2ecc71', B:'#3498db', C:'#95a5a6', D:'#7f8c8d' };

export default function Market({ game, signArtist }) {
  const [selected, setSelected] = useState(null);
  const [deal, setDeal] = useState('standard');
  const [contractLen, setContractLen] = useState(52);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const market = game.marketArtists || [];
  const anrLevel = game.staff?.anr || 0;

  const genres = ['all','Real','AI',...new Set(market.map(a=>a.genre))].filter((v,i,a)=>a.indexOf(v)===i);

  const filtered = market.filter(a=>{
    if(filter==='Real') return a.isReal;
    if(filter==='AI')   return !a.isReal;
    if(filter!=='all'&&a.genre!==filter) return false;
    if(search&&!a.name.toLowerCase().includes(search.toLowerCase())&&!a.genre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const canAfford = (a) => game.cash >= a.signingBonus;

  // S-tier locked without A&R level 2+
  const isLocked = (a) => a.tier==='S' && anrLevel < 2;

  const handleSign = () => {
    if(!selected||isLocked(selected)) return;
    const dt = DEAL_TYPES.find(d=>d.id===deal);
    signArtist(selected.id, dt.label, dt.royalty, contractLen);
    setSelected(null);
  };

  return (
    <div className="page">
      <div style={{ marginBottom:14 }}>
        <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:20 }}>Talent Market</h2>
        <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>
          {market.length} available · {market.filter(a=>!a.isReal).length} AI artists · Refreshes every 4 weeks
        </p>
        {anrLevel===0&&<p style={{ fontSize:11, color:'#f39c12', marginTop:4 }}>⚠️ Hire A&R (Ops tab) to unlock S-Tier superstars</p>}
      </div>

      {/* Search */}
      <div style={{ marginBottom:10 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search artists, genres..." style={{ fontSize:14 }} />
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4, marginBottom:14 }}>
        {genres.map(g=>(
          <button key={g} onClick={()=>setFilter(g)} style={{ padding:'5px 12px', borderRadius:20, fontSize:10, whiteSpace:'nowrap', fontFamily:'var(--font-display)', letterSpacing:'0.06em', border:filter===g?'1px solid var(--gold)':'1px solid var(--border)', background:filter===g?'rgba(201,168,76,0.12)':'transparent', color:filter===g?'var(--gold)':'var(--text-muted)', cursor:'pointer', minHeight:34 }}>
            {g}
          </button>
        ))}
      </div>

      {/* Artist list */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.map(artist=>{
          const affordable = canAfford(artist);
          const locked = isLocked(artist);
          return (
            <div key={artist.id} className="artist-card" style={{ opacity:locked?0.5:affordable?1:0.6 }} onClick={()=>!locked&&setSelected(artist)}>
              <div className="artist-avatar">{artist.name.charAt(0)}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:2 }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:15 }}>{artist.name}</span>
                      {!artist.isReal&&<span style={{ fontSize:8, padding:'1px 5px', background:'rgba(155,89,182,0.15)', border:'1px solid rgba(155,89,182,0.4)', borderRadius:2, color:'#9b59b6', fontFamily:'var(--font-display)' }}>AI</span>}
                      {artist.tier&&<span style={{ fontSize:8, padding:'1px 5px', background:`${TIER_COLORS[artist.tier]||'#888'}20`, border:`1px solid ${TIER_COLORS[artist.tier]||'#888'}40`, borderRadius:2, color:TIER_COLORS[artist.tier]||'#888', fontFamily:'var(--font-display)' }}>{TIER_LABELS[artist.tier]||artist.tier}</span>}
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>
                      {artist.genre} · {artist.region}
                      {artist.currentLabel&&artist.isReal&&<span style={{ color:'var(--text-muted)' }}> · {artist.currentLabel}</span>}
                    </div>
                  </div>
                  <div className={`badge ${locked?'badge-muted':affordable?'badge-gold':'badge-danger'}`}>
                    {locked?'🔒 A&R Req.':fmtM(artist.signingBonus)}
                  </div>
                </div>
                <div style={{ display:'flex', gap:12, marginTop:5 }}>
                  <span style={{ fontSize:11, color:'var(--gold)' }}>★ {artist.fame}</span>
                  <span style={{ fontSize:11, color:'var(--text-muted)' }}>Talent {artist.talent}</span>
                  <span style={{ fontSize:11, color:'var(--text-muted)' }}>{fmtM(artist.weeklyFee)}/wk</span>
                  {!artist.isReal&&(artist.viralProbability||0)>55&&<span style={{ fontSize:11, color:'#f39c12', display:'flex', alignItems:'center', gap:2 }}><IconZap size={10} color="#f39c12" />Viral</span>}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length===0&&<div style={{ textAlign:'center', padding:'40px 0', color:'var(--text-muted)' }}><p>No artists match. Try a different filter or advance a week.</p></div>}
      </div>

      {/* Sign Modal */}
      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div className="artist-avatar" style={{ width:46, height:46, fontSize:18 }}>{selected.name.charAt(0)}</div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <h3 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:17 }}>{selected.name}</h3>
                    {!selected.isReal&&<span style={{ fontSize:8, padding:'1px 5px', background:'rgba(155,89,182,0.15)', border:'1px solid rgba(155,89,182,0.4)', borderRadius:2, color:'#9b59b6', fontFamily:'var(--font-display)' }}>AI</span>}
                  </div>
                  <p style={{ fontSize:12, color:'var(--text-muted)' }}>{selected.genre} · {selected.region}</p>
                  {selected.currentLabel&&selected.isReal&&<p style={{ fontSize:11, color:'var(--text-muted)' }}>Currently: {selected.currentLabel}</p>}
                </div>
              </div>
              <button onClick={()=>setSelected(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            <div className="stat-grid-3 mb-12">
              <div className="stat-cell"><div className="val">{selected.fame}</div><div className="lbl">Fame</div></div>
              <div className="stat-cell"><div className="val">{selected.talent}</div><div className="lbl">Talent</div></div>
              <div className="stat-cell"><div className="val">{selected.mood||75}</div><div className="lbl">Mood</div></div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:14 }}>
              {[
                { label:'Work Ethic',  val:selected.workEthic||'?'          },
                { label:'Creativity',  val:selected.creativity||'?'         },
                { label:'Loyalty',     val:selected.loyalty||'?'            },
                { label:'Ego',         val:selected.ego||'?'                },
                { label:'Controversy', val:selected.controversyLevel||'?'   },
                { label:'Phase',       val:selected.careerPhase||'rise'     },
              ].map(s=>(
                <div key={s.label} style={{ display:'flex', justifyContent:'space-between', padding:'5px 10px', background:'var(--bg-3)', borderRadius:'var(--radius)', border:'1px solid var(--border)' }}>
                  <span style={{ fontSize:11, color:'var(--text-muted)' }}>{s.label}</span>
                  <span style={{ fontSize:11, fontFamily:'var(--font-mono)', color:'var(--text)' }}>{s.val}</span>
                </div>
              ))}
            </div>

            {!selected.isReal && (
              <div style={{ padding:'8px 12px', background:'rgba(155,89,182,0.08)', border:'1px solid rgba(155,89,182,0.2)', borderRadius:'var(--radius)', marginBottom:14, fontSize:12, color:'rgba(155,89,182,0.85)' }}>
                🤖 AI-generated artist. Hidden stats: star potential, viral probability, and burnout risk reveal over time.
              </div>
            )}

            <div className="form-group">
              <label>Deal Type</label>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {DEAL_TYPES.map(d=>(
                  <div key={d.id} onClick={()=>setDeal(d.id)} style={{ padding:'10px 14px', borderRadius:'var(--radius)', border:deal===d.id?'1px solid var(--gold)':'1px solid var(--border)', background:deal===d.id?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer', transition:'all 0.15s' }}>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:deal===d.id?'var(--gold)':'var(--text)' }}>{d.label}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gold-dim)' }}>{Math.round(d.royalty*100)}%</span>
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{d.desc}</div>
                    <div style={{ fontSize:11, color:d.moodImpact>=0?'#2ecc71':'#e74c3c', marginTop:2 }}>Mood: {d.moodImpact>=0?'+':''}{d.moodImpact}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Contract Length</label>
              <div style={{ display:'flex', gap:8 }}>
                {CONTRACT_LENGTHS.map(c=>(
                  <button key={c.weeks} onClick={()=>setContractLen(c.weeks)} style={{ flex:1, padding:'8px 2px', borderRadius:'var(--radius)', border:contractLen===c.weeks?'1px solid var(--gold)':'1px solid var(--border)', background:contractLen===c.weeks?'var(--gold-glow)':'var(--bg-2)', color:contractLen===c.weeks?'var(--gold)':'var(--text-muted)', fontSize:10, fontFamily:'var(--font-display)', cursor:'pointer', minHeight:40 }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background:'var(--bg-3)', borderRadius:'var(--radius)', padding:'12px 14px', marginBottom:16, border:'1px solid var(--border)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, color:'var(--text-dim)' }}>Signing Bonus</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#e74c3c' }}>{fmtM(selected.signingBonus)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, color:'var(--text-dim)' }}>Weekly Fee</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#e74c3c' }}>{fmtM(selected.weeklyFee)}/wk</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ fontSize:13, color:'var(--text-dim)' }}>Your Cash</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:canAfford(selected)?'#2ecc71':'#e74c3c' }}>{fmtM(game.cash)}</span>
              </div>
            </div>

            {!canAfford(selected)&&<div style={{ color:'#e74c3c', fontSize:13, textAlign:'center', marginBottom:12 }}>⚠️ Insufficient funds</div>}

            <button className="btn btn-gold btn-lg w-full" onClick={handleSign} disabled={!canAfford(selected)} style={{ opacity:canAfford(selected)?1:0.5 }}>
              <IconPlus size={18} />Sign {selected.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
