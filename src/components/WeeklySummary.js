import React, { useState, useEffect } from 'react';
import { IconTrendingUp, IconStar, IconX, IconArrowUp, IconArrowDown, IconZap, IconRepeat } from '../components/Icons';

function fmtM(n) {
  if (!n&&n!==0) return '$0';
  const a=Math.abs(n); const s=n<0?'-':'';
  if(a>=1e9) return `${s}$${(a/1e9).toFixed(2)}B`;
  if(a>=1e6) return `${s}$${(a/1e6).toFixed(2)}M`;
  if(a>=1e3) return `${s}$${(a/1e3).toFixed(0)}K`;
  return `${s}$${Math.floor(a).toLocaleString()}`;
}

function fmtS(n) {
  if(!n) return '0';
  if(n>=1e6) return `${(n/1e6).toFixed(1)}M`;
  if(n>=1e3) return `${(n/1e3).toFixed(0)}K`;
  return String(n);
}

export default function WeeklySummary({ report, game, onClose }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (report) { setVisible(true); setStep(0); }
  }, [report]);

  if (!report || !visible) return null;

  const net = report.netIncome || 0;
  const isProfit = net >= 0;
  const chartPos = report.bestChartPos;
  const hasChart = chartPos && chartPos < 999;

  // Step 0 = finance, step 1 = charts/records, step 2 = next week hint
  const steps = ['FINANCES', 'CHARTS', 'NEXT WEEK'];

  const close = () => { setVisible(false); onClose?.(); };

  return (
    <div style={styles.overlay} onClick={close}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.weekLabel}>WEEK {report.week} RECAP</div>
            <div style={styles.title}>
              {isProfit ? '📈 Profitable Week' : '📉 Tough Week'}
            </div>
          </div>
          <button onClick={close} style={styles.closeBtn} aria-label="Close">
            <IconX size={20} color="var(--text-muted)" />
          </button>
        </div>

        {/* Step tabs */}
        <div style={styles.stepBar}>
          {steps.map((s, i) => (
            <button key={s} onClick={() => setStep(i)} style={{
              ...styles.stepBtn,
              background: step === i ? 'var(--gold-glow)' : 'transparent',
              borderBottom: step === i ? '2px solid var(--gold)' : '2px solid transparent',
              color: step === i ? 'var(--gold)' : 'var(--text-muted)',
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* STEP 0: FINANCES */}
        {step === 0 && (
          <div style={styles.content}>
            {/* Net income highlight */}
            <div style={{ ...styles.highlight, background: isProfit ? 'rgba(39,174,96,0.08)' : 'rgba(192,57,43,0.08)', border: `1px solid ${isProfit ? 'rgba(39,174,96,0.3)' : 'rgba(192,57,43,0.3)'}` }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Net Income
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, color: isProfit ? '#2ecc71' : '#e74c3c', lineHeight: 1 }}>
                {isProfit ? '+' : ''}{fmtM(net)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                Cash balance: {fmtM(report.cashBalance)}
              </div>
            </div>

            {/* Revenue breakdown */}
            {[
              { label: '💿 Streaming',     val: report.streamRevenue,  pos: true  },
              { label: '🎪 Tours',          val: report.tourRevenue,    pos: true  },
              { label: '👕 Merchandise',    val: report.merchRevenue,   pos: true  },
              { label: '👤 Artist Fees',    val: report.artistFees,     pos: false },
              { label: '👔 Staff Costs',    val: report.staffCosts,     pos: false },
              { label: '🏦 Loan Payments',  val: report.loanPayments,   pos: false },
            ].filter(r => r.val > 0).map(row => (
              <div key={row.label} style={styles.row}>
                <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>{row.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: row.pos ? '#2ecc71' : '#e74c3c' }}>
                  {row.pos ? '+' : '-'}{fmtM(row.val)}
                </span>
              </div>
            ))}

            {report.trendGenre && (
              <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 12, color: 'var(--gold-dim)' }}>
                📈 Trending genre this week: <strong style={{ color: 'var(--gold)' }}>{report.trendGenre}</strong>
              </div>
            )}
          </div>
        )}

        {/* STEP 1: CHARTS */}
        {step === 1 && (
          <div style={styles.content}>
            {hasChart ? (
              <>
                <div style={{ ...styles.highlight, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
                  <div style={{ fontSize: 11, color: 'var(--gold-dim)', fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Best Chart Position</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: 'var(--gold-light)', lineHeight: 1 }}>
                    #{chartPos}
                  </div>
                  {report.topRelease && (
                    <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 6 }}>
                      "{report.topRelease.title}"
                    </div>
                  )}
                  {chartPos === 2 && (
                    <div style={{ marginTop: 8, fontSize: 12, color: '#f39c12' }}>
                      😤 ONE spot away from #1. That stings.
                    </div>
                  )}
                  {chartPos === 1 && (
                    <div style={{ marginTop: 8, fontSize: 13, color: '#f1c40f', fontFamily: 'var(--font-display)' }}>
                      👑 NUMBER ONE. The industry is watching.
                    </div>
                  )}
                </div>

                {/* Chart movement entries */}
                {(game?.charts||[]).filter(c=>c.isYours).slice(0,5).map((c, i) => (
                  <div key={i} style={styles.row}>
                    <div>
                      <div style={{ fontSize: 13 }}>#{c.rank} — {c.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                        {fmtS(c.streams)} streams · {c.weeksOnChart} wk{c.weeksOnChart>1?'s':''} on chart
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {c.movement > 0
                        ? <span style={{ fontSize: 11, color: '#2ecc71', fontFamily: 'var(--font-mono)' }}>▲{c.movement}</span>
                        : c.movement < 0
                        ? <span style={{ fontSize: 11, color: '#e74c3c', fontFamily: 'var(--font-mono)' }}>▼{Math.abs(c.movement)}</span>
                        : <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>—</span>
                      }
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📊</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>No releases charting yet.</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>Release music to appear on the charts.</div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: NEXT WEEK TEASER */}
        {step === 2 && (
          <div style={styles.content}>
            <div style={{ textAlign: 'center', paddingTop: 12 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔮</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--gold-light)', marginBottom: 16 }}>
                WEEK {(report.week||0)+1} OUTLOOK
              </div>
            </div>

            {[
              { icon:'📈', text: report.trendGenre ? `${report.trendGenre} trend continues — releases in this genre get a stream boost.` : 'Genre trend may shift this week. Watch the market.' },
              { icon:'📋', text:'Contract check — review any artists nearing expiry.' },
              ...(game?.roster?.some(a=>(a.burnoutRisk||0)>55) ? [{ icon:'😮‍💨', text:'One of your artists shows high burnout risk. Consider training or a rest period.' }] : []),
              ...(game?.activeLoans?.some(l=>l.weeklyPayment&&!l.paid) ? [{ icon:'🏦', text:'Loan payment due next week. Ensure cash balance covers it.' }] : []),
              { icon:'🎯', text:'Check your active objectives — some may be close to completion.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 10, padding: '0 0 4px' }}>
          {step < steps.length - 1 ? (
            <button className="btn btn-outline w-full" onClick={() => setStep(s => s + 1)}>
              Next →
            </button>
          ) : null}
          <button className="btn btn-gold w-full" onClick={close} style={{ gap: 8 }}>
            <IconRepeat size={16} />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
    backdropFilter: 'blur(8px)', zIndex: 900,
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    padding: '16px', animation: 'fadeIn 0.25s ease',
  },
  modal: {
    width: '100%', maxWidth: 480,
    background: 'var(--bg-2)',
    border: '1px solid var(--border-2)',
    borderRadius: '12px 12px 0 0',
    padding: '20px 20px 24px',
    maxHeight: '85vh', overflowY: 'auto',
    animation: 'slideUp 0.3s ease',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  weekLabel: { fontSize: 10, color: 'var(--gold-dim)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 },
  title: { fontSize: 20, fontFamily: 'var(--font-display)', color: 'var(--gold-light)' },
  closeBtn: { padding: 4, background: 'none', border: 'none', cursor: 'pointer', minHeight: 36 },
  stepBar: { display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 16, gap: 0 },
  stepBtn: { flex: 1, padding: '8px 4px', fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'all 0.15s', minHeight: 38 },
  content: { marginBottom: 16 },
  highlight: { borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: 14 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' },
};
