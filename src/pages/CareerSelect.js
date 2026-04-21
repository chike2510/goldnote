import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { IconPlus, IconTrash, IconChevronRight, IconMusic, IconUser, IconLogOut, IconSave, IconClock, IconX } from '../components/Icons';
import { v4 as uuidv4 } from 'uuid';
import { LABEL_TIERS } from '../data/gameData';

function fmtDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getTier(totalRevenue) {
  let tier = LABEL_TIERS[0];
  for (const t of LABEL_TIERS) { if (totalRevenue >= t.minRevenue) tier = t; }
  return tier;
}

export default function CareerSelect({ onSelectCareer, onNewCareer }) {
  const { getUser, logout, getCareers, deleteCareer } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ labelName: '', ownerName: '' });
  const [nameErr, setNameErr] = useState('');

  const user = getUser();
  const careers = getCareers();

  const handleNew = () => {
    if (!newForm.labelName.trim()) { setNameErr('Label name required.'); return; }
    if (!newForm.ownerName.trim()) { setNameErr('Your name required.'); return; }
    const id = uuidv4();
    onNewCareer(id, newForm.labelName.trim(), newForm.ownerName.trim());
  };

  const handleDelete = (career) => {
    deleteCareer(career.id);
    setConfirmDelete(null);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.bg} />

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerLabel}>Signed in as</div>
          <div style={styles.headerUser}>
            <IconUser size={14} color="var(--gold)" />
            <span style={{ marginLeft: 6, color: 'var(--gold-light)', fontFamily: 'var(--font-display)', fontSize: 15 }}>
              {user?.username}
            </span>
          </div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={logout} style={{ gap: 6 }}>
          <IconLogOut size={14} />
          Sign Out
        </button>
      </div>

      <div style={styles.content}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={styles.logoIcon}>
            <IconMusic size={28} color="#0a0804" />
          </div>
          <h1 style={styles.logoText}>GoldNote</h1>
          <p style={styles.tagline}>Select Your Career</p>
        </div>

        {/* Careers */}
        {careers.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div className="section-header">
              <span className="section-title">Your Careers ({careers.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {careers.map(c => {
                const tier = getTier(c.state?.totalRevenue || 0);
                return (
                  <div key={c.id} style={styles.careerCard}>
                    <div style={{ flex: 1 }} onClick={() => onSelectCareer(c.id)}>
                      <div style={styles.careerTop}>
                        <div>
                          <div style={styles.careerName}>{c.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em', marginTop: 2 }}>
                            {tier.icon} {tier.name}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--gold-light)' }}>
                            Wk {c.state?.week || 1}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                            {c.state?.roster?.length || 0} artists
                          </div>
                        </div>
                      </div>
                      <div style={styles.careerMeta}>
                        <IconClock size={11} color="var(--text-muted)" />
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>
                          {c.savedAt ? `Saved ${fmtDate(c.savedAt)}` : 'New career'}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 12 }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectCareer(c.id); }}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '6px 12px' }}
                        aria-label="Continue"
                      >
                        <IconChevronRight size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDelete(c); }}
                        className="btn btn-danger btn-sm"
                        style={{ padding: '6px 12px' }}
                        aria-label="Delete"
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* New career */}
        {!showNew ? (
          <button
            className="btn btn-gold btn-lg w-full"
            onClick={() => setShowNew(true)}
          >
            <IconPlus size={18} />
            {careers.length === 0 ? 'Start Your First Career' : 'New Career'}
          </button>
        ) : (
          <div style={styles.newForm}>
            <div style={styles.newFormHeader}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--gold-light)' }}>
                Found a New Label
              </h3>
              <button onClick={() => setShowNew(false)} className="btn" style={{ padding: 4 }}>
                <IconX size={18} color="var(--text-muted)" />
              </button>
            </div>

            {nameErr && <div style={styles.error}>{nameErr}</div>}

            <div className="form-group">
              <label>Label Name</label>
              <input
                value={newForm.labelName}
                onChange={e => { setNewForm(f => ({ ...f, labelName: e.target.value })); setNameErr(''); }}
                placeholder="e.g. Empire Sound, Neon Records..."
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Your Name</label>
              <input
                value={newForm.ownerName}
                onChange={e => setNewForm(f => ({ ...f, ownerName: e.target.value }))}
                placeholder="Label CEO name"
              />
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, padding: '10px 12px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              💰 Starting capital: <strong style={{ color: 'var(--gold)' }}>$5,000,000</strong>
              <br />Build from an indie label to a global music empire.
            </div>
            <button className="btn btn-gold btn-lg w-full" onClick={handleNew}>
              <IconMusic size={18} />
              Launch Label
            </button>
          </div>
        )}

        <div className="ornament mt-24"><span className="ornament-text">GoldNote Records</span></div>
      </div>

      {/* Delete confirm dialog */}
      {confirmDelete && (
        <div className="confirm-dialog">
          <div className="confirm-box">
            <IconTrash size={28} color="#e74c3c" style={{ margin: '0 auto 12px', display: 'block' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Delete Career?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 20 }}>
              "<strong style={{ color: 'var(--gold)' }}>{confirmDelete.name}</strong>" will be permanently deleted. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline w-full" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={() => handleDelete(confirmDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 55%)',
    pointerEvents: 'none',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 16px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-1)',
    position: 'relative',
    zIndex: 1,
  },
  headerLabel: {
    fontSize: 11,
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  headerUser: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: '24px 16px 48px',
    maxWidth: 480,
    margin: '0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px',
    boxShadow: '0 0 32px rgba(201,168,76,0.25)',
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'var(--font-display)',
    color: 'var(--gold-light)',
    letterSpacing: '0.1em',
  },
  tagline: {
    color: 'var(--text-muted)',
    fontSize: 12,
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  careerCard: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  careerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  careerName: {
    fontFamily: 'var(--font-display)',
    fontSize: 16,
    color: 'var(--gold-light)',
    letterSpacing: '0.04em',
  },
  careerMeta: {
    display: 'flex',
    alignItems: 'center',
  },
  newForm: {
    background: 'var(--surface)',
    border: '1px solid var(--border-2)',
    borderRadius: 'var(--radius-lg)',
    padding: 20,
  },
  newFormHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  error: {
    background: 'var(--danger-dim)',
    border: '1px solid rgba(192,57,43,0.4)',
    borderRadius: 'var(--radius)',
    padding: '8px 12px',
    color: '#e74c3c',
    fontSize: 13,
    marginBottom: 12,
  },
};
