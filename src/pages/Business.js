import React, { useState } from 'react';
import { IconFilm, IconMap, IconShirt, IconDollarSign, IconX, IconPlus, IconGlobe, IconCheck } from '../components/Icons';
import { SYNC_DEALS } from '../data/gameData';

function fmtM(n) {
  if(!n&&n!==0) return '$0';
  if(n>=1e6) return `$${(n/1e6).toFixed(2)}M`;
  if(n>=1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n)}`;
}

export default function Business({ game, acceptSyncDeal }) {
  const [tab, setTab] = useState('sync');
  const [syncModal, setSyncModal] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState('');

  // Filter available sync deals based on label image health + artist fame
  const availableSync = SYNC_DEALS.filter(d => {
    const alreadyDone = game.syncDeals.some(sd=>sd.id===d.id);
    if (alreadyDone) return false;
    const week = game.week || 1;
    return (week + SYNC_DEALS.indexOf(d)) % 2 !== 0 && SYNC_DEALS.indexOf(d) < 10;
  }).slice(0, 5);

  const checkEligibility = (deal, artist) => {
    if (!artist) return { ok:false, reason:'No artist selected' };
    if (artist.fame < deal.minFame) return { ok:false, reason:`Needs ${deal.minFame} fame (artist has ${Math.round(artist.fame)})` };
    if ((game.imageHealth||100) < 40) return { ok:false, reason:'Label image too damaged for this deal' };
    if (deal.genreFit && !deal.genreFit.includes(artist.genre)) return { ok:false, reason:`${deal.platform} prefers: ${deal.genreFit.join(', ')}` };
    return { ok:true };
  };

  const artistObj = game.roster.find(a=>a.id===selectedArtist);

  const handleAccept = () => {
    if (!selectedArtist || !syncModal) return;
    const elig = checkEligibility(syncModal, artistObj);
    if (!elig.ok) return;
    acceptSyncDeal(selectedArtist, syncModal);
    setSyncModal(null);
    setSelectedArtist('');
  };

  return (
    <div className="page">
      <div style={{ marginBottom:14 }}>
        <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:20 }}>Business Hub</h2>
        <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>Sync deals · Tours · Merch</p>
      </div>

      <div style={{ display:'flex', gap:2, marginBottom:16, background:'var(--bg-2)', borderRadius:'var(--radius)', padding:3, border:'1px solid var(--border)' }}>
        {[{id:'sync',label:'Sync Deals'},{id:'tours',label:'Tours'},{id:'merch',label:'Merch'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'8px 4px', borderRadius:'var(--radius)', background:tab===t.id?'linear-gradient(135deg,var(--gold-dim),rgba(201,168,76,0.5))':'transparent', color:tab===t.id?'#0a0804':'var(--text-muted)', fontFamily:'var(--font-display)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', border:'none', minHeight:38 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* SYNC */}
      {tab==='sync' && (
        <div>
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', marginBottom:16 }}>
            <div style={{ fontSize:11, color:'var(--gold-dim)', fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:6 }}>Label Image Health</div>
            <div className="progress-bar"><div className="progress-fill" style={{ width:`${game.imageHealth||100}%`, background:game.imageHealth>=70?'linear-gradient(90deg,#27ae60,#2ecc71)':game.imageHealth>=40?'linear-gradient(90deg,#e67e22,#f39c12)':'linear-gradient(90deg,#c0392b,#e74c3c)' }} /></div>
            <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>
              {Math.round(game.imageHealth||100)}/100 — {game.imageHealth>=70?'Clean image. All deals available.':game.imageHealth>=40?'Some deals restricted. Fix scandals.':'Damaged image. Most deals blocked.'}
            </div>
          </div>

          {game.syncDeals.length>0&&(
            <div style={{ marginBottom:16 }}>
              <div className="section-header"><span className="section-title">Completed ({game.syncDeals.length})</span></div>
              {game.syncDeals.slice(-4).reverse().map((d,i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize:13 }}>{d.title}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{d.artistName} · {d.platform} · Wk {d.week}</div>
                  </div>
                  <div className="badge badge-success">{fmtM(d.fee)}</div>
                </div>
              ))}
            </div>
          )}

          <div className="section-header"><span className="section-title">Available Deals ({availableSync.length})</span></div>

          {game.roster.length===0?(
            <div style={{ textAlign:'center', padding:'32px 0', color:'var(--text-muted)', fontSize:14 }}>Sign artists first to unlock sync opportunities.</div>
          ):(
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {availableSync.map(deal=>{
                const bestArtist = game.roster.reduce((best,a)=>(a.fame>=(deal.minFame)&&(!best||a.fame>best.fame))?a:best, null);
                const eligible = bestArtist !== null;
                return (
                  <div key={deal.id} style={{ background:'var(--surface)', border:`1px solid ${eligible?'var(--border)':'rgba(231,76,60,0.2)'}`, borderRadius:'var(--radius-lg)', padding:14, cursor:eligible?'pointer':'default', opacity:eligible?1:0.6 }} onClick={()=>eligible&&setSyncModal(deal)}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                      <div>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:14 }}>{deal.title}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)' }}>{deal.platform}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:3 }}>
                          Min Fame: {deal.minFame}{deal.genreFit&&` · Genre: ${deal.genreFit.slice(0,2).join(', ')}`}
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'var(--gold-light)' }}>{fmtM(deal.fee)}</div>
                        <div style={{ fontSize:11, color:'#2ecc71' }}>+{deal.fameBonus} fame</div>
                      </div>
                    </div>
                    {eligible?(
                      <button className="btn btn-outline btn-sm w-full"><IconPlus size={14} />Apply for Deal</button>
                    ):(
                      <div style={{ fontSize:12, color:'#e74c3c' }}>⚠️ No eligible artist (min fame {deal.minFame})</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TOURS */}
      {tab==='tours' && (
        <div>
          <div className="section-header">
            <span className="section-title">Active Tours ({game.activeTours?.length||0})</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'#2ecc71' }}>
              +{fmtM((game.activeTours||[]).reduce((s,t)=>s+t.weeklyRevenue,0))}/wk
            </span>
          </div>
          {(game.activeTours||[]).length===0?(
            <div style={{ textAlign:'center', padding:'32px 0', color:'var(--text-muted)', fontSize:14 }}>No active tours. Book from Roster.</div>
          ):(
            (game.activeTours||[]).map(t=>(
              <div key={t.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:14, marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:15 }}>{t.artistName}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{t.tier}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'#2ecc71' }}>+{fmtM(t.weeklyRevenue)}/wk</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{t.weeksRemaining} wks left</div>
                  </div>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width:`${Math.max(5,100-(t.weeksRemaining/10)*100)}%` }} /></div>
              </div>
            ))
          )}
        </div>
      )}

      {/* MERCH */}
      {tab==='merch' && (
        <div>
          <div className="section-header">
            <span className="section-title">Merch Lines ({game.activeMerch?.length||0})</span>
            {(game.activeMerch||[]).length>0&&<span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'#2ecc71' }}>+{fmtM((game.activeMerch||[]).reduce((s,m)=>s+m.weeklyRevenue,0))}/wk</span>}
          </div>
          {(game.activeMerch||[]).length===0?(
            <div style={{ textAlign:'center', padding:'32px 0', color:'var(--text-muted)', fontSize:14 }}>No merch lines. Launch from Roster.</div>
          ):(
            (game.activeMerch||[]).map(m=>(
              <div key={m.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:14, marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:15 }}>{m.line}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{m.artistName}</div>
                  </div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'#2ecc71' }}>+{fmtM(m.weeklyRevenue)}/wk</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sync apply modal */}
      {syncModal && (
        <div className="modal-overlay" onClick={()=>setSyncModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)' }}>Apply — {syncModal.platform}</h3>
              <button onClick={()=>setSyncModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>
            <div style={{ background:'var(--bg-3)', borderRadius:'var(--radius)', padding:'14px', marginBottom:16, border:'1px solid var(--border)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:16, color:'var(--gold-light)', marginBottom:4 }}>{syncModal.title}</div>
              <div style={{ display:'flex', gap:20, marginTop:8 }}>
                <div><div style={{ fontFamily:'var(--font-mono)', fontSize:22, color:'var(--gold)' }}>{fmtM(syncModal.fee)}</div><div style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Sync Fee</div></div>
                <div><div style={{ fontFamily:'var(--font-mono)', fontSize:22, color:'#2ecc71' }}>+{syncModal.fameBonus}</div><div style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Fame Boost</div></div>
              </div>
              <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:8 }}>
                Requirements: Fame {syncModal.minFame}+{syncModal.genreFit?` · Genre: ${syncModal.genreFit.join(', ')}`:' · Any genre'} · Clean image
              </div>
            </div>

            <div className="form-group">
              <label>Select Artist</label>
              <select value={selectedArtist} onChange={e=>setSelectedArtist(e.target.value)}>
                <option value="">Choose artist...</option>
                {game.roster.map(a=>{
                  const elig = checkEligibility(syncModal,a);
                  return <option key={a.id} value={a.id}>{a.name} — Fame {Math.round(a.fame)}{elig.ok?' ✓':` ✗ ${elig.reason}`}</option>;
                })}
              </select>
            </div>

            {selectedArtist && (()=>{
              const elig = checkEligibility(syncModal, artistObj);
              return !elig.ok ? (
                <div style={{ color:'#e74c3c', fontSize:13, marginBottom:12, padding:'8px 12px', background:'var(--danger-dim)', borderRadius:'var(--radius)', border:'1px solid rgba(231,76,60,0.3)' }}>
                  ✗ {elig.reason}
                </div>
              ) : (
                <div style={{ color:'#2ecc71', fontSize:13, marginBottom:12 }}>✓ {artistObj?.name} is eligible for this deal</div>
              );
            })()}

            <button className="btn btn-gold btn-lg w-full" onClick={handleAccept} disabled={!selectedArtist||!checkEligibility(syncModal,artistObj)?.ok} style={{ opacity:selectedArtist&&checkEligibility(syncModal,artistObj)?.ok?1:0.5 }}>
              <IconDollarSign size={18} />Accept Deal — {fmtM(syncModal.fee)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
