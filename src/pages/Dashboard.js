import React, { useState } from 'react';
import { IconRepeat, IconSave, IconChevronDown, IconTrendingUp, IconZap, IconStar } from '../components/Icons';
import { LABEL_TIERS, GENRE_TREND_CYCLES, WEEKLY_OBJECTIVES } from '../data/gameData';

function fmtM(n) {
  if (n===undefined||n===null) return '$0';
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
function getMonth(m) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][(m||1)-1]||'';
}
function getTier(rev) {
  let t=LABEL_TIERS[0];
  for(const tier of LABEL_TIERS){if(rev>=tier.minRevenue)t=tier;}
  return t;
}
function getNextTier(rev) {
  for(const t of LABEL_TIERS){if(rev<t.minRevenue)return t;}
  return null;
}

// Industry NPC beefs that scroll — adds world-feel
const NPC_HEADLINES = [
  "Drake and Kendrick's feud enters new chapter — both camps release statements",
  "Burna Boy threatens to leave Atlantic Records over creative differences",
  "Taylor Swift's re-recordings smash streaming records — rivals scrambling",
  "Bad Bunny cancels world tour — label dispute cited by insiders",
  "Grammy committee faces backlash over Afrobeats categorization",
  "Wizkid and Davido squash beef publicly — joint collab rumors swirl",
  "SZA's label denies album delay reports — 'music coming when it's ready'",
  "Travis Scott's label drops lawsuit against festival promoter",
  "Rema's Calm Down crosses 2B streams — Afrobeats milestone",
  "Doja Cat feuds with her entire fanbase again — streams somehow go up",
  "Cardi B and Nicki Minaj beef resurfaces after award snub",
  "J Balvin calls out Latin Recording Academy for genre bias",
  "Asake's midnight drop breaks Afrobeats first-week streaming record",
  "Spotify playlist editorial team under fire after genre mislabeling",
  "Lil Durk threatens to drop independent — label scrambles to renegotiate",
  "Charli xcx's BRAT era changes fashion across the globe",
  "Young Thug's label situation creates bidding war for his unreleased catalog",
  "Central Cee shuts down feature requests — 'price just went up'",
  "Black Sherif's rise sparks Ghana vs Nigeria music debate online",
  "Karol G shatters Latin female streaming records — industry stunned",
];

export default function Dashboard({ game, advanceWeek, manualSave }) {
  const [showReport, setShowReport] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  const [saving, setSaving] = useState(false);
  const [headlineIdx] = useState(()=>Math.floor(Math.random()*NPC_HEADLINES.length));

  if (!game) return null;

  const tier     = getTier(game.totalRevenue);
  const nextTier = getNextTier(game.totalRevenue);
  const progress = nextTier ? Math.min(100, (game.totalRevenue/nextTier.minRevenue)*100) : 100;
  const trend    = GENRE_TREND_CYCLES[game.currentTrendIdx||0];
  const imgColor = (game.imageHealth||100)>=70?'#2ecc71':(game.imageHealth||100)>=40?'#f39c12':'#e74c3c';
  const pendingObjs = WEEKLY_OBJECTIVES.filter(o=>!(game.objectives||[]).includes(o.id)).slice(0,3);
  const completedCount = (game.objectives||[]).length;
  const diff = game.difficulty||'normal';
  const diffColors = {easy:'#2ecc71',normal:'#f39c12',hard:'#e74c3c',legend:'#9b59b6'};

  const save = () => { setSaving(true); manualSave(); setTimeout(()=>setSaving(false),2000); };

  return (
    <div className="page">
      {/* Industry headline ticker */}
      <div style={{ background:'var(--bg-2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'7px 12px', marginBottom:14, fontSize:11, color:'var(--text-muted)', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
        <span style={{ color:'var(--gold-dim)', fontFamily:'var(--font-display)', letterSpacing:'0.08em', marginRight:8 }}>INDUSTRY</span>
        {NPC_HEADLINES[(headlineIdx + Math.floor(game.week/2)) % NPC_HEADLINES.length]}
      </div>

      {/* Label header */}
      <div style={{ marginBottom:18 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
              <div style={{ fontSize:11, color:'var(--gold-dim)', fontFamily:'var(--font-display)', letterSpacing:'0.12em', textTransform:'uppercase' }}>{tier.name}</div>
              <div style={{ fontSize:9, padding:'1px 6px', borderRadius:2, background:`${diffColors[diff]||'#888'}20`, color:diffColors[diff]||'#888', fontFamily:'var(--font-display)', letterSpacing:'0.08em', border:`1px solid ${diffColors[diff]||'#888'}40` }}>
                {diff.toUpperCase()}
              </div>
            </div>
            <h1 style={{ fontSize:24, fontFamily:'var(--font-display)', color:'var(--gold-light)', lineHeight:1.1 }}>{game.labelName}</h1>
            <div style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>CEO: {game.ownerName}</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={save} style={{ gap:6 }}>
            <IconSave size={14} />{saving?'Saved!':'Save'}
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display:'flex', gap:14, marginTop:10, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-muted)' }}>Wk {game.week} · {getMonth(game.month)} {game.year}</span>
          <span style={{ fontSize:12, color:'var(--gold)' }}>Fame {Math.round(game.labelFame)}</span>
          <span style={{ fontSize:12, color:imgColor }}>Image {Math.round(game.imageHealth||100)}</span>
          <span style={{ fontSize:12, color:'var(--text-muted)' }}>Culture {Math.round(game.labelCulture||50)}</span>
        </div>

        {/* Tier progress */}
        {nextTier && (
          <div style={{ marginTop:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
              <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase' }}>→ {nextTier.name}</span>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--gold-dim)' }}>{fmtM(game.totalRevenue)} / {fmtM(nextTier.minRevenue)}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width:`${progress}%` }} />
            </div>
            <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:3 }}>{nextTier.perks}</div>
          </div>
        )}
      </div>

      {/* Genre trend banner */}
      {trend && (
        <div style={{ background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'var(--radius)', padding:'8px 12px', marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:9, color:'var(--gold-dim)', fontFamily:'var(--font-display)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:2 }}>📈 TRENDING GENRE</div>
            <div style={{ fontSize:13, color:'var(--gold-light)' }}>{trend.description}</div>
          </div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'var(--gold)', flexShrink:0 }}>×{trend.mult}</div>
        </div>
      )}

      {/* Cash card */}
      <div style={{ background:'linear-gradient(135deg,var(--gold) 0%,var(--gold-light) 100%)', borderRadius:'var(--radius-lg)', padding:'18px 20px', marginBottom:12, boxShadow:'0 8px 32px rgba(201,168,76,0.2)' }}>
        <div style={{ fontSize:10, color:'rgba(10,8,4,0.6)', fontFamily:'var(--font-display)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:4 }}>Cash Balance</div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:36, fontWeight:500, color:'#0a0804', lineHeight:1 }}>{fmtM(game.cash)}</div>
        <div style={{ marginTop:8, fontSize:12, color:'rgba(10,8,4,0.5)' }}>
          Total earned: {fmtM(game.totalRevenue)} · Spent: {fmtM(game.totalExpenses)}
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:12 }}>
        {[
          { val:game.roster.length,                           lbl:'Artists' },
          { val:game.releases?.filter(r=>r.active).length||0, lbl:'Releases' },
          { val:game.activeTours?.length||0,                  lbl:'Tours'   },
          { val:game.syncDeals?.length||0,                    lbl:'Syncs'   },
        ].map(s=>(
          <div key={s.lbl} className="stat-cell" style={{ padding:'10px 6px' }}>
            <div className="val" style={{ fontSize:20 }}>{s.val}</div>
            <div className="lbl" style={{ fontSize:9 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Weekly report */}
      {game.weeklyReport && (
        <div className="card" style={{ cursor:'pointer', marginBottom:10 }} onClick={()=>setShowReport(!showReport)}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <IconTrendingUp size={16} color="var(--gold)" />
              <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:'var(--gold)' }}>Week {game.weeklyReport.week} Report</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:game.weeklyReport.netIncome>=0?'#2ecc71':'#e74c3c' }}>
                {game.weeklyReport.netIncome>=0?'+':''}{fmtM(game.weeklyReport.netIncome)}
              </span>
              <IconChevronDown size={14} color="var(--text-muted)" style={{ transform:showReport?'rotate(180deg)':'none', transition:'0.2s' }} />
            </div>
          </div>
          {showReport && (
            <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid var(--border)' }}>
              {[
                { label:'💿 Streaming',   val:game.weeklyReport.streamRevenue, pos:true  },
                { label:'🎪 Tours',       val:game.weeklyReport.tourRevenue,   pos:true  },
                { label:'👕 Merch',       val:game.weeklyReport.merchRevenue,  pos:true  },
                { label:'👤 Artist Fees', val:game.weeklyReport.artistFees,    pos:false },
                { label:'👔 Staff',       val:game.weeklyReport.staffCosts,    pos:false },
                { label:'🏦 Loans',       val:game.weeklyReport.loanPayments,  pos:false },
              ].filter(r=>r.val>0).map(row=>(
                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize:13, color:'var(--text-dim)' }}>{row.label}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:row.pos?'#2ecc71':'#e74c3c' }}>
                    {row.pos?'+':'-'}{fmtM(row.val)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Objectives */}
      <div className="card" style={{ cursor:'pointer', marginBottom:14 }} onClick={()=>setShowObjectives(!showObjectives)}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <IconStar size={16} color="var(--gold)" />
            <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:'var(--gold)' }}>Objectives</span>
            <span className="badge badge-gold">{completedCount} done</span>
          </div>
          <IconChevronDown size={14} color="var(--text-muted)" style={{ transform:showObjectives?'rotate(180deg)':'none', transition:'0.2s' }} />
        </div>
        {showObjectives && (
          <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid var(--border)' }}>
            {pendingObjs.map(obj=>(
              <div key={obj.id} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                <div>
                  <div style={{ fontSize:13 }}>{obj.title}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)' }}>{obj.desc}</div>
                </div>
                <div className="badge badge-gold" style={{ flexShrink:0, marginLeft:8 }}>{fmtM(obj.reward)}</div>
              </div>
            ))}
            {pendingObjs.length===0&&<p style={{ fontSize:13, color:'#2ecc71' }}>All current objectives complete!</p>}
          </div>
        )}
      </div>

      {/* Active releases */}
      {(game.releases||[]).filter(r=>r.active).length>0 && (
        <div style={{ marginBottom:14 }}>
          <div className="section-header"><span className="section-title">Charting Releases</span></div>
          {(game.releases||[]).filter(r=>r.active).sort((a,b)=>b.weeklyStreams-a.weeklyStreams).slice(0,4).map(r=>(
            <div key={r.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontSize:13 }}>{r.title}</span>
                  {r.viralHit&&<span style={{ fontSize:11 }}>🔥</span>}
                  {r.trendBoost&&<span style={{ fontSize:10, color:'var(--gold-dim)' }}>📈</span>}
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:1 }}>{r.artistName} · {r.type} · Q:{r.quality}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--gold)' }}>{fmtS(r.weeklyStreams)}/wk</div>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>{fmtM(r.revenue)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Advance week */}
      <button className="btn btn-gold btn-lg w-full gold-pulse" onClick={advanceWeek} style={{ marginTop:8, letterSpacing:'0.08em' }}>
        <IconRepeat size={18} />Advance Week
      </button>
      <div style={{ marginTop:6, textAlign:'center', fontSize:11, color:'var(--text-muted)' }}>
        Auto-saves every 60s · Resolve events before advancing
      </div>
    </div>
  );
}
