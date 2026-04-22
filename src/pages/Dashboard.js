import React, { useState } from 'react';
import { IconRepeat, IconSave, IconChevronDown, IconTrendingUp, IconZap, IconStar, IconCheck } from '../components/Icons';
import { LABEL_TIERS, WEEKLY_OBJECTIVES } from '../data/gameData';

function fmtM(n) {
  if (n === undefined || n === null) return '$0';
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}
function fmtStreams(n) {
  if (!n) return '0';
  if (n >= 1e6) return `${(n/1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n/1e3).toFixed(0)}K`;
  return String(n);
}
function getMonthName(m) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][(m||1)-1] || '';
}
function getLabelTier(rev) {
  let t = LABEL_TIERS[0];
  for (const tier of LABEL_TIERS) { if (rev >= tier.minRevenue) t = tier; }
  return t;
}
function getNextTier(rev) {
  for (const t of LABEL_TIERS) { if (rev < t.minRevenue) return t; }
  return null;
}

export default function Dashboard({ game, advanceWeek, manualSave }) {
  const [showReport, setShowReport] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!game) return null;

  const tier = getLabelTier(game.totalRevenue);
  const nextTier = getNextTier(game.totalRevenue);
  const tierProgress = nextTier ? Math.min(100, (game.totalRevenue / nextTier.minRevenue) * 100) : 100;

  const imageColor = (game.imageHealth || 100) >= 70 ? 'var(--success)' : (game.imageHealth || 100) >= 40 ? '#f39c12' : '#e74c3c';

  const pendingObjs = WEEKLY_OBJECTIVES.filter(o => !(game.objectives || []).includes(o.id)).slice(0, 3);
  const completedCount = (game.objectives || []).length;

  const handleSave = () => {
    setSaving(true);
    manualSave();
    setTimeout(() => setSaving(false), 2000);
  };

  return (
    <div className="page">

      {/* Label header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--gold-dim)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
              {tier.name}
            </div>
            <h1 style={{ fontSize: 26, fontFamily: 'var(--font-display)', color: 'var(--gold-light)', letterSpacing: '0.04em', lineHeight: 1.1 }}>
              {game.labelName}
            </h1>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>CEO: {game.ownerName}</div>
          </div>
          <button className={`btn btn-outline btn-sm`} onClick={handleSave} style={{ gap: 6 }}>
            <IconSave size={14} />
            {saving ? 'Saved!' : 'Save'}
          </button>
        </div>

        {/* Date + fame + image */}
        <div style={{ marginTop: 10, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
            Week {game.week} · {getMonthName(game.month)} {game.year}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Fame <span style={{ color: 'var(--gold)' }}>{Math.round(game.labelFame)}</span>
          </span>
          <span style={{ fontSize: 12, color: imageColor }}>
            Image <span style={{ fontFamily: 'var(--font-mono)' }}>{Math.round(game.imageHealth || 100)}</span>
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
                {Math.round(tierProgress)}%
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${tierProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Cash card */}
      <div style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', marginBottom: 14, boxShadow: '0 8px 32px rgba(201,168,76,0.2)' }}>
        <div style={{ fontSize: 11, color: 'rgba(10,8,4,0.6)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>Cash Balance</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 38, fontWeight: 500, color: '#0a0804', lineHeight: 1 }}>
          {fmtM(game.cash)}
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(10,8,4,0.55)' }}>
          Earned {fmtM(game.totalRevenue)} total · Spent {fmtM(game.totalExpenses)}
        </div>
      </div>

      {/* Stats grid */}
      <div className="stat-grid mt-12" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { val: game.roster.length,                             lbl: 'Artists' },
          { val: game.releases.filter(r => r.active).length,   lbl: 'Releases' },
          { val: game.activeTours.length,                        lbl: 'Tours' },
          { val: game.syncDeals.length,                          lbl: 'Syncs' },
        ].map(s => (
          <div key={s.lbl} className="stat-cell" style={{ padding: '10px 8px' }}>
            <div className="val" style={{ fontSize: 20 }}>{s.val}</div>
            <div className="lbl" style={{ fontSize: 9 }}>{s.lbl}</div>
          </div>
        ))}
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
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: game.weeklyReport.netIncome >= 0 ? 'var(--success)' : '#e74c3c' }}>
                {game.weeklyReport.netIncome >= 0 ? '+' : ''}{fmtM(game.weeklyReport.netIncome)}
              </span>
              <IconChevronDown size={16} color="var(--text-muted)" style={{ transform: showReport ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </div>
          </div>

          {showReport && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              {[
                { label: 'Streaming',       val: game.weeklyReport.streamRevenue,  pos: true  },
                { label: 'Tours',           val: game.weeklyReport.tourRevenue,    pos: true  },
                { label: 'Merchandise',     val: game.weeklyReport.merchRevenue,   pos: true  },
                { label: 'Artist Fees',     val: game.weeklyReport.artistFees,     pos: false },
                { label: 'Staff Costs',     val: game.weeklyReport.staffCosts,     pos: false },
                { label: 'Loan Payments',   val: game.weeklyReport.loanPayments,   pos: false },
              ].map(row => row.val > 0 && (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: row.pos ? 'var(--success)' : '#e74c3c' }}>
                    {row.pos ? '+' : '-'}{fmtM(row.val)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Objectives mini-panel */}
      <div className="card mt-12" style={{ cursor: 'pointer' }} onClick={() => setShowObjectives(!showObjectives)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconStar size={16} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--gold)' }}>Objectives</span>
            <span className="badge badge-gold">{completedCount} done</span>
          </div>
          <IconChevronDown size={16} color="var(--text-muted)" style={{ transform: showObjectives ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
        </div>

        {showObjectives && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            {pendingObjs.map(obj => (
              <div key={obj.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <div>
                  <div style={{ fontSize: 13 }}>{obj.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{obj.desc}</div>
                </div>
                <div className="badge badge-gold" style={{ flexShrink: 0, marginLeft: 8 }}>{fmtM(obj.reward)}</div>
              </div>
            ))}
            {pendingObjs.length === 0 && <p style={{ fontSize: 13, color: 'var(--success)' }}>All current objectives complete!</p>}
          </div>
        )}
      </div>

      {/* Active releases */}
      {game.releases.filter(r => r.active).length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div className="section-header">
            <span className="section-title">Charting Releases</span>
          </div>
          {game.releases.filter(r => r.active).sort((a, b) => b.weeklyStreams - a.weeklyStreams).slice(0, 4).map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{r.title}</span>
                  {r.viralHit && <IconZap size={12} color="#f39c12" />}
                  {!r.artistId?.startsWith('ai') && r.isAI === false ? null : <span style={{ fontSize: 9, color: '#9b59b6' }}>AI</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {r.artistName} · {r.type} · Q:{r.quality}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)' }}>{fmtStreams(r.weeklyStreams)}/wk</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{fmtM(r.revenue)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rival labels */}
      <div style={{ marginTop: 20 }}>
        <div className="section-header"><span className="section-title">Rival Labels</span></div>
        {(game.rivals || []).slice(0, 5).map(r => (
          <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 13 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.tier}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className="progress-bar" style={{ width: 60 }}>
                <div className="progress-fill" style={{ width: `${r.strength}%` }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', width: 24 }}>{r.strength}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Advance week */}
      <button className="btn btn-gold btn-lg w-full gold-pulse" onClick={advanceWeek} style={{ marginTop: 24, letterSpacing: '0.1em' }}>
        <IconRepeat size={18} />
        Advance Week
      </button>
      <div style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
        Auto-saves every 60s · Events require resolution before advancing
      </div>
    </div>
  );
}
