import React, { useState } from 'react';
import {
  IconX, IconMusic, IconMap, IconShirt, IconTrash,
  IconMic, IconClock, IconZap, IconStar, IconTrendingUp, IconInfo,
} from '../components/Icons';
import { PRODUCERS, TOUR_TIERS, MERCH_LINES, ROLLOUT_STRATEGIES, PLATFORM_STRATEGIES } from '../data/gameData';

function fmtM(n) {
  if (!n && n !== 0) return '$0';
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n)}`;
}

function moodColor(m) {
  if (m >= 75) return '#2ecc71';
  if (m >= 50) return '#f39c12';
  return '#e74c3c';
}

function phaseColor(p) {
  if (p === 'peak') return 'var(--gold)';
  if (p === 'rise') return '#2ecc71';
  if (p === 'comeback') return '#9b59b6';
  if (p === 'decline') return '#e74c3c';
  return 'var(--text-muted)';
}

function StatBar({ label, val, color = 'var(--gold)' }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color }}>{val}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${val}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }} />
      </div>
    </div>
  );
}

export default function Roster({ game, releaseMusic, bookTour, launchMerch, dropArtist }) {
  const [selected, setSelected]   = useState(null);
  const [modal, setModal]         = useState(null); // 'release'|'tour'|'merch'|'drop'|'stats'

  // Release form
  const [releaseForm, setReleaseForm] = useState({
    type: 'single', producerId: '', mvBudget: 50000,
    title: '', rolloutId: 'standard', platformId: '',
  });
  const [tourTier,  setTourTier]  = useState(TOUR_TIERS[0]);
  const [merchLine, setMerchLine] = useState(MERCH_LINES[0]);

  const open  = (a) => { setSelected(a); setModal(null); };
  const close = () => { setSelected(null); setModal(null); };

  const handleRelease = () => {
    if (!selected) return;
    releaseMusic(
      selected.id,
      releaseForm.type,
      releaseForm.producerId || null,
      releaseForm.mvBudget,
      releaseForm.title || undefined,
      releaseForm.rolloutId,
      releaseForm.platformId || null,
    );
    close();
  };

  const handleTour  = () => { bookTour(selected.id, tourTier);   close(); };
  const handleMerch = () => { launchMerch(selected.id, merchLine); close(); };
  const handleDrop  = () => { dropArtist(selected.id);             close(); };

  // Cost calculator
  const prod = PRODUCERS.find(p => p.id === releaseForm.producerId);
  const rollout = ROLLOUT_STRATEGIES.find(r => r.id === releaseForm.rolloutId) || ROLLOUT_STRATEGIES[1];
  const platform = PLATFORM_STRATEGIES.find(p => p.id === releaseForm.platformId);
  const releaseCost = releaseForm.mvBudget + (prod?.cost || 0) + (rollout?.cost || 0) + (platform?.cost || 0);

  if (game.roster.length === 0) {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <IconMic size={48} color="var(--gold-dim)" style={{ marginBottom: 16 }} />
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dim)', marginBottom: 8 }}>No Artists Signed</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center' }}>
          Head to the Market tab to sign your first artist.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20 }}>
          Your Roster
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          {game.roster.length} artist{game.roster.length !== 1 ? 's' : ''} ·{' '}
          {game.roster.filter(a => !a.isReal).length} AI
        </p>
      </div>

      {game.roster.map(artist => (
        <div key={artist.id} className="artist-card" style={{ marginBottom: 10 }} onClick={() => open(artist)}>
          <div className="artist-avatar">{artist.name.charAt(0)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>{artist.name}</span>
                {!artist.isReal && (
                  <span style={{ fontSize: 9, padding: '1px 5px', background: 'rgba(155,89,182,0.15)', border: '1px solid rgba(155,89,182,0.4)', borderRadius: 2, color: '#9b59b6', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
                    AI
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {artist.contract.weeksRemaining <= 8 && <span className="badge badge-warn">Expiring</span>}
                {artist.careerPhase === 'decline' && <span className="badge badge-danger">Declining</span>}
                {artist.careerPhase === 'comeback' && <span className="badge badge-gold">Comeback</span>}
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {artist.genre} · {artist.region}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--gold)' }}>⭐ {Math.round(artist.fame)}</span>
              <span style={{ fontSize: 11, color: moodColor(artist.mood) }}>
                {artist.mood >= 75 ? '😊' : artist.mood >= 50 ? '😐' : '😤'} {Math.round(artist.mood)}
              </span>
              <span style={{ fontSize: 11, color: phaseColor(artist.careerPhase) }}>
                {artist.careerPhase?.toUpperCase()}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                <IconClock size={10} color="var(--text-muted)" /> {artist.contract.weeksRemaining}w
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* ── ARTIST DETAIL MODAL ── */}
      {selected && !modal && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal modal-full" onClick={e => e.stopPropagation()} style={{ maxHeight: '88vh' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="artist-avatar" style={{ width: 52, height: 52, fontSize: 20 }}>
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 18 }}>{selected.name}</h3>
                    {!selected.isReal && <span style={{ fontSize: 9, padding: '1px 5px', background: 'rgba(155,89,182,0.15)', border: '1px solid rgba(155,89,182,0.4)', borderRadius: 2, color: '#9b59b6', fontFamily: 'var(--font-display)' }}>AI ARTIST</span>}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.genre} · {selected.region} · {selected.archetype || selected.style}</p>
                </div>
              </div>
              <button onClick={close} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            {/* Core stats */}
            <div className="stat-grid mb-12">
              <div className="stat-cell"><div className="val">{Math.round(selected.fame)}</div><div className="lbl">Fame</div></div>
              <div className="stat-cell"><div className="val">{selected.talent}</div><div className="lbl">Talent</div></div>
              <div className="stat-cell"><div className="val" style={{ color: moodColor(selected.mood) }}>{Math.round(selected.mood)}</div><div className="lbl">Mood</div></div>
              <div className="stat-cell"><div className="val">{selected.contract.weeksRemaining}</div><div className="lbl">Wks Left</div></div>
            </div>

            {/* Deep attributes */}
            <div style={{ marginBottom: 14 }}>
              <StatBar label="Work Ethic"   val={selected.workEthic   || 70} color="#2ecc71" />
              <StatBar label="Creativity"   val={selected.creativity  || 70} color="#9b59b6" />
              <StatBar label="Loyalty"      val={selected.loyalty     || 70} color="#3498db" />
              <StatBar label="Ego"          val={selected.ego         || 50} color="#f39c12" />
              <StatBar label="Controversy"  val={selected.controversyLevel || 30} color="#e74c3c" />
            </div>

            {/* AI hidden potential hint */}
            {!selected.isReal && (
              <div style={{ padding: '8px 12px', background: 'rgba(155,89,182,0.08)', border: '1px solid rgba(155,89,182,0.2)', borderRadius: 'var(--radius)', marginBottom: 12, fontSize: 12, color: 'rgba(155,89,182,0.9)' }}>
                <IconInfo size={12} color="rgba(155,89,182,0.9)" style={{ display: 'inline', marginRight: 5 }} />
                AI Artist — hidden growth potential. Career trajectory is unpredictable.
                {selected.starPotential >= 80 && ' Internal scouts rate this artist highly.'}
                {selected.viralProbability >= 60 && ' High viral probability detected.'}
              </div>
            )}

            {/* Career phase */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '8px 12px', background: 'var(--bg-3)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Career Phase:</span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-display)', color: phaseColor(selected.careerPhase), letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {selected.careerPhase}
              </span>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <button className="btn btn-outline" onClick={() => setModal('release')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconMusic size={20} color="var(--gold)" />
                <span style={{ fontSize: 11 }}>Release</span>
              </button>
              <button className="btn btn-outline" onClick={() => setModal('tour')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconMap size={20} color="var(--gold)" />
                <span style={{ fontSize: 11 }}>Tour</span>
              </button>
              <button className="btn btn-outline" onClick={() => setModal('merch')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconShirt size={20} color="var(--gold)" />
                <span style={{ fontSize: 11 }}>Merch</span>
              </button>
              <button className="btn btn-danger" onClick={() => setModal('drop')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconTrash size={20} color="#e74c3c" />
                <span style={{ fontSize: 11 }}>Drop</span>
              </button>
            </div>

            {/* Artist's releases */}
            {game.releases.filter(r => r.artistId === selected.id).length > 0 && (
              <>
                <div className="divider" />
                <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 8 }}>Discography</div>
                {game.releases.filter(r => r.artistId === selected.id).map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 13 }}>{r.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.type} · Q:{r.quality}{r.viralHit ? ' 🔥' : ''}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold-dim)' }}>{fmtM(r.revenue)}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.active ? '▶ Active' : '◼ Archived'}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── RELEASE MODAL ── */}
      {selected && modal === 'release' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 17 }}>New Release — {selected.name}</h3>
              <button onClick={() => setModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            <div className="form-group">
              <label>Track / Project Title</label>
              <input value={releaseForm.title} onChange={e => setReleaseForm(f => ({ ...f, title: e.target.value }))} placeholder={`${selected.name} — New Single`} />
            </div>

            <div className="form-group">
              <label>Release Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['single','ep','album'].map(t => (
                  <button key={t} onClick={() => setReleaseForm(f => ({ ...f, type: t }))} style={{ flex: 1, padding: '10px 4px', border: releaseForm.type === t ? '1px solid var(--gold)' : '1px solid var(--border)', background: releaseForm.type === t ? 'var(--gold-glow)' : 'var(--bg-2)', color: releaseForm.type === t ? 'var(--gold)' : 'var(--text-muted)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', minHeight: 40 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Producer (optional)</label>
              <select value={releaseForm.producerId} onChange={e => setReleaseForm(f => ({ ...f, producerId: e.target.value }))}>
                <option value="">No producer</option>
                {PRODUCERS.map(p => <option key={p.id} value={p.id}>{p.name} — {p.specialty} · {fmtM(p.cost)} · +{p.qualityBonus} Q</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Music Video Budget: {fmtM(releaseForm.mvBudget)}</label>
              <input type="range" min={0} max={2000000} step={25000} value={releaseForm.mvBudget}
                onChange={e => setReleaseForm(f => ({ ...f, mvBudget: Number(e.target.value) }))}
                style={{ padding: 0, height: 'auto', minHeight: 'auto', border: 'none', background: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                <span>$0</span><span style={{ color: releaseForm.mvBudget > 500000 ? 'var(--gold)' : 'inherit' }}>{releaseForm.mvBudget > 500000 ? '+12 Quality' : releaseForm.mvBudget > 200000 ? '+7 Quality' : 'No quality bonus'}</span><span>$2M</span>
              </div>
            </div>

            <div className="form-group">
              <label>Rollout Strategy</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {ROLLOUT_STRATEGIES.map(r => (
                  <div key={r.id} onClick={() => setReleaseForm(f => ({ ...f, rolloutId: r.id }))} style={{ padding: '8px 12px', borderRadius: 'var(--radius)', border: releaseForm.rolloutId === r.id ? '1px solid var(--gold)' : '1px solid var(--border)', background: releaseForm.rolloutId === r.id ? 'var(--gold-glow)' : 'var(--bg-2)', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: releaseForm.rolloutId === r.id ? 'var(--gold)' : 'var(--text)' }}>{r.name}</span>
                      <span style={{ fontSize: 11, color: r.cost > 0 ? '#e74c3c' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{r.cost > 0 ? fmtM(r.cost) : 'Free'}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.desc} · +{r.viralBonus}% viral chance</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Platform Strategy (optional)</label>
              <select value={releaseForm.platformId} onChange={e => setReleaseForm(f => ({ ...f, platformId: e.target.value }))}>
                <option value="">No platform push</option>
                {PLATFORM_STRATEGIES.map(p => <option key={p.id} value={p.id}>{p.name} — {fmtM(p.cost)} · +{p.streamBonus}% streams</option>)}
              </select>
            </div>

            {/* Cost summary */}
            <div style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 14px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                Total cost: <strong style={{ color: '#e74c3c', fontFamily: 'var(--font-mono)' }}>{fmtM(releaseCost)}</strong>
                <span style={{ color: game.cash >= releaseCost ? '#2ecc71' : '#e74c3c', marginLeft: 10, fontSize: 12 }}>
                  {game.cash >= releaseCost ? '✓ Affordable' : '✗ Insufficient funds'}
                </span>
              </div>
            </div>

            <button className="btn btn-gold btn-lg w-full" onClick={handleRelease} disabled={game.cash < releaseCost} style={{ opacity: game.cash >= releaseCost ? 1 : 0.5 }}>
              <IconMusic size={18} /> Drop Release
            </button>
          </div>
        </div>
      )}

      {/* ── TOUR MODAL ── */}
      {selected && modal === 'tour' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>Book Tour — {selected.name}</h3>
              <button onClick={() => setModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TOUR_TIERS.map(t => {
                const rev = t.venues * t.capacity * t.ticketPrice * 0.85;
                const profit = rev - t.cost;
                const active = tourTier.id === t.id;
                const affordable = game.cash >= t.cost;
                return (
                  <div key={t.id} onClick={() => setTourTier(t)} style={{ padding: '12px 14px', borderRadius: 'var(--radius)', border: active ? '1px solid var(--gold)' : '1px solid var(--border)', background: active ? 'var(--gold-glow)' : 'var(--bg-2)', cursor: 'pointer', opacity: affordable ? 1 : 0.5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: active ? 'var(--gold)' : 'var(--text)' }}>{t.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: profit > 0 ? '#2ecc71' : '#e74c3c' }}>
                        +{fmtM(profit)} net
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {t.venues} shows · {t.capacity.toLocaleString()} cap · ${t.ticketPrice}/ticket
                    </div>
                    <div style={{ fontSize: 12, color: '#e74c3c', marginTop: 2 }}>Cost: {fmtM(t.cost)}</div>
                  </div>
                );
              })}
            </div>
            <button className="btn btn-gold btn-lg w-full" style={{ marginTop: 16 }} onClick={handleTour} disabled={game.cash < tourTier.cost} style={{ marginTop: 16, opacity: game.cash >= tourTier.cost ? 1 : 0.5 }}>
              <IconMap size={18} /> Book {tourTier.name}
            </button>
          </div>
        </div>
      )}

      {/* ── MERCH MODAL ── */}
      {selected && modal === 'merch' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>Merch Line — {selected.name}</h3>
              <button onClick={() => setModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MERCH_LINES.map(m => {
                const active = merchLine.id === m.id;
                return (
                  <div key={m.id} onClick={() => setMerchLine(m)} style={{ padding: '12px 14px', borderRadius: 'var(--radius)', border: active ? '1px solid var(--gold)' : '1px solid var(--border)', background: active ? 'var(--gold-glow)' : 'var(--bg-2)', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: active ? 'var(--gold)' : 'var(--text)' }}>{m.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#2ecc71' }}>+{fmtM(m.weeklyRevenue)}/wk</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.description}</div>
                    <div style={{ fontSize: 12, color: '#e74c3c', marginTop: 2 }}>Setup: {fmtM(m.cost)}</div>
                  </div>
                );
              })}
            </div>
            <button className="btn btn-gold btn-lg w-full" style={{ marginTop: 16 }} onClick={handleMerch}>
              <IconShirt size={18} /> Launch {merchLine.name}
            </button>
          </div>
        </div>
      )}

      {/* ── DROP CONFIRM ── */}
      {selected && modal === 'drop' && (
        <div className="confirm-dialog">
          <div className="confirm-box">
            <IconTrash size={28} color="#e74c3c" style={{ margin: '0 auto 12px', display: 'block' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Drop {selected.name}?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 6 }}>
              Buyout: <strong style={{ color: '#e74c3c' }}>{fmtM(selected.contract.weeklyFee * 8)}</strong>
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline w-full" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={handleDrop}>Drop</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
