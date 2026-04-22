import React, { useState } from 'react';
import { IconDollarSign, IconUser, IconKey, IconTrendingUp, IconStar, IconCheck, IconZap, IconClock, IconX } from '../components/Icons';
import { STAFF_ROLES, LOAN_OPTIONS, TRAINING_PROGRAMS, WEEKLY_OBJECTIVES } from '../data/gameData';

function fmtM(n) {
  if (!n && n !== 0) return '$0';
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}

export default function StaffFinance({ game, hireStaff, startTraining, takeLoan }) {
  const [tab, setTab] = useState('staff');
  const [trainArtist, setTrainArtist] = useState('');
  const [trainProgram, setTrainProgram] = useState(null);
  const [loanConfirm, setLoanConfirm] = useState(null);

  const completedObjectives = game.objectives || [];
  const pendingObjectives = WEEKLY_OBJECTIVES.filter(o => !completedObjectives.includes(o.id));

  const handleTrain = () => {
    if (!trainArtist || !trainProgram) return;
    startTraining(trainArtist, trainProgram);
    setTrainArtist('');
    setTrainProgram(null);
  };

  const activeTraining = (game.training || []);

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20, letterSpacing: '0.05em' }}>
          Label Operations
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          Staff · Finance · Training · Objectives
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 16, background: 'var(--bg-2)', borderRadius: 'var(--radius)', padding: 3, border: '1px solid var(--border)', overflowX: 'auto' }}>
        {[
          { id:'staff',      label:'Staff'      },
          { id:'finance',    label:'Finance'    },
          { id:'training',   label:'Training'   },
          { id:'objectives', label:'Objectives' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '8px 6px', borderRadius: 'var(--radius)',
            background: tab === t.id ? 'linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.5))' : 'transparent',
            color: tab === t.id ? '#0a0804' : 'var(--text-muted)',
            fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
            cursor: 'pointer', border: 'none', minHeight: 38, whiteSpace: 'nowrap',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* STAFF TAB */}
      {tab === 'staff' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
            Hire staff to improve your label's capabilities. Each role has 3 upgrade levels.
          </div>
          {STAFF_ROLES.map(role => {
            const currentLevel = game.staff?.[role.id] || 0;
            const maxed = currentLevel >= role.levels.length;
            const nextLevel = !maxed ? role.levels[currentLevel] : null;
            const hiringCost = nextLevel ? nextLevel.weeklyCost * 4 : 0;
            const canAfford = game.cash >= hiringCost;

            return (
              <div key={role.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{role.icon}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text)' }}>{role.name}</span>
                      {currentLevel > 0 && (
                        <span style={{ fontSize: 10, padding: '2px 6px', background: 'var(--gold-glow)', border: '1px solid var(--border-2)', color: 'var(--gold)', borderRadius: 2, fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
                          LVL {currentLevel}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{role.desc}</div>
                  </div>
                </div>

                {/* Level progression */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                  {role.levels.map((l, i) => (
                    <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < currentLevel ? 'var(--gold)' : 'var(--bg-3)' }} />
                  ))}
                </div>

                {/* Current level bonus */}
                {currentLevel > 0 && (
                  <div style={{ fontSize: 12, color: '#2ecc71', marginBottom: 8 }}>
                    ✓ Active: {role.levels[currentLevel - 1].bonus}
                  </div>
                )}

                {/* Next level */}
                {nextLevel ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Next: {nextLevel.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{nextLevel.bonus}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                        {fmtM(nextLevel.weeklyCost)}/wk ongoing
                      </div>
                    </div>
                    <button
                      className={`btn ${canAfford ? 'btn-gold' : 'btn-outline'} btn-sm`}
                      onClick={() => hireStaff(role.id)}
                      disabled={!canAfford}
                      style={{ opacity: canAfford ? 1 : 0.5 }}
                    >
                      Hire — {fmtM(hiringCost)}
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: 12, color: 'var(--gold-dim)' }}>✓ Fully staffed</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* FINANCE TAB */}
      {tab === 'finance' && (
        <div>
          {/* Overview */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: 12 }}>
              Financial Overview
            </div>
            {[
              { label: 'Cash Balance',    val: game.cash,         color: 'var(--gold-light)' },
              { label: 'Total Earned',    val: game.totalRevenue, color: '#2ecc71' },
              { label: 'Total Spent',     val: game.totalExpenses,color: '#e74c3c' },
              { label: 'Net Worth Est.',  val: game.cash + (game.totalRevenue - game.totalExpenses) * 0.3, color: 'var(--gold)' },
              { label: 'Equity Given',    val: `${((game.equityGiven || 0) * 100).toFixed(0)}%`, color: '#f39c12', noFmt: true },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: row.color }}>
                  {row.noFmt ? row.val : fmtM(row.val)}
                </span>
              </div>
            ))}
          </div>

          {/* Active loans */}
          {(game.activeLoans || []).filter(l => !l.paid && l.weeksLeft > 0).length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div className="section-header"><span className="section-title">Active Loans</span></div>
              {(game.activeLoans || []).filter(l => !l.paid && l.weeksLeft > 0).map(loan => (
                <div key={loan.id} style={{ background: 'var(--danger-dim)', border: '1px solid rgba(231,76,60,0.2)', borderRadius: 'var(--radius)', padding: '10px 14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13 }}>{loan.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e74c3c' }}>
                      {loan.weeklyPayment ? `-${fmtM(loan.weeklyPayment)}/wk` : `${((loan.equityStake || 0) * 100).toFixed(0)}% equity`}
                    </span>
                  </div>
                  {loan.weeksLeft > 0 && (
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{loan.weeksLeft} weeks remaining</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Loan options */}
          <div className="section-header"><span className="section-title">Capital Options</span></div>
          {LOAN_OPTIONS.map(loan => {
            const already = (game.activeLoans || []).find(l => l.id === loan.id && !l.paid);
            const canAfford = !already;
            return (
              <div key={loan.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 14, marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{loan.name}</div>
                    <div style={{ fontSize: 11, color: loan.risk === 'high' ? '#e74c3c' : loan.risk === 'medium' ? '#f39c12' : '#2ecc71', marginTop: 2 }}>
                      {loan.risk.toUpperCase()} RISK
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--gold-light)' }}>{fmtM(loan.amount)}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {loan.type === 'equity' ? `${(loan.equityStake * 100).toFixed(0)}% equity` : `${fmtM(loan.weeklyPayment)}/wk`}
                    </div>
                  </div>
                </div>
                {loan.equityNote && <div style={{ fontSize: 11, color: '#f39c12', marginBottom: 6 }}>⚠️ {loan.equityNote}</div>}
                {loan.note && <div style={{ fontSize: 11, color: '#e74c3c', marginBottom: 6 }}>⚠️ {loan.note}</div>}
                {already ? (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>✓ Already active</div>
                ) : loanConfirm?.id === loan.id ? (
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button className="btn btn-outline btn-sm w-full" onClick={() => setLoanConfirm(null)}>Cancel</button>
                    <button className="btn btn-gold btn-sm w-full" onClick={() => { takeLoan(loan); setLoanConfirm(null); }}>Confirm</button>
                  </div>
                ) : (
                  <button className="btn btn-outline btn-sm w-full" onClick={() => setLoanConfirm(loan)} style={{ marginTop: 8 }}>
                    <IconDollarSign size={14} /> Secure {fmtM(loan.amount)}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TRAINING TAB */}
      {tab === 'training' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
            Invest in your artists. Training improves core attributes over time.
          </div>

          {/* Active training sessions */}
          {activeTraining.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div className="section-header"><span className="section-title">In Progress</span></div>
              {activeTraining.map(t => (
                <div key={t.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 13 }}>{game.roster.find(a => a.id === t.artistId)?.name || '?'}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.name}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)' }}>{t.weeksLeft}wk left</div>
                      <div style={{ fontSize: 11, color: '#2ecc71' }}>+{t.gain} {t.stat}</div>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ marginTop: 8 }}>
                    <div className="progress-fill" style={{ width: `${Math.max(5, 100 - (t.weeksLeft / (t.weeksLeft + 1)) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {game.roster.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              Sign artists first to enroll them in training.
            </div>
          ) : (
            <>
              <div className="section-header"><span className="section-title">New Session</span></div>
              <div className="form-group">
                <label>Select Artist</label>
                <select value={trainArtist} onChange={e => setTrainArtist(e.target.value)}>
                  <option value="">Choose artist...</option>
                  {game.roster.map(a => (
                    <option key={a.id} value={a.id}>{a.name} — {a.genre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Training Program</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {TRAINING_PROGRAMS.map(prog => {
                    const active = trainProgram?.id === prog.id;
                    return (
                      <div key={prog.id} onClick={() => setTrainProgram(prog)} style={{ padding: '10px 14px', borderRadius: 'var(--radius)', border: active ? '1px solid var(--gold)' : '1px solid var(--border)', background: active ? 'var(--gold-glow)' : 'var(--bg-2)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: active ? 'var(--gold)' : 'var(--text)' }}>{prog.name}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e74c3c' }}>{fmtM(prog.cost)}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{prog.desc} · {prog.durationWeeks}wks · <span style={{ color: '#2ecc71' }}>{prog.gain > 0 ? '+' : ''}{prog.gain} {prog.stat}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                className="btn btn-gold btn-lg w-full"
                onClick={handleTrain}
                disabled={!trainArtist || !trainProgram}
                style={{ opacity: trainArtist && trainProgram ? 1 : 0.45 }}
              >
                Start Training — {trainProgram ? fmtM(trainProgram.cost) : 'Select program'}
              </button>
            </>
          )}
        </div>
      )}

      {/* OBJECTIVES TAB */}
      {tab === 'objectives' && (
        <div>
          {completedObjectives.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div className="section-header">
                <span className="section-title">Completed ({completedObjectives.length})</span>
                <span className="badge badge-success">{fmtM(WEEKLY_OBJECTIVES.filter(o => completedObjectives.includes(o.id)).reduce((s, o) => s + o.reward, 0))} earned</span>
              </div>
              {WEEKLY_OBJECTIVES.filter(o => completedObjectives.includes(o.id)).map(obj => (
                <div key={obj.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <IconCheck size={16} color="#2ecc71" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{obj.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{obj.desc}</div>
                  </div>
                  <div className="badge badge-success">{fmtM(obj.reward)}</div>
                </div>
              ))}
            </div>
          )}

          <div className="section-header"><span className="section-title">Active Objectives ({pendingObjectives.length})</span></div>
          {pendingObjectives.map(obj => (
            <div key={obj.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '12px 14px', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text)', marginBottom: 3 }}>{obj.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{obj.desc}</div>
                </div>
                <div className="badge badge-gold">{fmtM(obj.reward)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
