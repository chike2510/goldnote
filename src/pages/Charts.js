import React from 'react';
import { IconBarChart, IconTrendingUp, IconMusic, IconStar } from '../components/Icons';

function fmtStreams(n) {
  if (!n) return '0';
  if (n >= 1e6) return `${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n/1e3).toFixed(0)}K`;
  return String(n);
}

export default function Charts({ game }) {
  const charts = game.charts || [];
  const yourReleases = game.releases.filter(r => r.active).sort((a, b) => b.weeklyStreams - a.weeklyStreams);

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20, letterSpacing: '0.05em' }}>
          Global Charts
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          Week {game.week} · {game.charts?.filter(c => c.isYours).length || 0} of your tracks charting
        </p>
      </div>

      {/* Global Top 15 */}
      <div className="section-header">
        <span className="section-title">Global Top 15</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {charts.map((song, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 0',
              borderBottom: '1px solid var(--border)',
              background: song.isYours ? 'rgba(201,168,76,0.03)' : 'transparent',
            }}
          >
            {/* Rank */}
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              background: song.rank <= 3 ? 'linear-gradient(135deg, var(--gold-dim), var(--gold))' : 'var(--bg-2)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 700,
              color: song.rank <= 3 ? '#0a0804' : 'var(--text-dim)',
              flexShrink: 0,
            }}>
              {song.rank}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14, color: song.isYours ? 'var(--gold-light)' : 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {song.title}
                </span>
                {song.isYours && (
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-display)', letterSpacing: '0.1em', background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', padding: '1px 6px', borderRadius: 2, flexShrink: 0 }}>
                    YOURS
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {song.artist}
              </div>
            </div>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: song.isYours ? 'var(--gold)' : 'var(--text-dim)' }}>
                {fmtStreams(song.streams)}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>streams/wk</div>
            </div>
          </div>
        ))}
      </div>

      {/* Your releases performance */}
      {yourReleases.length > 0 && (
        <>
          <div className="section-header mt-24">
            <span className="section-title">Your Releases</span>
          </div>
          {yourReleases.map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 14, color: 'var(--text)' }}>{r.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {r.artistName} · {r.type} · Wk {r.week}
                </div>
                <div style={{ marginTop: 6 }}>
                  <div className="progress-bar" style={{ width: 120 }}>
                    <div className="progress-fill" style={{ width: `${r.quality}%` }} />
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Quality: {r.quality}/100</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--gold)' }}>
                  {fmtStreams(r.weeklyStreams)}/wk
                </div>
                <div style={{ fontSize: 11, color: 'var(--success)', marginTop: 2 }}>
                  ${(r.revenue/1000).toFixed(0)}K earned
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>
                  {(r.totalStreams/1000000).toFixed(1)}M total streams
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {yourReleases.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
          <IconMusic size={32} color="var(--gold-dim)" style={{ margin: '0 auto 8px', display: 'block' }} />
          <p>Sign artists and release music to appear on the charts.</p>
        </div>
      )}
    </div>
  );
}
