import React, { useState } from 'react';
import { GENRE_TREND_CYCLES } from '../data/gameData';

const TYPE_META = {
  milestone: { icon:'🏆', color:'#f1c40f',   label:'Milestone',  bg:'rgba(241,196,15,0.08)'  },
  signing:   { icon:'✍️', color:'#2ecc71',   label:'Signing',    bg:'rgba(39,174,96,0.08)'   },
  release:   { icon:'🎵', color:'#3498db',   label:'Release',    bg:'rgba(52,152,219,0.08)'  },
  viral:     { icon:'🔥', color:'#e74c3c',   label:'Viral',      bg:'rgba(231,76,60,0.10)'   },
  beef:      { icon:'⚡', color:'#e74c3c',   label:'Drama',      bg:'rgba(231,76,60,0.08)'   },
  scandal:   { icon:'💥', color:'#e74c3c',   label:'Scandal',    bg:'rgba(192,57,43,0.10)'   },
  crisis:    { icon:'🚨', color:'#c0392b',   label:'Crisis',     bg:'rgba(192,57,43,0.12)'   },
  award:     { icon:'🏅', color:'#f39c12',   label:'Award',      bg:'rgba(230,126,34,0.08)'  },
  collab:    { icon:'🤝', color:'#9b59b6',   label:'Collab',     bg:'rgba(155,89,182,0.08)'  },
  positive:  { icon:'✨', color:'#2ecc71',   label:'Good News',  bg:'rgba(39,174,96,0.08)'   },
  deal:      { icon:'💰', color:'#2ecc71',   label:'Deal',       bg:'rgba(39,174,96,0.08)'   },
  news:      { icon:'📰', color:'#95a5a6',   label:'Industry',   bg:'rgba(149,165,166,0.06)' },
  warning:   { icon:'⚠️', color:'#f39c12',   label:'Alert',      bg:'rgba(230,126,34,0.08)'  },
  tour:      { icon:'🎪', color:'#3498db',   label:'Tour',       bg:'rgba(52,152,219,0.08)'  },
  internal:  { icon:'💼', color:'#e67e22',   label:'Internal',   bg:'rgba(230,126,34,0.08)'  },
  trend:     { icon:'📈', color:'#c9a84c',   label:'Trend',      bg:'rgba(201,168,76,0.08)'  },
  nearMiss:  { icon:'😤', color:'#f39c12',   label:'Near Miss',  bg:'rgba(230,126,34,0.10)'  },
  rival:     { icon:'🏴', color:'#95a5a6',   label:'Rival',      bg:'rgba(149,165,166,0.06)' },
  tip:       { icon:'💡', color:'#3498db',   label:'Tip',        bg:'rgba(52,152,219,0.06)'  },
};

const FILTERS = ['ALL','IMPORTANT','RELEASES','DRAMA','AWARDS','BUSINESS','ALERTS'];

function timeLabel(feedWeek, curWeek) {
  const d = (curWeek||1) - (feedWeek||1);
  if (d <= 0) return 'Just now';
  if (d === 1) return '1 wk ago';
  if (d < 4)  return `${d} wks ago`;
  if (d < 52) return `${Math.floor(d/4)}mo ago`;
  return `${Math.floor(d/52)}yr ago`;
}

export default function SocialFeed({ game }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const feed = game.socialFeed || [];
  const currentTrend = GENRE_TREND_CYCLES[game.currentTrendIdx];
  const importantCount = feed.filter(f => f.important).length;

  const filtered = feed.filter(item => {
    if (search && !item.text.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'ALL')       return true;
    if (filter === 'IMPORTANT') return item.important;
    if (filter === 'RELEASES')  return ['release','viral','signing'].includes(item.type);
    if (filter === 'DRAMA')     return ['beef','scandal','crisis','internal','nearMiss'].includes(item.type);
    if (filter === 'AWARDS')    return ['award','milestone'].includes(item.type);
    if (filter === 'BUSINESS')  return ['deal','tour','trend'].includes(item.type);
    if (filter === 'ALERTS')    return ['warning','crisis','nearMiss'].includes(item.type);
    return true;
  });

  return (
    <div className="page" style={{ paddingBottom:80 }}>
      {/* Header */}
      <div style={{ marginBottom:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <h2 style={{ fontFamily:'var(--font-display)', color:'var(--gold-light)', fontSize:20 }}>Industry Feed</h2>
            <p style={{ color:'var(--text-muted)', fontSize:13, marginTop:3 }}>
              {feed.length} items · Wk {game.week}
              {importantCount > 0 && (
                <span style={{ color:'#f39c12', marginLeft:8 }}>🔔 {importantCount} important</span>
              )}
            </p>
          </div>
        </div>

        {/* Trend banner */}
        {currentTrend && (
          <div style={{ marginTop:10, padding:'8px 12px', background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'var(--radius)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
            <div>
              <div style={{ fontSize:9, color:'var(--gold-dim)', fontFamily:'var(--font-display)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:2 }}>📈 TRENDING NOW</div>
              <div style={{ fontSize:13, color:'var(--gold-light)' }}>{currentTrend.description}</div>
            </div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'var(--gold)', flexShrink:0 }}>×{currentTrend.mult}</div>
          </div>
        )}

        {/* Search */}
        <div style={{ marginTop:10 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search feed..."
            style={{ fontSize:14 }}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4, marginBottom:14 }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding:'5px 12px', borderRadius:20, fontSize:10, whiteSpace:'nowrap',
            fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase',
            border: filter===f ? '1px solid var(--gold)' : '1px solid var(--border)',
            background: filter===f ? 'rgba(201,168,76,0.12)' : 'transparent',
            color: filter===f ? 'var(--gold)' : 'var(--text-muted)',
            cursor:'pointer', minHeight:34,
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'48px 0', color:'var(--text-muted)' }}>
          <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
          <p>{search ? 'No results found.' : 'Nothing here yet. Advance a week.'}</p>
        </div>
      )}

      {/* Feed items */}
      <div>
        {filtered.map((item, i) => {
          const meta = TYPE_META[item.type] || TYPE_META.news;
          return (
            <div
              key={item.id || i}
              style={{
                display:'flex', gap:12,
                padding: item.important ? '12px 16px' : '11px 0',
                margin: item.important ? '0 -16px' : '0',
                borderBottom:'1px solid var(--border)',
                background: item.important ? meta.bg : 'transparent',
              }}
            >
              {/* Icon dot */}
              <div style={{
                width:32, height:32, borderRadius:'50%', flexShrink:0,
                background:`${meta.color}18`, border:`1px solid ${meta.color}35`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:14,
              }}>
                {meta.icon}
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                {/* Type + time */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:9, fontFamily:'var(--font-display)', letterSpacing:'0.1em', textTransform:'uppercase', color:meta.color }}>
                      {meta.label}
                    </span>
                    {item.important && (
                      <span style={{ fontSize:8, padding:'1px 5px', background:`${meta.color}20`, color:meta.color, borderRadius:2, fontFamily:'var(--font-display)', letterSpacing:'0.1em' }}>
                        IMPORTANT
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)', flexShrink:0 }}>
                    {timeLabel(item.week, game.week)}
                  </span>
                </div>

                {/* Text */}
                <p style={{ fontSize:13, color: item.important ? 'var(--text)' : 'var(--text-dim)', lineHeight:1.55, margin:0 }}>
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
