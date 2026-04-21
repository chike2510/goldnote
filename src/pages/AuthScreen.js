import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { IconUser, IconLock, IconMail, IconMusic } from '../components/Icons';

export default function AuthScreen({ onAuth }) {
  const { register, login, authError, setAuthError } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ username: '', password: '', email: '', confirmPassword: '' });

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setAuthError(''); };

  const handleSubmit = () => {
    if (mode === 'register') {
      if (form.password !== form.confirmPassword) { setAuthError('Passwords do not match.'); return; }
      const ok = register(form.username.trim(), form.password, form.email.trim());
      if (ok) onAuth();
    } else {
      const ok = login(form.username.trim(), form.password);
      if (ok) onAuth();
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.bg} />
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <IconMusic size={32} color="#0a0804" />
          </div>
          <h1 style={styles.logoText}>GoldNote</h1>
          <p style={styles.tagline}>Music Label Tycoon</p>
        </div>

        {/* Tab switcher */}
        <div style={styles.tabs}>
          {['login','register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setAuthError(''); }} style={{
              ...styles.tab,
              ...(mode === m ? styles.tabActive : {})
            }}>
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={styles.form}>
          {authError && (
            <div style={styles.error}>{authError}</div>
          )}

          <div className="form-group">
            <label>Username</label>
            <div style={styles.inputWrap}>
              <IconUser size={16} color="var(--gold-dim)" style={styles.inputIcon} />
              <input
                value={form.username}
                onChange={e => set('username', e.target.value)}
                placeholder="your_username"
                style={styles.input}
                autoComplete="username"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label>Email</label>
              <div style={styles.inputWrap}>
                <IconMail size={16} color="var(--gold-dim)" style={styles.inputIcon} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="you@email.com"
                  style={styles.input}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <div style={styles.inputWrap}>
              <IconLock size={16} color="var(--gold-dim)" style={styles.inputIcon} />
              <input
                type="password"
                value={form.password}
                onChange={e => set('password', e.target.value)}
                placeholder={mode === 'register' ? 'Min 6 characters' : '••••••••'}
                style={styles.input}
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div style={styles.inputWrap}>
                <IconLock size={16} color="var(--gold-dim)" style={styles.inputIcon} />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => set('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  style={styles.input}
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          <button className="btn btn-gold btn-lg w-full" onClick={handleSubmit} style={{ marginTop: 8 }}>
            {mode === 'login' ? 'Enter the Industry' : 'Start My Journey'}
          </button>
        </div>

        <p style={styles.footer}>
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span style={styles.link} onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setAuthError(''); }}>
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </span>
        </p>

        <div className="ornament mt-24"><span className="ornament-text">GoldNote Records</span></div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, rgba(201,168,76,0.04) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  container: {
    width: '100%',
    maxWidth: 400,
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    textAlign: 'center',
    marginBottom: 32,
  },
  logoIcon: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    boxShadow: '0 0 40px rgba(201,168,76,0.3)',
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'var(--font-display)',
    color: 'var(--gold-light)',
    letterSpacing: '0.1em',
  },
  tagline: {
    color: 'var(--text-muted)',
    fontSize: 13,
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  tabs: {
    display: 'flex',
    background: 'var(--bg-2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    marginBottom: 24,
    padding: 3,
  },
  tab: {
    flex: 1,
    padding: '10px 0',
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    borderRadius: 'var(--radius)',
    transition: 'all 0.2s',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  tabActive: {
    background: 'linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.6))',
    color: '#0a0804',
  },
  form: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    marginBottom: 16,
  },
  error: {
    background: 'var(--danger-dim)',
    border: '1px solid rgba(192,57,43,0.4)',
    borderRadius: 'var(--radius)',
    padding: '10px 14px',
    color: '#e74c3c',
    fontSize: 13,
    marginBottom: 16,
  },
  inputWrap: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  input: {
    paddingLeft: 36,
  },
  footer: {
    textAlign: 'center',
    color: 'var(--text-dim)',
    fontSize: 13,
  },
  link: {
    color: 'var(--gold)',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};
