import React, { useState } from 'react';
import { IconCheck, IconDollarSign } from '../components/Icons';
import { STAFF_ROLES, LOAN_OPTIONS, TRAINING_PROGRAMS, WEEKLY_OBJECTIVES } from '../data/gameData';

function fmtM(n) {
  if (!n && n !== 0) return '$0';
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}

function LevelBar({ current, max }) {
  return (
    <div style={{ display:'flex', gap:2, marginBottom:8 }}>
      {Array.from({length:max},(_,i) => (
        <div key={i} style={{ flex:1, height:5, borderRadius:2, background: i<current ? 'var(--gold)' : i===current ? 'rgba(201,168,76,0.3)' : 'var(--bg-3)', transition:'background 0.3s' }} />
      ))}
    </div>
  );
}

export default function StaffFinance({ game, hireStaff, startTraining, takeLoan }) {
  const [tab, setTab] = useState('staff');
  const [trainArtist, setTrainArtist] = useState('');
  const [trainProg, setTrainProg] = useState(null);
  const [loanConfirm, setLoanConfirm] = useState(null);
  const [expandedRole, setExpandedRole] = useState(null);

  const completed = game.objectives || [];
  const pending = WEEKLY_OBJECTIVES.filter(o => !completed.includes(o.id));

  const handleTrain = () => {
    if (!trainArtist || !trainProg) return;
    startTraining(trainArtist, trainProg);
    setTrainArtist(''); setTrainProg(null);
  };

  const totalStaffCost = Object.entries(game.staff || {}).reduce((sum, [roleId, lv]) => {
    const role = STAFF_ROLES.find(r => r.id === roleId);
    if (role && lv > 0 && lv <= role.levels.length) return sum + role.levels[lv-1].weeklyCost;
    return sum;
  }, 0);

  return (
    <div className="page">
      <div style={{ marginBottom:14 }}>
        <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:20 }}>Label Operations</h2>
        <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>Staff · Finance · Training · Objectives</p>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:2, marginBottom:16, background:'var(--bg-2)', borderRadius:'var(--radius)', padding:3, border:'1px solid var(--border)', overflowX:'auto' }}>
        {[{id:'staff',label:'Staff'},{id:'finance',label:'Finance'},{id:'training',label:'Training'},{id:'objectives',label:'Goals'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:'8px 4px', borderRadius:'var(--radius)', background:tab===t.id?'linear-gradient(135deg,var(--gold-dim),rgba(201,168,76,0.5))':'transparent', color:tab===t.id?'#0a0804':'var(--text-muted)', fontFamily:'var(--font-display)', fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', border:'none', minHeight:38, whiteSpace:'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── STAFF TAB ── */}
      {tab === 'staff' && (
        <div>
          {totalStaffCost > 0 && (
            <div style={{ background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'var(--radius)', padding:'8px 14px', marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:12, color:'var(--text-muted)' }}>Total staff cost</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--gold)' }}>{fmtM(totalStaffCost)}/wk</span>
            </div>
          )}

          {STAFF_ROLES.map(role => {
            const cur = game.staff?.[role.id] || 0;
            const maxLevel = role.levels.length;
            const maxed = cur >= maxLevel;
            const next = !maxed ? role.levels[cur] : null;
            const cost = next ? next.weeklyCost * 4 : 0;
            const expanded = expandedRole === role.id;

            return (
              <div key={role.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:16, marginBottom:12 }}>
                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                      <span style={{ fontSize:20 }}>{role.icon}</span>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:15 }}>{role.name}</span>
                      {cur > 0 && (
                        <span style={{ fontSize:9, padding:'2px 7px', background:'var(--gold-glow)', border:'1px solid var(--border-2)', color:'var(--gold)', borderRadius:2, fontFamily:'var(--font-display)', letterSpacing:'0.08em' }}>
                          LVL {cur}/{maxLevel}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{role.desc}</div>
                  </div>
                </div>

                {/* Level bar — all 10 levels */}
                <LevelBar current={cur} max={maxLevel} />

                {/* Current active bonus */}
                {cur > 0 && (
                  <div style={{ fontSize:12, color:'#2ecc71', marginBottom:8, padding:'6px 10px', background:'rgba(39,174,96,0.06)', borderRadius:'var(--radius)', border:'1px solid rgba(39,174,96,0.15)' }}>
                    ✓ Active: {role.levels[cur-1].bonus}
                  </div>
                )}

                {/* Show all levels toggle */}
                <button onClick={()=>setExpandedRole(expanded?null:role.id)} style={{ fontSize:10, color:'var(--text-muted)', background:'none', border:'none', cursor:'pointer', padding:'2px 0', marginBottom:8, fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  {expanded ? '▲ Hide levels' : '▼ Show all 10 levels'}
                </button>

                {expanded && (
                  <div style={{ marginBottom:10 }}>
                    {role.levels.map((lv, i) => (
                      <div key={i} style={{ display:'flex', gap:10, padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.03)', opacity: i < cur ? 1 : i === cur ? 1 : 0.45 }}>
                        <div style={{ width:20, height:20, borderRadius:'50%', background: i < cur ? 'var(--gold)' : 'var(--bg-3)', border: i === cur ? '1px solid var(--gold)' : '1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color: i < cur ? '#0a0804' : 'var(--text-muted)', flexShrink:0 }}>
                          {i < cur ? '✓' : i+1}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:11, color: i < cur ? 'var(--text-dim)' : i === cur ? 'var(--text)' : 'var(--text-muted)', fontFamily:'var(--font-display)' }}>{lv.name}</div>
                          <div style={{ fontSize:10, color:'var(--text-muted)' }}>{lv.bonus}</div>
                        </div>
                        <div style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)', flexShrink:0 }}>{fmtM(lv.weeklyCost)}/wk</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hire next level */}
                {next ? (
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:8, borderTop:'1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize:12, color:'var(--text-dim)' }}>Next: {next.name}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)' }}>{next.bonus}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{fmtM(next.weeklyCost)}/wk ongoing · {fmtM(cost)} to hire</div>
                    </div>
                    <button className={`btn btn-sm ${game.cash >= cost ? 'btn-gold' : 'btn-outline'}`} onClick={()=>hireStaff(role.id)} disabled={game.cash < cost} style={{ opacity:game.cash>=cost?1:0.5, flexShrink:0, marginLeft:10 }}>
                      Hire
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize:12, color:'var(--gold-dim)', paddingTop:8, borderTop:'1px solid var(--border)' }}>👑 Fully staffed — maximum level reached</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── FINANCE TAB ── */}
      {tab === 'finance' && (
        <div>
          {/* Overview */}
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:16, marginBottom:16 }}>
            <div style={{ fontSize:10, fontFamily:'var(--font-display)', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold-dim)', marginBottom:10 }}>Financial Overview</div>
            {[
              { label:'Cash Balance',   val:fmtM(game.cash),           color:'var(--gold-light)'  },
              { label:'Total Earned',   val:fmtM(game.totalRevenue),   color:'#2ecc71'            },
              { label:'Total Spent',    val:fmtM(game.totalExpenses),  color:'#e74c3c'            },
              { label:'Net Position',   val:fmtM(game.totalRevenue-game.totalExpenses), color:(game.totalRevenue-game.totalExpenses)>=0?'#2ecc71':'#e74c3c' },
              { label:'Equity Given',   val:`${((game.equityGiven||0)*100).toFixed(0)}%`, color:'#f39c12' },
              { label:'Weekly Overhead',val:fmtM(game.weeklyReport?.overheadCost||0),  color:'#e74c3c' },
            ].map(row=>(
              <div key={row.label} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ fontSize:13, color:'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:row.color }}>{row.val}</span>
              </div>
            ))}
          </div>

          {/* Active loans */}
          {(game.activeLoans||[]).filter(l=>!l.paid&&l.type!=='equity').length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div className="section-header"><span className="section-title">Active Loans</span></div>
              {(game.activeLoans||[]).filter(l=>!l.paid&&l.type!=='equity').map(loan=>(
                <div key={loan.id} style={{ background:'rgba(231,76,60,0.06)', border:'1px solid rgba(231,76,60,0.2)', borderRadius:'var(--radius)', padding:'10px 14px', marginBottom:8 }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span style={{ fontSize:13 }}>{loan.name}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'#e74c3c' }}>-{fmtM(loan.weeklyPayment)}/wk</span>
                  </div>
                  {(loan.missedPayments||0) > 0 && <div style={{ fontSize:11, color:'#e74c3c', marginTop:3 }}>⚠️ {loan.missedPayments} missed payment{loan.missedPayments>1?'s':''}</div>}
                  {loan.weeksLeft > 0 && <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{loan.weeksLeft} weeks remaining</div>}
                </div>
              ))}
            </div>
          )}

          <div className="section-header"><span className="section-title">Capital Options</span></div>
          {LOAN_OPTIONS.map(loan => {
            const already = (game.activeLoans||[]).find(l=>l.id===loan.id&&!l.paid);
            const riskC = loan.risk==='high'?'#e74c3c':loan.risk==='medium'?'#f39c12':'#2ecc71';
            return (
              <div key={loan.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:14, marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontSize:14 }}>{loan.name}</div>
                    <div style={{ fontSize:11, color:riskC, marginTop:2 }}>{loan.risk.toUpperCase()} RISK</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'var(--gold-light)' }}>{fmtM(loan.amount)}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{loan.type==='equity'?`${((loan.equityStake||0)*100).toFixed(0)}% equity`:loan.type==='high'?`${fmtM(loan.weeklyPayment)}/wk ⚠️`:`${fmtM(loan.weeklyPayment)}/wk`}</div>
                  </div>
                </div>
                {loan.equityNote && <div style={{ fontSize:11, color:'#f39c12', marginBottom:6 }}>💡 {loan.equityNote}</div>}
                {loan.penaltyOnMiss && <div style={{ fontSize:11, color:'#e74c3c', marginBottom:6 }}>⚠️ Miss: {loan.penaltyOnMiss}</div>}
                {already ? (
                  <div style={{ fontSize:12, color:'var(--text-muted)' }}>✓ Already active</div>
                ) : loanConfirm?.id === loan.id ? (
                  <div style={{ display:'flex', gap:8, marginTop:8 }}>
                    <button className="btn btn-outline btn-sm w-full" onClick={()=>setLoanConfirm(null)}>Cancel</button>
                    <button className="btn btn-gold btn-sm w-full" onClick={()=>{takeLoan(loan);setLoanConfirm(null);}}>Confirm</button>
                  </div>
                ) : (
                  <button className="btn btn-outline btn-sm w-full" onClick={()=>setLoanConfirm(loan)} style={{ marginTop:8 }}>
                    <IconDollarSign size={14} /> Secure {fmtM(loan.amount)}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── TRAINING TAB ── */}
      {tab === 'training' && (
        <div>
          {(game.training||[]).length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div className="section-header"><span className="section-title">In Progress</span></div>
              {(game.training||[]).map(t=>(
                <div key={t.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'10px 14px', marginBottom:8 }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <div>
                      <div style={{ fontSize:13 }}>{game.roster.find(a=>a.id===t.artistId)?.name||'?'}</div>
                      <div style={{ fontSize:12, color:'var(--text-muted)' }}>{t.name}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--gold)' }}>{t.weeksLeft}wk left</div>
                      <div style={{ fontSize:11, color:'#2ecc71' }}>{t.gain>0?'+':''}{t.gain} {t.stat}</div>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ marginTop:8 }}>
                    <div className="progress-fill" style={{ width:`${Math.max(5,100-(t.weeksLeft/((t.weeksLeft+1)||1))*100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {game.roster.length === 0 ? (
            <div style={{ textAlign:'center', padding:'32px 0', color:'var(--text-muted)' }}>Sign artists first.</div>
          ) : (
            <>
              <div className="section-header"><span className="section-title">New Training Session</span></div>
              <div className="form-group">
                <label>Select Artist</label>
                <select value={trainArtist} onChange={e=>setTrainArtist(e.target.value)}>
                  <option value="">Choose...</option>
                  {game.roster.map(a=><option key={a.id} value={a.id}>{a.name} — {a.genre}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Training Program</label>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {TRAINING_PROGRAMS.map(prog => {
                    const active = trainProg?.id === prog.id;
                    return (
                      <div key={prog.id} onClick={()=>setTrainProg(prog)} style={{ padding:'10px 14px', borderRadius:'var(--radius)', border:active?'1px solid var(--gold)':'1px solid var(--border)', background:active?'var(--gold-glow)':'var(--bg-2)', cursor:'pointer' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                          <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:active?'var(--gold)':'var(--text)' }}>{prog.name}</span>
                          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'#e74c3c' }}>{fmtM(prog.cost)}</span>
                        </div>
                        <div style={{ fontSize:12, color:'var(--text-muted)' }}>{prog.desc} · {prog.durationWeeks}wks · <span style={{ color:'#2ecc71' }}>{prog.gain>0?'+':''}{prog.gain} {prog.stat}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="btn btn-gold btn-lg w-full" onClick={handleTrain} disabled={!trainArtist||!trainProg} style={{ opacity:trainArtist&&trainProg?1:0.45 }}>
                Start Training {trainProg?`— ${fmtM(trainProg.cost)}`:''}
              </button>
            </>
          )}
        </div>
      )}

      {/* ── OBJECTIVES TAB ── */}
      {tab === 'objectives' && (
        <div>
          {completed.length > 0 && (
            <div style={{ marginBottom:16 }}>
              <div className="section-header">
                <span className="section-title">Completed ({completed.length})</span>
                <span className="badge badge-success">{fmtM(WEEKLY_OBJECTIVES.filter(o=>completed.includes(o.id)).reduce((s,o)=>s+o.reward,0))} earned</span>
              </div>
              {WEEKLY_OBJECTIVES.filter(o=>completed.includes(o.id)).map(obj=>(
                <div key={obj.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 0', borderBottom:'1px solid var(--border)' }}>
                  <IconCheck size={14} color="#2ecc71" />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, color:'var(--text-dim)' }}>{obj.title}</div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{obj.desc}</div>
                  </div>
                  <div className="badge badge-success">{fmtM(obj.reward)}</div>
                </div>
              ))}
            </div>
          )}
          <div className="section-header"><span className="section-title">Active ({pending.length})</span></div>
          {pending.map(obj=>(
            <div key={obj.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'12px 14px', marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:13, marginBottom:2 }}>{obj.title}</div>
                  <div style={{ fontSize:12, color:'var(--text-muted)' }}>{obj.desc}</div>
                </div>
                <div className="badge badge-gold" style={{ flexShrink:0, marginLeft:8 }}>{fmtM(obj.reward)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
