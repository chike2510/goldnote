import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { IconPlus, IconTrash, IconChevronRight, IconMusic, IconUser, IconLogOut, IconX } from '../components/Icons';
import { v4 as uuidv4 } from 'uuid';
import { LABEL_TIERS, DIFFICULTY } from '../data/gameData';

function fmtDate(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
}
function getTier(rev) {
  let t = LABEL_TIERS[0];
  for (const tier of LABEL_TIERS) { if ((rev||0)>=tier.minRevenue) t=tier; }
  return t;
}
function fmtM(n) {
  if (!n&&n!==0) return '$0';
  if (n>=1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n>=1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n>=1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}

const DIFF_META = {
  easy:   { color:'#2ecc71', emoji:'🟢', desc:'$8M start · High revenue · Weak rivals · Chill vibes'          },
  normal: { color:'#f39c12', emoji:'🟡', desc:'$5M start · Balanced · Moderate rivals · Regular drama'         },
  hard:   { color:'#e74c3c', emoji:'🔴', desc:'$2.5M start · Tight margins · Strong rivals · Frequent crises'  },
  legend: { color:'#9b59b6', emoji:'💀', desc:'$1M start · Brutal · Aggressive rivals · Constant fire'          },
};

export default function CareerSelect({ onSelectCareer, onNewCareer }) {
  const { getUser, logout, getCareers, deleteCareer } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ labelName:'', ownerName:'', difficulty:'normal' });
  const [err, setErr] = useState('');

  const user = getUser();
  const careers = getCareers();

  const handleNew = () => {
    if (!form.labelName.trim()) { setErr('Label name required.'); return; }
    if (!form.ownerName.trim()) { setErr('CEO name required.'); return; }
    onNewCareer(uuidv4(), form.labelName.trim(), form.ownerName.trim(), form.difficulty);
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 55%)', pointerEvents:'none' }} />

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom:'1px solid var(--border)', background:'var(--bg-1)', position:'relative', zIndex:1 }}>
        <div>
          <div style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-display)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:2 }}>Signed in as</div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <IconUser size={13} color="var(--gold)" />
            <span style={{ color:'var(--gold-light)', fontFamily:'var(--font-display)', fontSize:15 }}>{user?.username}</span>
          </div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={logout} style={{ gap:6 }}>
          <IconLogOut size={14} />Sign Out
        </button>
      </div>

      <div style={{ flex:1, padding:'24px 16px 48px', maxWidth:480, margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,var(--gold),var(--gold-light))', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px', boxShadow:'0 0 32px rgba(201,168,76,0.25)' }}>
            <IconMusic size={28} color="#0a0804" />
          </div>
          <h1 style={{ fontSize:30, fontFamily:'var(--font-display)', color:'var(--gold-light)', letterSpacing:'0.1em' }}>GoldNote</h1>
          <p style={{ color:'var(--text-muted)', fontSize:11, fontFamily:'var(--font-display)', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:4 }}>Music Label Tycoon</p>
        </div>

        {/* Existing careers */}
        {careers.length > 0 && (
          <div style={{ marginBottom:20 }}>
            <div className="section-header"><span className="section-title">Your Careers ({careers.length})</span></div>
            {careers.map(c => {
              const tier = getTier(c.state?.totalRevenue||0);
              const diff = c.state?.difficulty||'normal';
              const dm = DIFF_META[diff]||DIFF_META.normal;
              return (
                <div key={c.id} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-lg)', padding:'14px 16px', display:'flex', alignItems:'center', marginBottom:10 }}>
                  <div style={{ flex:1, cursor:'pointer' }} onClick={()=>onSelectCareer(c.id)}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <div>
                        <div style={{ fontFamily:'var(--font-display)', fontSize:16, color:'var(--gold-light)' }}>{c.name}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:1 }}>
                          {tier.name} · <span style={{ color:dm.color }}>{dm.emoji} {DIFFICULTY[diff]?.label||diff}</span>
                        </div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--gold)' }}>{fmtM(c.state?.cash||0)}</div>
                        <div style={{ fontSize:11, color:'var(--text-muted)' }}>Wk {c.state?.week||1}</div>
                      </div>
                    </div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>
                      {c.state?.roster?.length||0} artists · {fmtM(c.state?.totalRevenue||0)} earned
                      {c.savedAt && <span> · Saved {fmtDate(c.savedAt)}</span>}
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:8, marginLeft:12 }}>
                    <button className="btn btn-outline btn-sm" onClick={()=>onSelectCareer(c.id)} aria-label="Continue"><IconChevronRight size={14} /></button>
                    <button className="btn btn-danger btn-sm" onClick={()=>setConfirmDelete(c)} aria-label="Delete"><IconTrash size={14} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* New career */}
        {!showNew ? (
          <button className="btn btn-gold btn-lg w-full" onClick={()=>setShowNew(true)}>
            <IconPlus size={18} />{careers.length===0?'Start Your First Career':'New Career'}
          </button>
        ) : (
          <div style={{ background:'var(--surface)', border:'1px solid var(--border-2)', borderRadius:'var(--radius-lg)', padding:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:16, color:'var(--gold-light)' }}>Found a New Label</h3>
              <button onClick={()=>setShowNew(false)} style={{ padding:4, background:'none', border:'none', cursor:'pointer', minHeight:36 }}>
                <IconX size={18} color="var(--text-muted)" />
              </button>
            </div>
            {err && <div style={{ background:'var(--danger-dim)', border:'1px solid rgba(192,57,43,0.4)', borderRadius:'var(--radius)', padding:'8px 12px', color:'#e74c3c', fontSize:13, marginBottom:12 }}>{err}</div>}
            <div className="form-group">
              <label>Label Name</label>
              <input value={form.labelName} onChange={e=>{setForm(f=>({...f,labelName:e.target.value}));setErr('');}} placeholder="e.g. Empire Sound, Gold Era Records..." autoFocus />
            </div>
            <div className="form-group">
              <label>CEO Name</label>
              <input value={form.ownerName} onChange={e=>setForm(f=>({...f,ownerName:e.target.value}))} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {Object.entries(DIFF_META).map(([key,dm])=>(
                  <div key={key} onClick={()=>setForm(f=>({...f,difficulty:key}))} style={{ padding:'10px 14px', borderRadius:'var(--radius)', cursor:'pointer', border:form.difficulty===key?`1px solid ${dm.color}`:'1px solid var(--border)', background:form.difficulty===key?`${dm.color}12`:'var(--bg-2)', transition:'all 0.15s' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize:13, color:form.difficulty===key?dm.color:'var(--text)' }}>{dm.emoji} {DIFFICULTY[key]?.label||key}</span>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gold-dim)' }}>{fmtM(DIFFICULTY[key]?.startCash)}</span>
                    </div>
                    <div style={{ fontSize:11, color:'var(--text-muted)' }}>{dm.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-gold btn-lg w-full" onClick={handleNew}>
              <IconMusic size={18} /> Launch Label
            </button>
          </div>
        )}
        <div className="ornament mt-24"><span className="ornament-text">GoldNote Records</span></div>
      </div>

      {confirmDelete && (
        <div className="confirm-dialog">
          <div className="confirm-box">
            <IconTrash size={28} color="#e74c3c" style={{ margin:'0 auto 12px', display:'block' }} />
            <h3 style={{ fontFamily:'var(--font-display)', marginBottom:8 }}>Delete Career?</h3>
            <p style={{ color:'var(--text-dim)', fontSize:14, marginBottom:20 }}>
              "<strong style={{ color:'var(--gold)' }}>{confirmDelete.name}</strong>" will be permanently deleted.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn btn-outline w-full" onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={()=>{deleteCareer(confirmDelete.id);setConfirmDelete(null);}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
