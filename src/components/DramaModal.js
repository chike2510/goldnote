import React, { useState, useEffect } from 'react';
import { IconX, IconZap, IconAlertTriangle, IconStar, IconMusic, IconClock } from '../components/Icons';

const SEV = {
  positive: { border:'rgba(39,174,96,0.4)',   bg:'rgba(39,174,96,0.06)',   accent:'#2ecc71', label:'OPPORTUNITY'  },
  medium:   { border:'rgba(230,126,34,0.4)',   bg:'rgba(230,126,34,0.06)', accent:'#f39c12', label:'SITUATION'    },
  high:     { border:'rgba(231,76,60,0.45)',   bg:'rgba(231,76,60,0.06)',  accent:'#e74c3c', label:'CRISIS'       },
  critical: { border:'rgba(192,57,43,0.6)',    bg:'rgba(192,57,43,0.10)',  accent:'#c0392b', label:'EMERGENCY'    },
};

const TYPE_ICON = {
  viral:    '🔥', scandal: '💥', crisis: '🚨', beef: '⚡',
  award:    '🏆', collab:  '🎤', internal:'💼', tour: '🎪',
  release:  '🎵', nearMiss:'📊',
};

function Risk({ level }) {
  const colors = { low:'#2ecc71', medium:'#f39c12', high:'#e74c3c' };
  return (
    <span style={{ fontSize:10, padding:'2px 7px', borderRadius:2, background:`${colors[level]||'#888'}20`, color:colors[level]||'#888', border:`1px solid ${colors[level]||'#888'}40`, fontFamily:'var(--font-display)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
      {level} risk
    </span>
  );
}

function Delta({ label, val, suffix='' }) {
  if (!val&&val!==0) return null;
  const c = val>0?'#2ecc71':val<0?'#e74c3c':'var(--text-muted)';
  return (
    <span style={{ fontSize:10, padding:'2px 6px', borderRadius:2, background:`${c}15`, color:c, border:`1px solid ${c}30`, fontFamily:'var(--font-mono)', marginRight:4 }}>
      {val>0?'+':''}{val}{suffix} {label}
    </span>
  );
}

export default function DramaModal({ event, game, onResolve }) {
  const [sel, setSel] = useState(null);
  const [timer, setTimer] = useState(null);

  // Urgent events get a countdown (30s for urgent)
  useEffect(() => {
    if (!event) return;
    setSel(null);
    if (event.urgent) {
      setTimer(45);
      const interval = setInterval(() => setTimer(t => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      }), 1000);
      return () => clearInterval(interval);
    }
  }, [event]);

  if (!event) return null;
  const sev = SEV[event.severity] || SEV.medium;
  const hasPR = (game?.staff?.pr || 0) >= 2;

  const confirm = () => {
    if (sel === null) return;
    onResolve(event, sel, event.artistId);
    setSel(null);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', backdropFilter:'blur(8px)', zIndex:850, display:'flex', alignItems:'flex-end', justifyContent:'center', padding:16, animation:'fadeIn 0.2s' }}>
      <div style={{
        width:'100%', maxWidth:480,
        background:`linear-gradient(180deg, ${sev.bg} 0%, var(--bg-2) 60%)`,
        border:`1px solid ${sev.border}`,
        borderRadius:'14px 14px 0 0',
        padding:'22px 20px 28px',
        maxHeight:'88vh', overflowY:'auto',
        animation:'slideUp 0.3s ease',
      }}>

        {/* Type badge + timer */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:24 }}>{TYPE_ICON[event.type]||'📋'}</span>
            <div>
              <div style={{ fontSize:10, fontFamily:'var(--font-display)', letterSpacing:'0.15em', textTransform:'uppercase', color:sev.accent }}>{sev.label}</div>
              <div style={{ fontSize:11, color:'var(--text-muted)' }}>Week {game?.week} · Needs your decision</div>
            </div>
          </div>
          {timer !== null && timer > 0 && (
            <div style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:'var(--radius)', background:timer<10?'rgba(231,76,60,0.15)':'var(--bg-3)', border:`1px solid ${timer<10?'rgba(231,76,60,0.4)':'var(--border)'}` }}>
              <IconClock size={12} color={timer<10?'#e74c3c':'var(--text-muted)'} />
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:timer<10?'#e74c3c':'var(--text-muted)' }}>{timer}s</span>
            </div>
          )}
          {timer === 0 && (
            <span style={{ fontSize:11, color:'#f39c12', fontFamily:'var(--font-display)' }}>TIME UP</span>
          )}
        </div>

        {/* Artist badge */}
        {event.artistName && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:`${sev.accent}20`, border:`1px solid ${sev.accent}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:15, color:sev.accent }}>
              {event.artistName.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize:14, fontFamily:'var(--font-display)', color:'var(--text)' }}>{event.artistName}</div>
              {game?.roster?.find(a=>a.id===event.artistId) && (
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>
                  Loyalty: {game.roster.find(a=>a.id===event.artistId)?.loyalty||'?'} · Mood: {game.roster.find(a=>a.id===event.artistId)?.mood||'?'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Headline */}
        <div style={{ fontSize:16, lineHeight:1.55, color:'var(--text)', borderLeft:`3px solid ${sev.accent}`, paddingLeft:14, marginBottom:8, fontWeight:400 }}>
          {(event.headline||'').replace('[ARTIST]', event.artistName||'Your Artist')}
        </div>

        {/* Story beat */}
        {event.storyBeat && (
          <div style={{ fontSize:13, color:'var(--text-muted)', marginBottom:16, fontStyle:'italic', paddingLeft:14 }}>
            {event.storyBeat}
          </div>
        )}

        {/* Choices */}
        <div style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:10 }}>
          YOUR RESPONSE
        </div>

        {(event.choices||[]).map((c, i) => {
          const active = sel===i;
          return (
            <div key={i} onClick={()=>setSel(i)} style={{
              padding:'12px 14px', borderRadius:'var(--radius)', marginBottom:8, cursor:'pointer',
              border: active ? `1px solid ${sev.accent}` : '1px solid var(--border)',
              background: active ? `${sev.accent}10` : 'var(--bg-2)',
              transition:'all 0.15s',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:active?sev.accent:'var(--text)', letterSpacing:'0.02em', lineHeight:1.3 }}>
                  {c.label}
                </span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:c.cost<0?'#2ecc71':c.cost>0?'#e74c3c':'var(--text-muted)', marginLeft:8, flexShrink:0 }}>
                  {c.cost<0 ? `+$${(Math.abs(c.cost)/1000).toFixed(0)}K` : c.cost>0 ? `-$${(c.cost/1000).toFixed(0)}K` : 'Free'}
                </span>
              </div>

              <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:6 }}>{c.desc}</div>

              <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:4 }}>
                <Delta label="Streams" val={c.streamBoost} suffix="%" />
                <Delta label="Fame"    val={c.fameDelta} />
                <Delta label="Mood"    val={c.moodDelta} />
                {c.loyaltyDelta && <Delta label="Loyalty" val={c.loyaltyDelta} />}
                <Risk level={c.risk} />
                {c.dropsArtist && <span style={{ fontSize:10, padding:'2px 7px', borderRadius:2, background:'rgba(231,76,60,0.15)', color:'#e74c3c', border:'1px solid rgba(231,76,60,0.4)', fontFamily:'var(--font-display)' }}>DROPS ARTIST</span>}
              </div>

              {c.riskNote && active && (
                <div style={{ fontSize:11, color:'#f39c12', marginTop:4 }}>⚠️ {c.riskNote}</div>
              )}

              {/* PR insight */}
              {hasPR && active && (
                <div style={{ marginTop:8, padding:'6px 10px', background:'rgba(39,174,96,0.05)', border:'1px solid rgba(39,174,96,0.15)', borderRadius:'var(--radius)', fontSize:11, color:'#2ecc71' }}>
                  📣 PR Team: {c.risk==='low'?'Clean move. We can manage this.':c.risk==='medium'?'Calculated risk. Monitor press closely.':'Volatile. Brace for blowback.'}
                </div>
              )}
            </div>
          );
        })}

        {/* Confirm */}
        <button
          onClick={confirm}
          className="btn btn-gold btn-lg w-full"
          disabled={sel===null}
          style={{ opacity:sel===null?0.45:1, marginTop:6 }}
        >
          {sel===null ? 'Select a response above' : `Confirm: ${event.choices?.[sel]?.label}`}
        </button>

        <p style={{ textAlign:'center', fontSize:11, color:'var(--text-muted)', marginTop:10 }}>
          This decision affects your artist's career and your label's reputation.
        </p>
      </div>
    </div>
  );
}
