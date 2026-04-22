import React, { useState } from 'react';
import { IconZap, IconAlertTriangle, IconStar, IconMusic, IconX } from '../components/Icons';

const severityStyle = {
  positive:  { border: '1px solid rgba(46,204,113,0.4)',  bg: 'rgba(46,204,113,0.06)',   accent: '#2ecc71' },
  medium:    { border: '1px solid rgba(230,126,34,0.4)',  bg: 'rgba(230,126,34,0.06)',   accent: '#f39c12' },
  high:      { border: '1px solid rgba(231,76,60,0.4)',   bg: 'rgba(231,76,60,0.06)',    accent: '#e74c3c' },
  critical:  { border: '1px solid rgba(192,57,43,0.6)',   bg: 'rgba(192,57,43,0.10)',    accent: '#c0392b' },
};

const typeIcons = {
  viral:    <IconZap size={22} color="#f39c12" />,
  scandal:  <IconAlertTriangle size={22} color="#e74c3c" />,
  crisis:   <IconAlertTriangle size={22} color="#c0392b" />,
  beef:     <IconZap size={22} color="#e74c3c" />,
  award:    <IconStar size={22} color="#f1c40f" />,
  collab:   <IconMusic size={22} color="#2ecc71" />,
  internal: <IconAlertTriangle size={22} color="#f39c12" />,
  tour:     <IconStar size={22} color="#3498db" />,
  release:  <IconMusic size={22} color="#9b59b6" />,
};

function fmtMoney(n) {
  if (!n && n !== 0) return 'Free';
  if (n < 0) return `+$${Math.abs(n).toLocaleString()}`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${n}`;
}

function getRiskColor(risk) {
  if (risk === 'high')   return '#e74c3c';
  if (risk === 'medium') return '#f39c12';
  return '#2ecc71';
}

export default function DramaModal({ event, game, onResolve, onDismiss }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  if (!event) return null;

  const sev = severityStyle[event.severity] || severityStyle.medium;
  const icon = typeIcons[event.type] || <IconZap size={22} color="var(--gold)" />;
  const headline = event.headline?.replace('[ARTIST]', event.artistName || 'Your Artist') || 'An event occurred';
  const hasStaff = (game?.staff?.pr || 0) >= 2;

  const confirm = () => {
    if (selected === null) return;
    onResolve(event, selected, event.artistId);
    setConfirmed(false);
    setSelected(null);
  };

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, border: sev.border, background: `linear-gradient(180deg, ${sev.bg} 0%, var(--bg-2) 100%)` }}>

        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: sev.bg, border: sev.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase', color: sev.accent, marginBottom: 2 }}>
                {event.type?.toUpperCase()} · {event.severity?.toUpperCase()}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                Wk {game?.week} · Requires your decision
              </div>
            </div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: sev.accent, boxShadow: `0 0 8px ${sev.accent}` }} />
        </div>

        {/* Headline */}
        <div style={{ ...styles.headline, borderLeft: `3px solid ${sev.accent}` }}>
          {headline}
        </div>

        {/* Artist badge */}
        {event.artistName && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gold-glow)', border: '1px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--gold)' }}>
              {event.artistName.charAt(0)}
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{event.artistName}</span>
          </div>
        )}

        {/* Choices */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
            Choose your response
          </div>
          {event.choices?.map((choice, i) => {
            const active = selected === i;
            // PR team unlocks extra analysis (flavor)
            return (
              <div
                key={i}
                onClick={() => { setSelected(i); setConfirmed(false); }}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius)',
                  border: active ? `1px solid ${sev.accent}` : '1px solid var(--border)',
                  background: active ? sev.bg : 'var(--bg-2)',
                  cursor: 'pointer',
                  marginBottom: 8,
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: active ? sev.accent : 'var(--text)', letterSpacing: '0.02em' }}>
                    {choice.label}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: choice.cost < 0 ? '#2ecc71' : choice.cost > 0 ? '#e74c3c' : 'var(--text-muted)' }}>
                    {choice.cost < 0 ? `+${fmtMoney(Math.abs(choice.cost))}` : choice.cost > 0 ? `-${fmtMoney(choice.cost)}` : 'Free'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{choice.desc}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <StatPill label="Streams" val={choice.streamBoost} suffix="%" />
                  <StatPill label="Fame"    val={choice.fameDelta} />
                  <StatPill label="Mood"    val={choice.moodDelta} />
                  {choice.loyaltyDelta && <StatPill label="Loyalty" val={choice.loyaltyDelta} />}
                  <div style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, background: `${getRiskColor(choice.risk)}20`, color: getRiskColor(choice.risk), border: `1px solid ${getRiskColor(choice.risk)}40`, fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {choice.risk} risk
                  </div>
                  {choice.dropsArtist && (
                    <div style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, background: 'var(--danger-dim)', color: '#e74c3c', border: '1px solid rgba(231,76,60,0.3)', fontFamily: 'var(--font-display)' }}>
                      DROPS ARTIST
                    </div>
                  )}
                </div>
                {/* PR team insight */}
                {hasStaff && active && (
                  <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(46,204,113,0.05)', border: '1px solid rgba(46,204,113,0.15)', borderRadius: 'var(--radius)', fontSize: 11, color: '#2ecc71' }}>
                    🎯 PR Team: {choice.risk === 'low' ? 'Safe move. Damage containable.' : choice.risk === 'medium' ? 'Calculated risk. Monitor closely.' : 'Volatile. Prepare for blowback.'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Confirm */}
        <button
          className="btn btn-gold btn-lg w-full"
          onClick={confirm}
          disabled={selected === null}
          style={{ opacity: selected === null ? 0.45 : 1, marginTop: 8 }}
        >
          {selected === null ? 'Select a response above' : `Confirm: ${event.choices?.[selected]?.label}`}
        </button>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>
          This decision will affect your artist's stats and public perception.
        </p>
      </div>
    </div>
  );
}

function StatPill({ label, val, suffix = '' }) {
  if (!val && val !== 0) return null;
  const color = val > 0 ? '#2ecc71' : val < 0 ? '#e74c3c' : 'var(--text-muted)';
  return (
    <div style={{ fontSize: 10, padding: '2px 6px', borderRadius: 2, background: `${color}15`, color, border: `1px solid ${color}30`, fontFamily: 'var(--font-mono)' }}>
      {val > 0 ? '+' : ''}{val}{suffix} {label}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(6px)',
    zIndex: 800,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '16px',
    animation: 'fadeIn 0.2s ease',
  },
  modal: {
    width: '100%',
    maxWidth: 480,
    borderRadius: '12px 12px 0 0',
    padding: '20px 20px 28px',
    maxHeight: '88vh',
    overflowY: 'auto',
    animation: 'slideUp 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headline: {
    fontSize: 15,
    lineHeight: 1.55,
    color: 'var(--text)',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: 'var(--radius)',
    marginBottom: 14,
  },
};
