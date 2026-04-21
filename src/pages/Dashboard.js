import React, { useState } from 'react';
import { IconTrendingUp, IconDollarSign, IconUsers, IconMusic, IconZap, IconAward, IconSave, IconChevronDown, IconRepeat } from '../components/Icons';
import { LABEL_TIERS } from '../data/gameData';

function fmtMoney(n) {
  if (n === undefined || n === null) return '$0';
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}

function getLabelTier(totalRevenue) {
  let tier = LABEL_TIERS[0];
  for (const t of LABEL_TIERS) { if (totalRevenue >= t.minRevenue) tier = t; }
  return tier;
}

function getNextTier(totalRevenue) {
  for (const t of LABEL_TIERS) { if (totalRevenue < t.minRevenue) return t; }
  return null;
}

export default function Dashboard({ game, advanceWeek, manualSave }) {
  const [showReport, setShowReport] = useState(false);

  if (!game) return null;

  const tier = getLabelTier(game.totalRevenue);
  const nextTier = getNextTier(game.totalRevenue);
  const progress = nextTier ? (game.totalRevenue / nextTier.minRevenue) * 100 : 100;

  const weeklyIncome = game.weeklyReport
    ? game.weeklyReport.streamRevenue + game.weeklyReport.tourRevenue + game.weeklyReport.merchRevenue
    : 0;

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--gold-dim)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
              {tier.icon} {tier.name}
            </div>
            <h1 style={{ fontSize: 24, fontFamily: 'var(--font-display)', color: 'var(--gold-light)', letterSpacing: '0.04em', lineHeight: 1.1 }}>
              {game.labelName}
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
              CEO: {game.ownerName}
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={manualSave} style={{ gap: 6 }}>
            <IconSave size={14} />
            Save
          </button>
        </div>

        {/* Date */}
        <div style={{ marginTop: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
            Week {game.week} · {getMonthName(game.month)} {game.year}
          </span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold-dim)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Fame: {Math.round(game.labelFame)}/100
          </span>
        </div>

        {/* Tier progress */}
        {nextTier && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                → {nextTier.name}
              </span>
              <span style={{ fontSize: 11, color: 'var(--gold-dim)', fontFamily: 'var(--font-mono)' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(100, progress)}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Cash */}
      <div style={cashCardStyle}>
        <div style={{ fontSize: 11, color: 'rgba(10,8,4,0.6)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
          Cash Balance
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 500, color: '#0a0804', lineHeight: 1 }}>
          {fmtMoney(game.cash)}
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(10,8,4,0.55)' }}>
          Total earned: {fmtMoney(game.totalRevenue)} · Spent: {fmtMoney(game.totalExpenses)}
        </div>
      </div>

      {/* Stats grid */}
      <div className="stat-grid mt-12">
        <div className="stat-cell">
          <div className="val">{game.roster.length}</div>
          <div className="lbl">Artists Signed</div>
        </div>
        <div className="stat-cell">
          <div className="val">{game.releases.length}</div>
          <div className="lbl">Releases</div>
        </div>
        <div className="stat-cell">
          <div className="val">{game.activeTours.length}</div>
          <div className="lbl">Active Tours</div>
        </div>
        <div className="stat-cell">
          <div className="val">{game.syncDeals.length}</div>
          <div className="lbl">Sync Deals</div>
        </div>
      </div>

      {/* Weekly report */}
      {game.weeklyReport && (
        <div className="card mt-12" style={{ cursor: 'pointer' }} onClick={() => setShowReport(!showReport)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconTrendingUp size={16} color="var(--gold)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--gold)' }}>
                Week {game.weeklyReport.week} Report
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: game.weeklyReport.netIncome >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                {game.weeklyReport.netIncome >= 0 ? '+' : ''}{fmtMoney(game.weeklyReport.netIncome)}
              </span>
              <IconChevronDown size={16} color="var(--text-muted)" style={{ transform: showReport ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </div>
          </div>

          {showReport && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              {[
                { label: 'Streaming Revenue', val: game.weeklyReport.streamRevenue, pos: true },
                { label: 'Tour Revenue', val: game.weeklyReport.tourRevenue, pos: true },
                { label: 'Merch Revenue', val: game.weeklyReport.merchRevenue, pos: true },
                { label: 'Artist Fees', val: game.weeklyReport.artistFees, pos: false },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: row.pos ? 'var(--success)' : 'var(--danger)' }}>
                    {row.pos ? '+' : '-'}{fmtMoney(row.val)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Top releases */}
      {game.releases.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="section-header">
            <span className="section-title">Active Releases</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {game.releases.filter(r => r.active).length} active
            </span>
          </div>
          {game.releases.filter(r => r.active).slice(0, 3).map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 14, color: 'var(--text)' }}>{r.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {r.artistName} · {r.type.toUpperCase()} · Q: {r.quality}/100
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)' }}>
                  {fmtStreams(r.weeklyStreams)}/wk
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                  {fmtMoney(r.revenue)} total
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rivals */}
      <div style={{ marginTop: 20 }}>
        <div className="section-header">
          <span className="section-title">Industry Rivals</span>
        </div>
        {game.rivals.slice(0, 4).map(r => (
          <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 13 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.tier}</div>
            </div>
            <div className="badge badge-muted">{r.strength}/100</div>
          </div>
        ))}
      </div>

      {/* Advance week button */}
      <button
        className="btn btn-gold btn-lg w-full gold-pulse"
        onClick={advanceWeek}
        style={{ marginTop: 24, letterSpacing: '0.1em' }}
      >
        <IconRepeat size={18} />
        Advance Week
      </button>

      <div style={{ marginTop: 8, textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
        Auto-saves every 60 seconds
      </div>
    </div>
  );
}

function getMonthName(m) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1] || '';
}

function fmtStreams(n) {
  if (!n) return '0';
  if (n >= 1e6) return `${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n/1e3).toFixed(0)}K`;
  return String(n);
}

const cashCardStyle = {
  background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
  borderRadius: 'var(--radius-lg)',
  padding: '20px 20px',
  marginTop: 16,
  boxShadow: '0 8px 32px rgba(201,168,76,0.2)',
};
