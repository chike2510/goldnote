import React, { useState } from 'react';
import { IconX, IconMusic, IconMap, IconShirt, IconTrash, IconPlus, IconMic, IconStar, IconZap, IconClock } from '../components/Icons';
import { PRODUCERS, TOUR_TIERS, MERCH_LINES } from '../data/gameData';

function fmtMoney(n) {
  if (!n) return '$0';
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n)}`;
}

function getMoodColor(m) {
  if (m >= 75) return 'var(--success)';
  if (m >= 50) return '#f39c12';
  return 'var(--danger)';
}

export default function Roster({ game, releaseMusic, bookTour, launchMerch, dropArtist }) {
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // 'release' | 'tour' | 'merch' | 'drop'

  // Release form state
  const [releaseForm, setReleaseForm] = useState({ type: 'single', producerId: '', mvBudget: 50000, title: '' });
  // Tour form
  const [tourTier, setTourTier] = useState(TOUR_TIERS[0]);
  // Merch form
  const [merchLine, setMerchLine] = useState(MERCH_LINES[0]);
  // Drop confirm
  const [dropConfirm, setDropConfirm] = useState(false);

  const openArtist = (a) => { setSelected(a); setModal(null); };
  const close = () => { setSelected(null); setModal(null); setDropConfirm(false); };

  const handleRelease = () => {
    releaseMusic(selected.id, releaseForm.type, releaseForm.producerId || null, releaseForm.mvBudget, releaseForm.title || undefined);
    close();
  };

  const handleTour = () => {
    bookTour(selected.id, tourTier);
    close();
  };

  const handleMerch = () => {
    launchMerch(selected.id, merchLine);
    close();
  };

  const handleDrop = () => {
    dropArtist(selected.id);
    close();
  };

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
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20, letterSpacing: '0.05em' }}>
          Your Roster
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          {game.roster.length} artist{game.roster.length !== 1 ? 's' : ''} signed
        </p>
      </div>

      {game.roster.map(artist => (
        <div key={artist.id} className="artist-card" style={{ marginBottom: 10 }} onClick={() => openArtist(artist)}>
          <div className="artist-avatar">{artist.name.charAt(0)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)' }}>{artist.name}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {artist.contract.weeksRemaining <= 8 && (
                  <span className="badge badge-warn">Expiring</span>
                )}
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {artist.genre} · {artist.contract.dealType || artist.contract.royaltySplit ? `${artist.contract.dealType}` : 'Signed'}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--gold)' }}>⭐ {artist.fame}</span>
              <span style={{ fontSize: 11, color: getMoodColor(artist.mood) }}>
                😊 {artist.mood >= 75 ? 'Happy' : artist.mood >= 50 ? 'Neutral' : 'Unhappy'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                <IconClock size={10} color="var(--text-muted)" /> {artist.contract.weeksRemaining}wk left
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Artist Detail Modal */}
      {selected && !modal && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="artist-avatar" style={{ width: 52, height: 52, fontSize: 20 }}>{selected.name.charAt(0)}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 18 }}>{selected.name}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.genre} · {selected.style}</p>
                </div>
              </div>
              <button onClick={close} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            <div className="stat-grid mb-16">
              <div className="stat-cell"><div className="val">{selected.fame}</div><div className="lbl">Fame</div></div>
              <div className="stat-cell"><div className="val">{selected.talent}</div><div className="lbl">Talent</div></div>
              <div className="stat-cell"><div className="val" style={{ color: getMoodColor(selected.mood) }}>{selected.mood}</div><div className="lbl">Mood</div></div>
              <div className="stat-cell"><div className="val">{selected.contract.weeksRemaining}</div><div className="lbl">Wks Left</div></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <button className="btn btn-outline" onClick={() => setModal('release')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconMusic size={20} color="var(--gold)" />
                <span style={{ fontSize: 11 }}>Release</span>
              </button>
              <button className="btn btn-outline" onClick={() => setModal('tour')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconMap size={20} color="var(--gold)" />
                <span style={{ fontSize: 11 }}>Book Tour</span>
              </button>
              <button className="btn btn-outline" onClick={() => setModal('merch')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconShirt size={20} color="var(--gold)" />
                <span style={{ fontSize: 11 }}>Merch Line</span>
              </button>
              <button className="btn btn-danger" onClick={() => setModal('drop')} style={{ flexDirection: 'column', gap: 4, padding: '14px 8px', minHeight: 64 }}>
                <IconTrash size={20} color="#e74c3c" />
                <span style={{ fontSize: 11 }}>Drop Artist</span>
              </button>
            </div>

            {/* Artist's releases */}
            {game.releases.filter(r => r.artistId === selected.id).length > 0 && (
              <>
                <div className="divider" />
                <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 8 }}>
                  Releases
                </div>
                {game.releases.filter(r => r.artistId === selected.id).map(r => (
                  <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 13 }}>{r.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.type} · Q:{r.quality}</div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--gold-dim)' }}>
                      {fmtMoney(r.revenue)}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Release modal */}
      {selected && modal === 'release' && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>New Release — {selected.name}</h3>
              <button onClick={() => setModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            <div className="form-group">
              <label>Release Title</label>
              <input
                value={releaseForm.title}
                onChange={e => setReleaseForm(f => ({ ...f, title: e.target.value }))}
                placeholder={`${selected.name} - Untitled`}
              />
            </div>

            <div className="form-group">
              <label>Release Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['single','ep','album'].map(t => (
                  <button
                    key={t}
                    onClick={() => setReleaseForm(f => ({ ...f, type: t }))}
                    style={{
                      flex: 1, padding: '10px 4px',
                      border: releaseForm.type === t ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: releaseForm.type === t ? 'var(--gold-glow)' : 'var(--bg-2)',
                      color: releaseForm.type === t ? 'var(--gold)' : 'var(--text-muted)',
                      borderRadius: 'var(--radius)', fontFamily: 'var(--font-display)', fontSize: 12,
                      letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', minHeight: 44,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Producer (optional)</label>
              <select value={releaseForm.producerId} onChange={e => setReleaseForm(f => ({ ...f, producerId: e.target.value }))}>
                <option value="">No producer (save money)</option>
                {PRODUCERS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.specialty} · ${(p.cost/1000).toFixed(0)}K
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Music Video Budget: {fmtMoney(releaseForm.mvBudget)}</label>
              <input
                type="range" min={0} max={1000000} step={10000}
                value={releaseForm.mvBudget}
                onChange={e => setReleaseForm(f => ({ ...f, mvBudget: Number(e.target.value) }))}
                style={{ padding: 0, height: 'auto', minHeight: 'auto', border: 'none', background: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                <span>$0</span><span>$1M</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 14px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                Estimated cost: <strong style={{ color: '#e74c3c' }}>
                  {fmtMoney(releaseForm.mvBudget + (releaseForm.producerId ? (PRODUCERS.find(p=>p.id===releaseForm.producerId)?.cost||0) : 0))}
                </strong>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Quality bonuses: {releaseForm.producerId ? '+15' : '+0'} (producer) · {releaseForm.mvBudget > 200000 ? '+10' : '+0'} (MV)
              </div>
            </div>

            <button className="btn btn-gold btn-lg w-full" onClick={handleRelease}>
              <IconMusic size={18} /> Drop Release
            </button>
          </div>
        </div>
      )}

      {/* Tour modal */}
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
                return (
                  <div
                    key={t.id}
                    onClick={() => setTourTier(t)}
                    style={{
                      padding: '12px 14px', borderRadius: 'var(--radius)',
                      border: active ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: active ? 'var(--gold-glow)' : 'var(--bg-2)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: active ? 'var(--gold)' : 'var(--text)' }}>{t.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: profit > 0 ? 'var(--success)' : '#e74c3c' }}>
                        +{fmtMoney(profit)} net
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {t.venues} shows · {t.capacity.toLocaleString()} cap · ${t.ticketPrice}/ticket
                    </div>
                    <div style={{ fontSize: 12, color: '#e74c3c', marginTop: 2 }}>
                      Cost: {fmtMoney(t.cost)}
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="btn btn-gold btn-lg w-full" style={{ marginTop: 16 }} onClick={handleTour}>
              <IconMap size={18} /> Book {tourTier.name}
            </button>
          </div>
        </div>
      )}

      {/* Merch modal */}
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
                  <div
                    key={m.id}
                    onClick={() => setMerchLine(m)}
                    style={{
                      padding: '12px 14px', borderRadius: 'var(--radius)',
                      border: active ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: active ? 'var(--gold-glow)' : 'var(--bg-2)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: active ? 'var(--gold)' : 'var(--text)' }}>{m.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--success)' }}>+{fmtMoney(m.weeklyRevenue)}/wk</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.description}</div>
                    <div style={{ fontSize: 12, color: '#e74c3c', marginTop: 2 }}>Setup cost: {fmtMoney(m.cost)}</div>
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

      {/* Drop confirm */}
      {selected && modal === 'drop' && (
        <div className="confirm-dialog">
          <div className="confirm-box">
            <IconTrash size={28} color="#e74c3c" style={{ margin: '0 auto 12px', display: 'block' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Drop {selected.name}?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 6 }}>
              Buyout penalty: <strong style={{ color: '#e74c3c' }}>{fmtMoney(selected.contract.weeklyFee * 8)}</strong>
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              This action cannot be undone. The artist will return to the free agent market.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline w-full" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={handleDrop}>Drop Artist</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
