import React, { useState } from 'react';
import { IconPlus, IconX, IconStar, IconZap, IconMusic, IconDollarSign, IconChevronRight } from '../components/Icons';

function fmtMoney(n) {
  if (!n) return '$0';
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${n}`;
}

const DEAL_TYPES = [
  { id:'360', label:'360 Deal', royalty: 0.15, desc:'Label gets 15% of ALL revenue streams', morale: -10 },
  { id:'standard', label:'Standard Record Deal', royalty: 0.20, desc:'20% royalty rate, album obligation', morale: 0 },
  { id:'distribution', label:'Distribution Only', royalty: 0.30, desc:'30% cut, artist keeps most control', morale: 10 },
  { id:'joint', label:'Joint Venture', royalty: 0.50, desc:'50/50 split — full partnership', morale: 5 },
];

const CONTRACT_LENGTHS = [
  { weeks: 26, label: '6 Months' },
  { weeks: 52, label: '1 Year' },
  { weeks: 104, label: '2 Years' },
  { weeks: 208, label: '4 Years' },
];

export default function Market({ game, signArtist }) {
  const [selected, setSelected] = useState(null);
  const [deal, setDeal] = useState('standard');
  const [contract, setContract] = useState(52);
  const [filter, setFilter] = useState('all');

  const genres = ['all', ...new Set(game.marketArtists.map(a => a.genre))];

  const filtered = game.marketArtists.filter(a => {
    if (filter !== 'all' && a.genre !== filter) return false;
    return true;
  });

  const handleSign = () => {
    if (!selected) return;
    const dealType = DEAL_TYPES.find(d => d.id === deal);
    signArtist(selected.id, dealType.label, dealType.royalty, contract);
    setSelected(null);
  };

  const canAfford = (artist) => game.cash >= artist.signingBonus;

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20, letterSpacing: '0.05em' }}>
          Talent Market
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          {game.marketArtists.length} artists available · Market refreshes weekly
        </p>
      </div>

      {/* Genre filter */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 }}>
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.08em',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              border: filter === g ? '1px solid var(--gold)' : '1px solid var(--border)',
              background: filter === g ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: filter === g ? 'var(--gold)' : 'var(--text-muted)',
              cursor: 'pointer',
              minHeight: 36,
            }}
          >
            {g === 'all' ? 'All' : g}
          </button>
        ))}
      </div>

      {/* Artist list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(artist => {
          const affordable = canAfford(artist);
          return (
            <div
              key={artist.id}
              className="artist-card"
              style={{ opacity: affordable ? 1 : 0.6 }}
              onClick={() => setSelected(artist)}
            >
              <div className="artist-avatar">{artist.name.charAt(0)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)', letterSpacing: '0.02em' }}>
                      {artist.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {artist.genre} · {artist.style}
                    </div>
                  </div>
                  <div className={`badge ${affordable ? 'badge-gold' : 'badge-danger'}`}>
                    {fmtMoney(artist.signingBonus)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--gold)' }}>Fame {artist.fame}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Talent {artist.talent}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {fmtMoney(artist.weeklyFee)}/wk
                  </div>
                </div>
              </div>
              <IconChevronRight size={16} color="var(--text-muted)" />
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          <IconMusic size={32} color="var(--gold-dim)" style={{ margin: '0 auto 8px', display: 'block' }} />
          <p>No artists in this genre right now.</p>
        </div>
      )}

      {/* Sign modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="artist-avatar" style={{ width: 44, height: 44, fontSize: 18 }}>{selected.name.charAt(0)}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 18 }}>{selected.name}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.genre} · {selected.style}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close">
                <IconX size={20} color="var(--text-muted)" />
              </button>
            </div>

            {/* Artist stats */}
            <div className="stat-grid-3 mb-16">
              <div className="stat-cell">
                <div className="val">{selected.fame}</div>
                <div className="lbl">Fame</div>
              </div>
              <div className="stat-cell">
                <div className="val">{selected.talent}</div>
                <div className="lbl">Talent</div>
              </div>
              <div className="stat-cell">
                <div className="val">{selected.mood}</div>
                <div className="lbl">Mood</div>
              </div>
            </div>

            {/* Deal type */}
            <div className="form-group">
              <label>Deal Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DEAL_TYPES.map(d => (
                  <div
                    key={d.id}
                    onClick={() => setDeal(d.id)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius)',
                      border: deal === d.id ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: deal === d.id ? 'var(--gold-glow)' : 'var(--bg-2)',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: deal === d.id ? 'var(--gold)' : 'var(--text)' }}>
                        {d.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold-dim)' }}>
                        {Math.round(d.royalty * 100)}%
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract length */}
            <div className="form-group">
              <label>Contract Length</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {CONTRACT_LENGTHS.map(c => (
                  <button
                    key={c.weeks}
                    onClick={() => setContract(c.weeks)}
                    style={{
                      flex: 1,
                      padding: '8px 4px',
                      borderRadius: 'var(--radius)',
                      border: contract === c.weeks ? '1px solid var(--gold)' : '1px solid var(--border)',
                      background: contract === c.weeks ? 'var(--gold-glow)' : 'var(--bg-2)',
                      color: contract === c.weeks ? 'var(--gold)' : 'var(--text-muted)',
                      fontSize: 11,
                      fontFamily: 'var(--font-display)',
                      cursor: 'pointer',
                      minHeight: 40,
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost breakdown */}
            <div style={{ background: 'var(--bg-3)', borderRadius: 'var(--radius)', padding: '12px 14px', marginBottom: 16, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>Signing Bonus</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#e74c3c' }}>{fmtMoney(selected.signingBonus)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>Weekly Fee</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#e74c3c' }}>{fmtMoney(selected.weeklyFee)}/wk</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>Your Cash</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: canAfford(selected) ? 'var(--success)' : 'var(--danger)' }}>
                  {fmtMoney(game.cash)}
                </span>
              </div>
            </div>

            {!canAfford(selected) && (
              <div style={{ color: '#e74c3c', fontSize: 13, textAlign: 'center', marginBottom: 12 }}>
                ⚠️ Insufficient funds for signing bonus
              </div>
            )}

            <button
              className="btn btn-gold btn-lg w-full"
              onClick={handleSign}
              disabled={!canAfford(selected)}
              style={{ opacity: canAfford(selected) ? 1 : 0.5 }}
            >
              <IconPlus size={18} />
              Sign {selected.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
