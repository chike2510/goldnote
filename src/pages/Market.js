import React, { useState } from 'react';
import { IconPlus, IconX, IconInfo, IconZap } from '../components/Icons';

function fmtM(n) {
  if (!n) return '$0';
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${n}`;
}

const DEAL_TYPES = [
  { id:'360',          label:'360 Deal',           royalty:0.15, desc:'Label gets 15% of ALL revenue streams',       moodImpact:-10 },
  { id:'standard',     label:'Standard Record Deal',royalty:0.20, desc:'20% royalty — standard album obligation',     moodImpact:0   },
  { id:'distribution', label:'Distribution Only',   royalty:0.30, desc:'30% cut — artist keeps most creative control',moodImpact:10  },
  { id:'joint',        label:'Joint Venture',       royalty:0.50, desc:'50/50 split — full partnership',              moodImpact:5   },
];

const CONTRACT_LENGTHS = [
  { weeks:26,  label:'6 Months' },
  { weeks:52,  label:'1 Year'   },
  { weeks:104, label:'2 Years'  },
  { weeks:208, label:'4 Years'  },
];

export default function Market({ game, signArtist }) {
  const [selected, setSelected] = useState(null);
  const [deal, setDeal] = useState('standard');
  const [contractLen, setContractLen] = useState(52);
  const [filter, setFilter] = useState('all');

  const genres = ['all', 'Real Artists', 'AI Artists', ...new Set(game.marketArtists.map(a => a.genre))].filter((v, i, arr) => arr.indexOf(v) === i);

  const filtered = game.marketArtists.filter(a => {
    if (filter === 'Real Artists') return a.isReal;
    if (filter === 'AI Artists')   return !a.isReal;
    if (filter !== 'all' && a.genre !== filter) return false;
    return true;
  });

  const canAfford = (a) => game.cash >= a.signingBonus;

  const handleSign = () => {
    if (!selected) return;
    const dt = DEAL_TYPES.find(d => d.id === deal);
    signArtist(selected.id, dt.label, dt.royalty, contractLen);
    setSelected(null);
  };

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20 }}>Talent Market</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          {game.marketArtists.length} available · Refreshes weekly · {game.marketArtists.filter(a => !a.isReal).length} AI artists
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 14 }}>
        {genres.map(g => (
          <button key={g} onClick={() => setFilter(g)} style={{
            padding: '5px 12px', borderRadius: 20, fontSize: 11,
            fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'capitalize', whiteSpace: 'nowrap',
            border: filter === g ? '1px solid var(--gold)' : '1px solid var(--border)',
            background: filter === g ? 'rgba(201,168,76,0.12)' : 'transparent',
            color: filter === g ? 'var(--gold)' : 'var(--text-muted)',
            cursor: 'pointer', minHeight: 34,
          }}>
            {g}
          </button>
        ))}
      </div>

      {/* Artist list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(artist => {
          const affordable = canAfford(artist);
          return (
            <div key={artist.id} className="artist-card" style={{ opacity: affordable ? 1 : 0.55 }} onClick={() => setSelected(artist)}>
              <div className="artist-avatar">{artist.name.charAt(0)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)' }}>{artist.name}</span>
                      {!artist.isReal && (
                        <span style={{ fontSize: 9, padding: '1px 5px', background: 'rgba(155,89,182,0.15)', border: '1px solid rgba(155,89,182,0.4)', borderRadius: 2, color: '#9b59b6', fontFamily: 'var(--font-display)' }}>
                          AI
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {artist.genre} · {artist.region}
                      {artist.archetype ? ` · ${artist.archetype}` : ''}
                    </div>
                  </div>
                  <div className={`badge ${affordable ? 'badge-gold' : 'badge-danger'}`}>{fmtM(artist.signingBonus)}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--gold)' }}>★ {artist.fame}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Talent {artist.talent}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{fmtM(artist.weeklyFee)}/wk</span>
                  {!artist.isReal && artist.viralProbability > 55 && (
                    <span style={{ fontSize: 11, color: '#f39c12', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconZap size={10} color="#f39c12" />Viral
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
            <p>No artists in this filter. Try another category or advance a week.</p>
          </div>
        )}
      </div>

      {/* Sign modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="artist-avatar" style={{ width: 46, height: 46, fontSize: 18 }}>{selected.name.charAt(0)}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 18 }}>{selected.name}</h3>
                    {!selected.isReal && <span style={{ fontSize: 9, padding: '1px 5px', background: 'rgba(155,89,182,0.15)', border: '1px solid rgba(155,89,182,0.4)', borderRadius: 2, color: '#9b59b6', fontFamily: 'var(--font-display)' }}>AI</span>}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selected.genre} · {selected.region}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close"><IconX size={20} color="var(--text-muted)" /></button>
            </div>

            {/* Stats */}
            <div className="stat-grid-3 mb-12">
              <div className="stat-cell"><div className="val">{selected.fame}</div><div className="lbl">Fame</div></div>
              <div className="stat-cell"><div className="val">{selected.talent}</div><div className="lbl">Talent</div></div>
              <div className="stat-cell"><div className="val">{selected.mood || 75}</div><div className="lbl">Mood</div></div>
            </div>

            {/* Extended attributes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
              {[
                { label: 'Work Ethic',   val: selected.workEthic   || '?' },
                { label: 'Creativity',   val: selected.creativity  || '?' },
                { label: 'Loyalty',      val: selected.loyalty     || '?' },
                { label: 'Ego',          val: selected.ego         || '?' },
                { label: 'Controversy',  val: selected.controversyLevel || '?' },
                { label: 'Career Phase', val: selected.careerPhase || 'rise' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', background: 'var(--bg-3)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* AI hint box */}
            {!selected.isReal && (
              <div style={{ padding: '8px 12px', background: 'rgba(155,89,182,0.08)', border: '1px solid rgba(155,89,182,0.2)', borderRadius: 'var(--radius)', marginBottom: 14, fontSize: 12, color: 'rgba(155,89,182,0.85)' }}>
                <IconInfo size={12} color="rgba(155,89,182,0.85)" style={{ display: 'inline', marginRight: 5 }} />
                AI-generated artist. Stats shown are observable. Hidden potential, viral probability, and burnout risk are unknown until you sign them.
              </div>
            )}

            {/* Deal type */}
            <div className="form-group">
              <label>Deal Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DEAL_TYPES.map(d => (
                  <div key={d.id} onClick={() => setDeal(d.id)} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: deal === d.id ? '1px solid var(--gold)' : '1px solid var(--border)', background: deal === d.id ? 'var(--gold-glow)' : 'var(--bg-2)', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: deal === d.id ? 'var(--gold)' : 'var(--text)' }}>{d.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold-dim)' }}>{Math.round(d.royalty * 100)}%</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{d.desc}</div>
                    <div style={{ fontSize: 11, color: d.moodImpact >= 0 ? '#2ecc71' : '#e74c3c', marginTop: 2 }}>
                      Artist mood: {d.moodImpact >= 0 ? '+' : ''}{d.moodImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract length */}
            <div className="form-group">
              <label>Contract Length</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {CONTRACT_LENGTHS.map(c => (
                  <button key={c.weeks} onClick={() => setContractLen(c.weeks)} style={{
                    flex: 1, padding: '8px 2px', borderRadius: 'var(--radius)',
                    border: contractLen === c.weeks ? '1px solid var(--gold)' : '1px solid var(--border)',
                    background: contractLen === c.weeks ? 'var(--gold-glow)' : 'var(--bg-2)',
                    color: contractLen === c.weeks ? 'var(--gold)' : 'var(--text-muted)',
                    fontSize: 10, fontFamily: 'var(--font-display)', cursor: 'pointer', minHeight: 40,
                  }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost summary */}
            <div style={{ background: 'var(--bg-3)', borderRadius: 'var(--radius)', padding: '12px 14px', marginBottom: 16, border: '1px solid var(--border)' }}>
              {[
                { label: 'Signing Bonus',  val: selected.signingBonus, neg: true  },
                { label: 'Weekly Fee',     val: selected.weeklyFee,    neg: true, suffix: '/wk' },
                { label: 'Your Cash',      val: game.cash,             neg: false },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: row.neg ? '#e74c3c' : canAfford(selected) ? '#2ecc71' : '#e74c3c' }}>
                    {fmtM(row.val)}{row.suffix || ''}
                  </span>
                </div>
              ))}
            </div>

            {!canAfford(selected) && (
              <div style={{ color: '#e74c3c', fontSize: 13, textAlign: 'center', marginBottom: 12 }}>
                ⚠️ Insufficient funds for signing bonus
              </div>
            )}

            <button className="btn btn-gold btn-lg w-full" onClick={handleSign} disabled={!canAfford(selected)} style={{ opacity: canAfford(selected) ? 1 : 0.5 }}>
              <IconPlus size={18} /> Sign {selected.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
