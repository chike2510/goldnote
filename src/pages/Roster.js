import React, { useState } from 'react';
import { IconX, IconMusic, IconMap, IconShirt, IconTrash, IconMic, IconClock } from '../components/Icons';
import { PRODUCERS, TOUR_TIERS, MERCH_LINES, ROLLOUT_STRATEGIES, PLATFORM_STRATEGIES, REAL_ARTISTS } from '../data/gameData';

function fmtM(n) {
  if (!n && n !== 0) return '$0';
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n)}`;
}
function moodColor(m) { return m >= 75 ? '#2ecc71' : m >= 50 ? '#f39c12' : '#e74c3c'; }
function phaseColor(p) {
  if (p === 'peak')    return 'var(--gold)';
  if (p === 'rise')    return '#2ecc71';
  if (p === 'comeback')return '#9b59b6';
  if (p === 'decline') return '#e74c3c';
  return 'var(--text-muted)';
}

// NPC artists available for collabs
const NPC_COLLABS = REAL_ARTISTS.map(a => ({
  id: a.id, name: a.name, genre: a.genre, fame: a.fame,
  collab_fee: Math.floor((a.signingBonus||0)*0.025 + (a.weeklyFee||0)*1.5),
})).sort((a,b) => b.fame - a.fame);

const PRODUCER_TIERS = ['legend','elite','premium','mid','budget'];

function StatBar({ label, val, color = 'var(--gold)' }) {
  return (
    <div style={{ marginBottom:5 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
        <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{label}</span>
        <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color }}>{val}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width:`${Math.max(0,Math.min(100,val))}%`, background:`linear-gradient(90deg,${color}80,${color})` }} />
      </div>
    </div>
  );
}

export default function Roster({ game, releaseMusic, bookTour, launchMerch, dropArtist }) {
  const [selected, setSelected] = useState(null);
  const [modal, setModal]       = useState(null);
  const [producerTierFilter, setProducerTierFilter] = useState('all');

  const [rf, setRf] = useState({
    type:'single', producerId:'', mvBudget:50000,
    title:'', rolloutId:'standard', platformId:'',
    featuredArtistId:'', selectedTrackIds:[],
  });
  const [tourTier,  setTourTier]  = useState(TOUR_TIERS[0]);
  const [merchLine, setMerchLine] = useState(MERCH_LINES[0]);

  const open  = (a) => { setSelected(a); setModal(null); setRf({ type:'single', producerId:'', mvBudget:50000, title:'', rolloutId:'standard', platformId:'', featuredArtistId:'', selectedTrackIds:[] }); };
  const close = () => { setSelected(null); setModal(null); };

  const prod     = PRODUCERS.find(p => p.id === rf.producerId);
  const rollout  = ROLLOUT_STRATEGIES.find(r => r.id === rf.rolloutId) || ROLLOUT_STRATEGIES[1];
  const platform = PLATFORM_STRATEGIES.find(p => p.id === rf.platformId);
  const diff     = game.diff || { promoMult:1 };
  const pm       = diff.promoMult || 1;
  const featNPC  = rf.featuredArtistId ? NPC_COLLABS.find(a => a.id === rf.featuredArtistId) : null;
  const featRoster = rf.featuredArtistId ? game.roster.find(a => a.id === rf.featuredArtistId) : null;
  const totalCost = Math.floor(
    ((prod?.cost||0) + (rollout?.cost||0) + (platform?.cost||0) + (rf.mvBudget||0)) * pm
    + (featNPC?.collab_fee||0)
  );

  // Existing singles for album compilation
  const artistSingles = selected ? (game.releases||[]).filter(r => r.artistId === selected.id && r.type === 'single') : [];

  // Filtered producers
  const filteredProducers = producerTierFilter === 'all'
    ? PRODUCERS
    : PRODUCERS.filter(p => p.tier === producerTierFilter);

  const handleRelease = () => {
    if (!selected) return;
    const featSuffix = featNPC ? ` ft. ${featNPC.name}` : featRoster ? ` ft. ${featRoster.name}` : '';
    const title = (rf.title || `${selected.name} — ${rf.type.toUpperCase()}`) + featSuffix;
    releaseMusic(selected.id, rf.type, rf.producerId||null, rf.mvBudget, title, rf.rolloutId, rf.platformId||null, rf.featuredArtistId||null, rf.selectedTrackIds);
    close();
  };

  if (game.roster.length === 0) {
    return (
      <div className="page" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}>
        <IconMic size={48} color="var(--gold-dim)" style={{ marginBottom:16 }} />
        <h3 style={{ fontFamily:'var(--font-display)', color:'var(--text-dim)', marginBottom:8 }}>No Artists Signed</h3>
        <p style={{ color:'var(--text-muted)', fontSize:14, textAlign:'center' }}>Head to Market to sign your first artist.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div style={{ marginBottom:14 }}>
        <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:20 }}>Your Roster</h2>
        <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>
          {game.roster.length} artist{game.roster.length!==1?'s':''} · {game.roster.filter(a=>!a.isReal).length} AI
        </p>
      </div>

      {game.roster.map(artist => (
        <div key={artist.id} className="artist-card" style={{ marginBottom:10 }} onClick={()=>open(artist)}>
          <div className="artist-avatar">{artist.name.charAt(0)}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:15 }}>{artist.name}</span>
                {!artist.isReal && <span style={{ fontSize:8, padding:'1px 5px', background:'rgba(155,89,182,0.15)', border:'1px solid rgba(155,89,182,0.4)', borderRadius:2, color:'#9b59b6', fontFamily:'var(--font-display)' }}>AI</span>}
              </div>
              <div style={{ display:'flex', gap:5 }}>
                {artist.contract.weeksRemaining <= 8 && <span className="badge badge-warn">Expiring</span>}
                {artist.careerPhase === 'decline' && <span className="badge badge-danger">Declining</span>}
                {artist.careerPhase === 'comeback' && <span className="badge badge-gold">Comeback</span>}
              </div>
            </div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{artist.genre} · {artist.region}</div>
            <div style={{ display:'flex', gap:10, marginTop:5 }}>
              <span style={{ fontSize:11, color:'var(--gold)' }}>★ {Math.round(artist.fame)}</span>
              <span style={{ fontSize:11, color:moodColor(artist.mood) }}>{artist.mood>=75?'😊':artist.mood>=50?'😐':'😤'} {Math.round(artist.mood)}</span>
              <span style={{ fontSize:11, color:phaseColor(artist.careerPhase) }}>{artist.careerPhase?.toUpperCase()}</span>
              <span style={{ fontSize:11, color:'var(--text-muted)' }}><IconClock size={10} color="var(--text-muted)" /> {artist.contract.weeksRemaining}w</span>
            </div>
          </div>
        </div>
      ))}

      {/* ── ARTIST DETAIL ── */}
      {selected && !modal && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal modal-full" onClick={e=>e.stopPropagation()} style={{ maxHeight:'90vh' }}>
            <div className="modal-header">
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div className="artist-avatar" style={{ width:50, height:50, fontSize:20 }}>{selected.name.charAt(0)}</div>
                <div>
                  <h3 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:17 }}>{selected.name}</h3>
                  <p style={{ fontSize:12, color:'var(--text-muted)' }}>{selected.genre} · {selected.region} · {selected.archetype||selected.style}</p>
                </div>
              </div>
              <button onClick={close} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            <div className="stat-grid mb-12">
              <div className="stat-cell"><div className="val">{Math.round(selected.fame)}</div><div className="lbl">Fame</div></div>
              <div className="stat-cell"><div className="val">{selected.talent}</div><div className="lbl">Talent</div></div>
              <div className="stat-cell"><div className="val" style={{ color:moodColor(selected.mood) }}>{Math.round(selected.mood)}</div><div className="lbl">Mood</div></div>
              <div className="stat-cell"><div className="val">{selected.contract.weeksRemaining}</div><div className="lbl">Wks Left</div></div>
            </div>

            <div style={{ marginBottom:12 }}>
              <StatBar label="Work Ethic"   val={selected.workEthic||70}        color="#2ecc71" />
              <StatBar label="Creativity"   val={selected.creativity||70}       color="#9b59b6" />
              <StatBar label="Loyalty"      val={selected.loyalty||70}          color="#3498db" />
              <StatBar label="Ego"          val={selected.ego||50}              color="#f39c12" />
              <StatBar label="Controversy"  val={selected.controversyLevel||30} color="#e74c3c" />
            </div>

            {/* Contract info */}
            <div style={{ background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'8px 12px', marginBottom:12, fontSize:12, color:'var(--text-muted)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span>Deal:</span><span style={{ color:'var(--text)' }}>{selected.contract.dealType}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span>Revenue split:</span><span style={{ color:'var(--text)' }}>{selected.contract.revenueSplit||'50_50'}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                <span>Album obligation:</span><span style={{ color:'var(--text)' }}>{selected.contract.albumsDelivered||0}/{selected.contract.albumObligation||0} delivered</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span>Weekly fee:</span><span style={{ color:'#e74c3c', fontFamily:'var(--font-mono)' }}>{fmtM(selected.contract.weeklyFee)}/wk</span>
              </div>
            </div>

            {!selected.isReal && (
              <div style={{ padding:'8px 12px', background:'rgba(155,89,182,0.08)', border:'1px solid rgba(155,89,182,0.2)', borderRadius:'var(--radius)', marginBottom:12, fontSize:12, color:'rgba(155,89,182,0.9)' }}>
                🤖 AI Artist · {selected.starPotential>=80?'Scouts rate this one highly.':selected.viralProbability>=60?'High viral probability.':'Unpredictable potential.'}
              </div>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              {[
                { label:'Release', icon:<IconMusic size={18} color="var(--gold)" />, action:'release' },
                { label:'Tour',    icon:<IconMap size={18} color="var(--gold)" />,   action:'tour'    },
                { label:'Merch',   icon:<IconShirt size={18} color="var(--gold)" />, action:'merch'   },
                { label:'Drop',    icon:<IconTrash size={18} color="#e74c3c" />,     action:'drop', danger:true },
              ].map(btn=>(
                <button key={btn.action} className={btn.danger?'btn btn-danger':'btn btn-outline'} onClick={()=>setModal(btn.action)} style={{ flexDirection:'column', gap:4, padding:'14px 8px', minHeight:64 }}>
                  {btn.icon}<span style={{ fontSize:11 }}>{btn.label}</span>
                </button>
              ))}
            </div>

            {(game.releases||[]).filter(r=>r.artistId===selected.id).length > 0 && (
              <>
                <div className="divider" />
                <div style={{ fontSize:10, fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--gold-dim)', marginBottom:8 }}>Discography</div>
                {(game.releases||[]).filter(r=>r.artistId===selected.id).map(r=>(
                  <div key={r.id} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize:13 }}>{r.title}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)' }}>{r.type} · Q:{r.quality}{r.viralHit?' 🔥':''}{r.active?' ▶':' ◼'}</div>
                    </div>
                    <div style={{ textAlign:'right', fontSize:12, fontFamily:'var(--font-mono)', color:'var(--gold-dim)' }}>{fmtM(r.revenue)}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── RELEASE MODAL ── */}
      {selected && modal === 'release' && (
        <div className="modal-overlay" onClick={()=>setModal(null)}>
          <div className="modal" style={{ maxHeight:'92vh' }} onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:16 }}>New Release — {selected.name}</h3>
              <button onClick={()=>setModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input value={rf.title} onChange={e=>setRf(f=>({...f,title:e.target.value}))} placeholder={`${selected.name} — New ${rf.type}`} />
            </div>

            <div className="form-group">
              <label>Release Type</label>
              <div style={{ display:'flex', gap:8 }}>
                {['single','ep','album'].map(t=>(
                  <button key={t} onClick={()=>setRf(f=>({...f,type:t,selectedTrackIds:[]}))} style={{ flex:1, padding:'10px 4px', border:rf.type===t?'1px solid var(--gold)':'1px solid var(--border)', background:rf.type===t?'var(--gold-glow)':'var(--bg-2)', color:rf.type===t?'var(--gold)':'var(--text-muted)', borderRadius:'var(--radius)', fontFamily:'var(--font-display)', fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', minHeight:40 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Album track selector */}
            {rf.type === 'album' && artistSingles.length > 0 && (
              <div className="form-group">
                <label>Include Existing Singles in Album</label>
                <div style={{ display:'flex', flexDirection:'column', gap:6, maxHeight:150, overflowY:'auto' }}>
                  {artistSingles.map(s => {
                    const sel2 = rf.selectedTrackIds.includes(s.id);
                    return (
                      <div key={s.id} onClick={()=>setRf(f=>({...f, selectedTrackIds: sel2 ? f.selectedTrackIds.filter(id=>id!==s.id) : [...f.selectedTrackIds, s.id]}))} style={{ padding:'8px 12px', borderRadius:'var(--radius)', border:sel2?'1px solid var(--gold)':'1px solid var(--border)', background:sel2?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer', display:'flex', justifyContent:'space-between' }}>
                        <div>
                          <div style={{ fontSize:12, color:sel2?'var(--gold)':'var(--text)' }}>{s.title}</div>
                          <div style={{ fontSize:10, color:'var(--text-muted)' }}>Q:{s.quality}{s.viralHit?' 🔥':''}</div>
                        </div>
                        {sel2 && <span style={{ fontSize:14, color:'var(--gold)' }}>✓</span>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>
                  {rf.selectedTrackIds.length} selected · +{Math.min(12,rf.selectedTrackIds.length*3)} quality bonus
                </div>
              </div>
            )}

            {/* Featured artist */}
            <div className="form-group">
              <label>Featured Artist (optional)</label>
              <select value={rf.featuredArtistId} onChange={e=>setRf(f=>({...f,featuredArtistId:e.target.value}))}>
                <option value="">No feature</option>
                {game.roster.filter(a=>a.id!==selected.id).length > 0 && (
                  <optgroup label="── Your Roster (Free) ──">
                    {game.roster.filter(a=>a.id!==selected.id).map(a=>(
                      <option key={a.id} value={a.id}>{a.name} (Label) — Free · +{Math.floor((a.fame||0)*0.06)} quality</option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="── NPC Artists (Collab Fee) ──">
                  {NPC_COLLABS.slice(0,30).map(a=>(
                    <option key={a.id} value={a.id}>{a.name} — {a.genre} · {fmtM(a.collab_fee)} · +{Math.floor(a.fame*0.09)} quality</option>
                  ))}
                </optgroup>
              </select>
              {featNPC && <div style={{ fontSize:11, color:'#f39c12', marginTop:4 }}>Collab fee: {fmtM(featNPC.collab_fee)} (×{diff.promoMult||1} difficulty multiplier)</div>}
              {featRoster && <div style={{ fontSize:11, color:'#2ecc71', marginTop:4 }}>Label collab — no extra fee!</div>}
            </div>

            {/* Producer — with tier filter */}
            <div className="form-group">
              <label>Producer</label>
              <div style={{ display:'flex', gap:5, marginBottom:6, overflowX:'auto' }}>
                {['all',...PRODUCER_TIERS].map(t=>(
                  <button key={t} onClick={()=>setProducerTierFilter(t)} style={{ padding:'3px 10px', borderRadius:12, fontSize:10, whiteSpace:'nowrap', border:producerTierFilter===t?'1px solid var(--gold)':'1px solid var(--border)', background:producerTierFilter===t?'rgba(201,168,76,0.12)':'transparent', color:producerTierFilter===t?'var(--gold)':'var(--text-muted)', cursor:'pointer', minHeight:28, fontFamily:'var(--font-display)', letterSpacing:'0.06em', textTransform:'capitalize' }}>
                    {t}
                  </button>
                ))}
              </div>
              <select value={rf.producerId} onChange={e=>setRf(f=>({...f,producerId:e.target.value}))}>
                <option value="">No producer (save money)</option>
                {filteredProducers.map(p=>(
                  <option key={p.id} value={p.id}>{p.name} — {p.specialty} · {fmtM(Math.floor(p.cost*pm))} · +{p.qualityBonus}Q [{p.tier}]</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>MV Budget: {fmtM(rf.mvBudget)} → actual cost {fmtM(Math.floor(rf.mvBudget*pm))}{rf.mvBudget>800000?' (+14 Quality)':rf.mvBudget>400000?' (+9 Quality)':rf.mvBudget>150000?' (+5 Quality)':''}</label>
              <input type="range" min={0} max={3000000} step={50000} value={rf.mvBudget} onChange={e=>setRf(f=>({...f,mvBudget:Number(e.target.value)}))} style={{ padding:0, height:'auto', minHeight:'auto', border:'none', background:'none' }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--text-muted)', marginTop:2 }}><span>$0</span><span>$3M</span></div>
            </div>

            <div className="form-group">
              <label>Rollout Strategy</label>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {ROLLOUT_STRATEGIES.map(r=>(
                  <div key={r.id} onClick={()=>setRf(f=>({...f,rolloutId:r.id}))} style={{ padding:'8px 12px', borderRadius:'var(--radius)', border:rf.rolloutId===r.id?'1px solid var(--gold)':'1px solid var(--border)', background:rf.rolloutId===r.id?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer' }}>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:12, color:rf.rolloutId===r.id?'var(--gold)':'var(--text)' }}>{r.name}</span>
                      <span style={{ fontSize:11, color:r.cost>0?'#e74c3c':'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{r.cost>0?fmtM(Math.floor(r.cost*pm)):'Free'}</span>
                    </div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{r.desc} · +{r.viralBonus}% viral</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Platform Strategy (optional)</label>
              <select value={rf.platformId} onChange={e=>setRf(f=>({...f,platformId:e.target.value}))}>
                <option value="">No push</option>
                {PLATFORM_STRATEGIES.map(p=><option key={p.id} value={p.id}>{p.name} — {fmtM(Math.floor(p.cost*pm))} · +{p.streamBonus}% streams</option>)}
              </select>
            </div>

            <div style={{ background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', marginBottom:16 }}>
              <div style={{ fontSize:13, color:'var(--text-dim)' }}>
                Total cost: <strong style={{ color:'#e74c3c', fontFamily:'var(--font-mono)' }}>{fmtM(totalCost)}</strong>
                <span style={{ marginLeft:10, fontSize:12, color:game.cash>=totalCost?'#2ecc71':'#e74c3c' }}>{game.cash>=totalCost?'✓ Affordable':'✗ Insufficient'}</span>
              </div>
              {pm > 1 && <div style={{ fontSize:11, color:'#f39c12', marginTop:3 }}>⚠️ {diff.label} difficulty: all promo costs ×{pm.toFixed(1)}</div>}
            </div>

            <button className="btn btn-gold btn-lg w-full" onClick={handleRelease} disabled={game.cash<totalCost} style={{ opacity:game.cash>=totalCost?1:0.5 }}>
              <IconMusic size={18} />Drop Release — {fmtM(totalCost)}
            </button>
          </div>
        </div>
      )}

      {/* ── TOUR MODAL ── */}
      {selected && modal === 'tour' && (
        <div className="modal-overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)' }}>Book Tour — {selected.name}</h3>
              <button onClick={()=>setModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>
            <div style={{ marginBottom:12, padding:'8px 12px', background:'var(--bg-3)', borderRadius:'var(--radius)', fontSize:12, color:'var(--text-muted)' }}>
              Artist fame: <strong style={{ color:'var(--gold)' }}>{Math.round(selected.fame)}</strong> · Higher fame = better fill rate = more profit
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {TOUR_TIERS.map(t => {
                const tourCostMult = (game.diff?.tourCostMult||1);
                const actualCost = Math.floor(t.baseCost * tourCostMult);
                const famePct = Math.min(1.0, selected.fame / (t.minFame * 1.3));
                const fillRate = Math.round((0.55 + famePct * 0.45) * 100);
                const gross = Math.floor(t.venues * t.capacity * t.ticketPrice * (fillRate/100) * 0.80);
                const support = Math.floor((t.supportCost||0) * tourCostMult * Math.ceil(t.venues/3));
                const net = gross - support;
                const active = tourTier.id === t.id;
                const meetsMin = selected.fame >= (t.minFame||0);
                const affordable = game.cash >= actualCost;
                return (
                  <div key={t.id} onClick={()=>meetsMin&&setTourTier(t)} style={{ padding:'12px 14px', borderRadius:'var(--radius)', border:active?'1px solid var(--gold)':'1px solid var(--border)', background:active?'var(--gold-glow)':'var(--bg-2)', cursor:meetsMin?'pointer':'not-allowed', opacity:meetsMin?1:0.45 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:14, color:active?'var(--gold)':'var(--text)' }}>{t.name}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:net>0?'#2ecc71':'#e74c3c' }}>{net>0?'+':''}{fmtM(net)} net</span>
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{t.venues} shows · {t.capacity.toLocaleString()} cap · ${t.ticketPrice}/ticket</div>
                    <div style={{ display:'flex', gap:10, marginTop:4 }}>
                      <span style={{ fontSize:11, color:'#e74c3c' }}>Cost: {fmtM(actualCost)}</span>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>Fill: {fillRate}%</span>
                      {!meetsMin && <span style={{ fontSize:11, color:'#e74c3c' }}>Min fame: {t.minFame}</span>}
                    </div>
                    {net < 0 && meetsMin && <div style={{ fontSize:11, color:'#e74c3c', marginTop:3 }}>⚠️ {selected.name} isn't famous enough — you will lose money</div>}
                  </div>
                );
              })}
            </div>
            <button className="btn btn-gold btn-lg w-full" style={{ marginTop:16 }} onClick={()=>{bookTour(selected.id,tourTier);close();}} disabled={game.cash < Math.floor(tourTier.baseCost*(game.diff?.tourCostMult||1))} style={{ marginTop:16, opacity:game.cash>=Math.floor(tourTier.baseCost*(game.diff?.tourCostMult||1))?1:0.5 }}>
              <IconMap size={18} />Book {tourTier.name}
            </button>
          </div>
        </div>
      )}

      {/* ── MERCH MODAL ── */}
      {selected && modal === 'merch' && (
        <div className="modal-overlay" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)' }}>Merch — {selected.name}</h3>
              <button onClick={()=>setModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {MERCH_LINES.map(m => {
                const active = merchLine.id === m.id;
                return (
                  <div key={m.id} onClick={()=>setMerchLine(m)} style={{ padding:'12px 14px', borderRadius:'var(--radius)', border:active?'1px solid var(--gold)':'1px solid var(--border)', background:active?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:14, color:active?'var(--gold)':'var(--text)' }}>{m.name}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'#2ecc71' }}>+{fmtM(m.weeklyRevenue)}/wk</span>
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{m.description}</div>
                    <div style={{ fontSize:12, color:'#e74c3c', marginTop:2 }}>Setup: {fmtM(m.cost)}</div>
                  </div>
                );
              })}
            </div>
            <button className="btn btn-gold btn-lg w-full" style={{ marginTop:16 }} onClick={()=>{launchMerch(selected.id,merchLine);close();}}>
              <IconShirt size={18} />Launch {merchLine.name}
            </button>
          </div>
        </div>
      )}

      {/* ── DROP CONFIRM ── */}
      {selected && modal === 'drop' && (
        <div className="confirm-dialog">
          <div className="confirm-box">
            <IconTrash size={28} color="#e74c3c" style={{ margin:'0 auto 12px', display:'block' }} />
            <h3 style={{ fontFamily:'var(--font-display)', marginBottom:8 }}>Drop {selected.name}?</h3>
            <p style={{ color:'var(--text-dim)', fontSize:14, marginBottom:6 }}>Buyout: <strong style={{ color:'#e74c3c' }}>{fmtM(selected.contract.weeklyFee*8)}</strong></p>
            <p style={{ color:'var(--text-muted)', fontSize:12, marginBottom:20 }}>Legal team discount applied. Cannot be undone.</p>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn btn-outline w-full" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={()=>{dropArtist(selected.id);close();}}>Drop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
