import React, { useState } from 'react';
import { IconBarChart, IconTrendingUp, IconStar, IconMusic } from '../components/Icons';

function fmtS(n) {
  if (!n) return '0';
  if (n>=1e6) return `${(n/1e6).toFixed(1)}M`;
  if (n>=1e3) return `${(n/1e3).toFixed(0)}K`;
  return String(n);
}
function fmtM(n) {
  if (!n&&n!==0) return '$0';
  if (n>=1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n>=1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n)}`;
}

function Movement({ val }) {
  if (!val || val === 0) return <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)', width:28, textAlign:'center' }}>—</span>;
  const color = val > 0 ? '#2ecc71' : '#e74c3c';
  return (
    <span style={{ fontSize:10, color, fontFamily:'var(--font-mono)', width:28, textAlign:'center', flexShrink:0 }}>
      {val > 0 ? `▲${val}` : `▼${Math.abs(val)}`}
    </span>
  );
}

function RankBadge({ rank, isNew }) {
  const isTop3 = rank <= 3;
  const color = rank===1 ? '#f1c40f' : rank===2 ? '#bdc3c7' : rank===3 ? '#cd7f32' : 'var(--text-muted)';
  return (
    <div style={{
      width:28, height:28, borderRadius:4, flexShrink:0,
      background: isTop3 ? `${color}20` : 'var(--bg-2)',
      border: `1px solid ${isTop3 ? `${color}60` : 'var(--border)'}`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:'var(--font-display)', fontSize:11, fontWeight:700,
      color: isTop3 ? color : 'var(--text-dim)',
    }}>
      {isNew ? <span style={{ fontSize:7, letterSpacing:0 }}>NEW</span> : rank}
    </div>
  );
}

const GENRES_SHOWN = ['Hip-Hop','Pop','R&B','Afrobeats','Latin','Electronic','Drill','Indie'];

export default function Charts({ game }) {
  const [tab, setTab] = useState('singles');
  const [genreFilter, setGenreFilter] = useState(null);

  const singles = game.charts || [];
  const albums  = game.albumCharts || [];
  const records = game.chartRecords || {};
  const yourReleases = (game.releases||[]).filter(r=>r.active).sort((a,b)=>b.weeklyStreams-a.weeklyStreams);

  // Genre charts — filter singles by genre
  const genreCharts = genreFilter
    ? singles.filter(s=>s.genre===genreFilter).slice(0,20)
    : [];

  const yourChartCount = singles.filter(s=>s.isYours).length;
  const bestRank = yourChartCount ? Math.min(...singles.filter(s=>s.isYours).map(s=>s.rank)) : null;

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom:14 }}>
        <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:20 }}>Charts</h2>
        <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>
          Week {game.week}
          {yourChartCount > 0 && <span style={{ color:'var(--gold)', marginLeft:8 }}>· {yourChartCount} of your tracks charting{bestRank ? ` · Best: #${bestRank}` : ''}</span>}
        </p>
      </div>

      {/* Chart records */}
      {(records.longestNum1>0||records.biggestJump>0||records.mostWeeks>0) && (
        <div style={{ display:'flex', gap:8, marginBottom:14 }}>
          {records.longestNum1>0&&<div style={{ flex:1, padding:'8px', background:'rgba(241,196,15,0.08)', border:'1px solid rgba(241,196,15,0.2)', borderRadius:'var(--radius)', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'#f1c40f' }}>{records.longestNum1}</div>
            <div style={{ fontSize:9, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Wks at #1</div>
          </div>}
          {records.biggestJump>0&&<div style={{ flex:1, padding:'8px', background:'rgba(39,174,96,0.08)', border:'1px solid rgba(39,174,96,0.2)', borderRadius:'var(--radius)', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'#2ecc71' }}>+{records.biggestJump}</div>
            <div style={{ fontSize:9, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Biggest Jump</div>
          </div>}
          {records.mostWeeks>0&&<div style={{ flex:1, padding:'8px', background:'rgba(52,152,219,0.08)', border:'1px solid rgba(52,152,219,0.2)', borderRadius:'var(--radius)', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'#3498db' }}>{records.mostWeeks}</div>
            <div style={{ fontSize:9, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Most Wks Chart</div>
          </div>}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display:'flex', gap:2, marginBottom:14, background:'var(--bg-2)', borderRadius:'var(--radius)', padding:3, border:'1px solid var(--border)' }}>
        {[{id:'singles',label:'Top 50 Singles'},{id:'albums',label:'Albums/EPs'},{id:'genre',label:'Genre Charts'},{id:'yours',label:'Your Tracks'}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:1, padding:'7px 2px', borderRadius:'var(--radius)',
            background:tab===t.id?'linear-gradient(135deg,var(--gold-dim),rgba(201,168,76,0.5))':'transparent',
            color:tab===t.id?'#0a0804':'var(--text-muted)',
            fontFamily:'var(--font-display)', fontSize:9, letterSpacing:'0.08em', textTransform:'uppercase',
            cursor:'pointer', border:'none', minHeight:36,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* SINGLES TAB */}
      {tab==='singles' && (
        <div>
          {singles.map((s, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:10, padding:'9px 0',
              borderBottom:'1px solid var(--border)',
              background: s.isYours ? 'rgba(201,168,76,0.03)' : 'transparent',
            }}>
              <RankBadge rank={s.rank} isNew={s.weeksOnChart===1&&!s.isYours} />
              <Movement val={s.movement} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontSize:13, color:s.isYours?'var(--gold-light)':'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {s.title}
                  </span>
                  {s.isYours&&<span style={{ fontSize:8, padding:'1px 5px', background:'rgba(201,168,76,0.15)', color:'var(--gold)', borderRadius:2, fontFamily:'var(--font-display)', letterSpacing:'0.08em', flexShrink:0 }}>YOURS</span>}
                  {s.isYours&&s.isAI&&<span style={{ fontSize:8, padding:'1px 5px', background:'rgba(155,89,182,0.15)', color:'#9b59b6', borderRadius:2, fontFamily:'var(--font-display)', flexShrink:0 }}>AI</span>}
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {s.artist} · {s.weeksOnChart}w on chart{s.peakRank&&s.peakRank<s.rank?` · Peak #${s.peakRank}`:''}
                </div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:s.isYours?'var(--gold)':'var(--text-dim)' }}>{fmtS(s.streams)}</div>
                <div style={{ fontSize:9, color:'var(--text-muted)' }}>streams</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ALBUMS TAB */}
      {tab==='albums' && (
        <div>
          {albums.map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom:'1px solid var(--border)', background:s.isYours?'rgba(201,168,76,0.03)':'transparent' }}>
              <RankBadge rank={s.rank} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontSize:13, color:s.isYours?'var(--gold-light)':'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.title}</span>
                  {s.isYours&&<span style={{ fontSize:8, padding:'1px 5px', background:'rgba(201,168,76,0.15)', color:'var(--gold)', borderRadius:2, fontFamily:'var(--font-display)' }}>YOURS</span>}
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{s.artist} · {s.weeksOnChart}w on chart</div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:s.isYours?'var(--gold)':'var(--text-dim)' }}>{fmtS(s.streams)}</div>
              </div>
            </div>
          ))}
          {albums.length===0&&<div style={{ textAlign:'center', padding:'40px 0', color:'var(--text-muted)' }}>Release albums or EPs to appear here.</div>}
        </div>
      )}

      {/* GENRE CHARTS TAB */}
      {tab==='genre' && (
        <div>
          <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:6, marginBottom:14 }}>
            {GENRES_SHOWN.map(g=>(
              <button key={g} onClick={()=>setGenreFilter(genreFilter===g?null:g)} style={{
                padding:'5px 12px', borderRadius:20, fontSize:10, whiteSpace:'nowrap',
                fontFamily:'var(--font-display)', letterSpacing:'0.06em',
                border:genreFilter===g?'1px solid var(--gold)':'1px solid var(--border)',
                background:genreFilter===g?'rgba(201,168,76,0.12)':'transparent',
                color:genreFilter===g?'var(--gold)':'var(--text-muted)',
                cursor:'pointer', minHeight:34,
              }}>{g}</button>
            ))}
          </div>

          {genreFilter ? (
            genreCharts.length>0 ? genreCharts.map((s,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom:'1px solid var(--border)', background:s.isYours?'rgba(201,168,76,0.03)':'transparent' }}>
                <RankBadge rank={i+1} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, color:s.isYours?'var(--gold-light)':'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.title}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)' }}>{s.artist}{s.isYours?' · YOUR LABEL':''}</div>
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:s.isYours?'var(--gold)':'var(--text-dim)' }}>{fmtS(s.streams)}</div>
              </div>
            )) : <div style={{ textAlign:'center', padding:'32px 0', color:'var(--text-muted)' }}>No {genreFilter} releases charting.</div>
          ) : (
            <div style={{ textAlign:'center', padding:'40px 0', color:'var(--text-muted)' }}>
              <IconBarChart size={32} color="var(--gold-dim)" style={{ margin:'0 auto 8px', display:'block' }} />
              <p>Select a genre to see its chart.</p>
            </div>
          )}
        </div>
      )}

      {/* YOUR TRACKS TAB */}
      {tab==='yours' && (
        <div>
          {yourReleases.length===0 && (
            <div style={{ textAlign:'center', padding:'48px 0', color:'var(--text-muted)' }}>
              <IconMusic size={40} color="var(--gold-dim)" style={{ margin:'0 auto 12px', display:'block' }} />
              <p>Release music to see your tracks here.</p>
            </div>
          )}
          {yourReleases.map(r=>{
            const chartEntry = singles.find(c=>c.isYours&&c.title===r.title);
            return (
              <div key={r.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:14, marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:14, fontFamily:'var(--font-display)', color:'var(--text)' }}>{r.title}</span>
                      {r.viralHit&&<span style={{ fontSize:11 }}>🔥</span>}
                      {r.isAI&&<span style={{ fontSize:8, padding:'1px 5px', background:'rgba(155,89,182,0.15)', color:'#9b59b6', borderRadius:2, fontFamily:'var(--font-display)' }}>AI</span>}
                    </div>
                    <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{r.artistName} · {r.type.toUpperCase()} · Wk {r.week}</div>
                  </div>
                  {chartEntry && (
                    <div style={{ background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:4, padding:'4px 10px', textAlign:'center' }}>
                      <div style={{ fontFamily:'var(--font-display)', fontSize:16, color:'var(--gold)' }}>#{chartEntry.rank}</div>
                      <div style={{ fontSize:9, color:'var(--gold-dim)', fontFamily:'var(--font-display)' }}>CHART</div>
                    </div>
                  )}
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:15, color:'var(--gold)' }}>{fmtS(r.weeklyStreams)}</div>
                    <div style={{ fontSize:9, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em' }}>WK STREAMS</div>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:15, color:'#2ecc71' }}>{fmtM(r.revenue)}</div>
                    <div style={{ fontSize:9, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em' }}>EARNED</div>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:15, color:'var(--text-dim)' }}>{r.quality}/100</div>
                    <div style={{ fontSize:9, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.08em' }}>QUALITY</div>
                  </div>
                </div>

                <div style={{ marginTop:8 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width:`${r.quality}%`, background:`linear-gradient(90deg, ${r.quality>80?'#2ecc71':r.quality>60?'#f39c12':'#e74c3c'}, var(--gold))` }} />
                  </div>
                </div>

                {r.trendBoost && (
                  <div style={{ marginTop:6, fontSize:11, color:'var(--gold-dim)' }}>📈 Trend boosted release</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
