import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { IconSave, IconTrash, IconLogOut, IconUser, IconKey, IconX, IconCheck, IconInfo } from '../components/Icons';
import { LABEL_TIERS } from '../data/gameData';

function fmtMoney(n) {
  if (!n && n !== 0) return '$0';
  if (n >= 1e9) return `$${(n/1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n/1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`;
  return `$${Math.floor(n).toLocaleString()}`;
}

function getLabelTier(totalRevenue) {
  let tier = LABEL_TIERS[0];
  for (const t of LABEL_TIERS) { if ((totalRevenue || 0) >= t.minRevenue) tier = t; }
  return tier;
}

function fmtDate(ts) {
  if (!ts) return 'Never';
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function Settings({ game, manualSave, onExitToMenu, careerId }) {
  const { getUser, logout, deleteAccount, getCareers, deleteCareer } = useAuth();
  const [confirmDeleteCareer, setConfirmDeleteCareer] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [deleteAccForm, setDeleteAccForm] = useState({ username: '', password: '' });
  const [deleteAccError, setDeleteAccError] = useState('');
  const [saved, setSaved] = useState(false);

  const user = getUser();
  const careers = getCareers();
  const tier = game ? getLabelTier(game.totalRevenue) : LABEL_TIERS[0];

  const handleManualSave = () => {
    manualSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteCareer = () => {
    deleteCareer(careerId);
    setConfirmDeleteCareer(false);
    onExitToMenu();
  };

  const handleDeleteAccount = () => {
    setDeleteAccError('');
    const ok = deleteAccount(deleteAccForm.username, deleteAccForm.password);
    if (!ok) {
      setDeleteAccError('Incorrect username or password.');
      return;
    }
    // Auth context logs out automatically
  };

  return (
    <div className="page">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20, letterSpacing: '0.05em' }}>
          Settings
        </h2>
      </div>

      {/* Career info */}
      {game && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Current Career</div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Label</span>
            <span style={styles.infoVal}>{game.labelName}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>CEO</span>
            <span style={styles.infoVal}>{game.ownerName}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Tier</span>
            <span style={styles.infoVal}>{tier.icon} {tier.name}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Week</span>
            <span style={styles.infoVal}>{game.week}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Cash</span>
            <span style={{ ...styles.infoVal, fontFamily: 'var(--font-mono)', color: 'var(--gold-light)' }}>{fmtMoney(game.cash)}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Total Revenue</span>
            <span style={{ ...styles.infoVal, fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{fmtMoney(game.totalRevenue)}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Roster Size</span>
            <span style={styles.infoVal}>{game.roster?.length || 0} artists</span>
          </div>
        </div>
      )}

      {/* Account info */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Account</div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Username</span>
          <span style={styles.infoVal}>{user?.username}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Email</span>
          <span style={styles.infoVal}>{user?.email}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Careers</span>
          <span style={styles.infoVal}>{careers.length}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Member since</span>
          <span style={styles.infoVal}>{user?.createdAt ? fmtDate(user.createdAt) : '—'}</span>
        </div>
      </div>

      {/* Save */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Save Game</div>
        <p style={styles.desc}>Game auto-saves every 60 seconds. You can also save manually at any time.</p>
        <button
          className={`btn ${saved ? 'btn-outline' : 'btn-gold'} w-full`}
          onClick={handleManualSave}
          style={{ gap: 8 }}
        >
          {saved ? <IconCheck size={16} color="var(--success)" /> : <IconSave size={16} />}
          {saved ? 'Saved!' : 'Save Now'}
        </button>
      </div>

      {/* Navigation */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Navigation</div>
        <button
          className="btn btn-outline w-full"
          onClick={onExitToMenu}
          style={{ gap: 8, marginBottom: 10 }}
        >
          <IconUser size={16} />
          Back to Career Select
        </button>
        <button
          className="btn btn-outline w-full"
          onClick={() => setConfirmLogout(true)}
          style={{ gap: 8 }}
        >
          <IconX size={16} />
          Sign Out
        </button>
      </div>

      {/* Danger zone */}
      <div style={{ ...styles.section, borderColor: 'rgba(192,57,43,0.3)' }}>
        <div style={{ ...styles.sectionTitle, color: '#e74c3c' }}>Danger Zone</div>

        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 10 }}>
            <strong style={{ color: 'var(--text)' }}>Delete Career</strong> — Permanently deletes "{game?.labelName}" and all its progress.
          </p>
          <button
            className="btn btn-danger w-full"
            onClick={() => setConfirmDeleteCareer(true)}
            style={{ gap: 8 }}
          >
            <IconTrash size={16} />
            Delete This Career
          </button>
        </div>

        <div className="divider" />

        <div>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 10 }}>
            <strong style={{ color: 'var(--text)' }}>Delete Account</strong> — Permanently deletes your account and ALL careers. This cannot be undone.
          </p>
          <button
            className="btn btn-danger w-full"
            onClick={() => setConfirmDeleteAccount(true)}
            style={{ gap: 8 }}
          >
            <IconTrash size={16} />
            Delete My Account
          </button>
        </div>
      </div>

      <div style={{ height: 16 }} />

      {/* Confirm logout */}
      {confirmLogout && (
        <div className="confirm-dialog">
          <div className="confirm-box">
            <IconX size={28} color="var(--gold)" style={{ margin: '0 auto 12px', display: 'block' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Sign Out?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 20 }}>
              Your progress is auto-saved. You can sign back in anytime.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline w-full" onClick={() => setConfirmLogout(false)}>Cancel</button>
              <button className="btn btn-gold w-full" onClick={logout}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete career */}
      {confirmDeleteCareer && (
        <div className="confirm-dialog">
          <div className="confirm-box">
            <IconTrash size={28} color="#e74c3c" style={{ margin: '0 auto 12px', display: 'block' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Delete Career?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 6 }}>
              "<strong style={{ color: 'var(--gold)' }}>{game?.labelName}</strong>" will be gone forever.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              Week {game?.week} · {game?.roster?.length || 0} artists · {fmtMoney(game?.totalRevenue)} earned
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline w-full" onClick={() => setConfirmDeleteCareer(false)}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={handleDeleteCareer}>Delete Forever</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete account */}
      {confirmDeleteAccount && (
        <div className="confirm-dialog">
          <div className="confirm-box" style={{ maxWidth: 360 }}>
            <IconTrash size={28} color="#e74c3c" style={{ margin: '0 auto 12px', display: 'block' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Delete Account?</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 16 }}>
              This will permanently delete your account and all {careers.length} career(s). Confirm with your credentials.
            </p>
            {deleteAccError && (
              <div style={{ background: 'var(--danger-dim)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 'var(--radius)', padding: '8px 12px', color: '#e74c3c', fontSize: 13, marginBottom: 12, textAlign: 'left' }}>
                {deleteAccError}
              </div>
            )}
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Username</label>
              <input
                value={deleteAccForm.username}
                onChange={e => setDeleteAccForm(f => ({ ...f, username: e.target.value }))}
                placeholder="Confirm username"
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Password</label>
              <input
                type="password"
                value={deleteAccForm.password}
                onChange={e => setDeleteAccForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Confirm password"
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-outline w-full" onClick={() => { setConfirmDeleteAccount(false); setDeleteAccError(''); }}>Cancel</button>
              <button className="btn btn-danger w-full" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  section: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 11,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--gold-dim)',
    marginBottom: 12,
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
  },
  infoLabel: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
  infoVal: {
    fontSize: 13,
    color: 'var(--text)',
  },
  desc: {
    fontSize: 13,
    color: 'var(--text-muted)',
    marginBottom: 12,
    lineHeight: 1.5,
  },
};
