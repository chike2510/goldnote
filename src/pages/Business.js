import React, { useState } from 'react';
import { IconFilm, IconMap, IconShirt, IconDollarSign, IconX, IconPlus, IconGlobe } from '../components/Icons';
import { SYNC_DEALS } from '../data/gameData';

function fmtMoney(n) {
  if (!n) return '$0';
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n)}`;
}

export default function Business({ game, acceptSyncDeal }) {
  const [tab, setTab] = useState('sync');
  const [syncModal, setSyncModal] = useState(null);

  // Generate available sync deals (random subset based on week)
  const availableSync = SYNC_DEALS.filter((_, i) => (game.week + i) % 3 !== 0).slice(0, 5);

  const rosterArtists = game.roster;

  const [selectedArtist, setSelectedArtist] = useState('');

  const handleAcceptSync = () => {
    if (!selectedArtist || !syncModal) return;
    acceptSyncDeal(selectedArtist, syncModal);
    setSyncModal(null);
    setSelectedArtist('');
  };

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20, letterSpacing: '0.05em' }}>
          Business Hub
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          Sync deals, tours, merchandise
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 16, background: 'var(--bg-2)', borderRadius: 'var(--radius)', padding: 4, border: '1px solid var(--border)' }}>
        {[
          { id: 'sync', label: 'Sync Deals', icon: <IconFilm size={14} /> },
          { id: 'tours', label: 'Tours', icon: <IconMap size={14} /> },
          { id: 'merch', label: 'Merch', icon: <IconShirt size={14} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '8px 4px', borderRadius: 'var(--radius)',
              background: tab === t.id ? 'linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.5))' : 'transparent',
              color: tab === t.id ? '#0a0804' : 'var(--text-muted)',
              fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', border: 'none', minHeight: 40, transition: 'all 0.2s',
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Sync Deals Tab */}
      {tab === 'sync' && (
        <div>
          {game.syncDeals.length > 0 && (
            <>
              <div className="section-header">
                <span className="section-title">Completed Deals ({game.syncDeals.length})</span>
              </div>
              <div style={{ marginBottom: 16 }}>
                {game.syncDeals.slice(-5).reverse().map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text)' }}>{d.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.artistName} · {d.platform}</div>
                    </div>
                    <div className="badge badge-success">{fmtMoney(d.fee)}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="section-header">
            <span className="section-title">Available Deals</span>
          </div>

          {rosterArtists.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 14 }}>
              Sign artists to unlock sync deal opportunities.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {availableSync.map(deal => (
                <div
                  key={deal.id}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)', padding: '14px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onClick={() => setSyncModal(deal)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--gold-glow)', border: '1px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconGlobe size={16} color="var(--gold)" />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text)', letterSpacing: '0.02em' }}>{deal.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{deal.platform}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--gold-light)' }}>{fmtMoney(deal.fee)}</div>
                      <div style={{ fontSize: 11, color: 'var(--success)' }}>+{deal.fameBonus} fame</div>
                    </div>
                  </div>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: 8, width: '100%' }}>
                    <IconPlus size={14} /> Accept Deal
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tours Tab */}
      {tab === 'tours' && (
        <div>
          <div className="section-header">
            <span className="section-title">Active Tours ({game.activeTours.length})</span>
          </div>
          {game.activeTours.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 14 }}>
              No tours running. Go to Roster to book a tour for an artist.
            </div>
          ) : (
            game.activeTours.map(tour => (
              <div key={tour.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)' }}>{tour.artistName}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tour.tier}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--success)' }}>+{fmtMoney(tour.weeklyRevenue)}/wk</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{tour.weeksRemaining} wks left</div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.max(5, 100 - (tour.weeksRemaining / 10) * 100)}%` }} />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Merch Tab */}
      {tab === 'merch' && (
        <div>
          <div className="section-header">
            <span className="section-title">Merch Lines ({game.activeMerch.length})</span>
            {game.activeMerch.length > 0 && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--success)' }}>
                +{fmtMoney(game.activeMerch.reduce((s, m) => s + m.weeklyRevenue, 0))}/wk total
              </span>
            )}
          </div>
          {game.activeMerch.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 14 }}>
              No merch lines. Launch one from the Roster page.
            </div>
          ) : (
            game.activeMerch.map(m => (
              <div key={m.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)' }}>{m.line}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.artistName}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--success)' }}>+{fmtMoney(m.weeklyRevenue)}/wk</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sync deal modal */}
      {syncModal && (
        <div className="modal-overlay" onClick={() => setSyncModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}>Accept Sync Deal</h3>
              <button onClick={() => setSyncModal(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            <div style={{ background: 'var(--bg-3)', borderRadius: 'var(--radius)', padding: '14px', marginBottom: 16, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--gold-light)', marginBottom: 4 }}>{syncModal.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Platform: {syncModal.platform}</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--gold)' }}>{fmtMoney(syncModal.fee)}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sync Fee</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--success)' }}>+{syncModal.fameBonus}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Fame Boost</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Select Artist</label>
              <select value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)}>
                <option value="">Choose an artist...</option>
                {rosterArtists.map(a => (
                  <option key={a.id} value={a.id}>{a.name} — {a.genre}</option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-gold btn-lg w-full"
              onClick={handleAcceptSync}
              disabled={!selectedArtist}
              style={{ opacity: selectedArtist ? 1 : 0.5 }}
            >
              <IconDollarSign size={18} /> Accept Deal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
