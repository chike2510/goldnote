import React from 'react';
import { IconActivity, IconMusic, IconStar, IconAlertTriangle, IconTrendingUp, IconZap } from '../components/Icons';

const typeConfig = {
  milestone: { color: 'var(--gold)', icon: <IconStar size={14} color="var(--gold)" />, label: 'Milestone' },
  signing: { color: '#2ecc71', icon: <IconMusic size={14} color="#2ecc71" />, label: 'Signing' },
  release: { color: '#3498db', icon: <IconMusic size={14} color="#3498db" />, label: 'Release' },
  viral: { color: '#e74c3c', icon: <IconTrendingUp size={14} color="#e74c3c" />, label: 'Viral' },
  beef: { color: '#e74c3c', icon: <IconZap size={14} color="#e74c3c" />, label: 'Drama' },
  scandal: { color: '#e74c3c', icon: <IconAlertTriangle size={14} color="#e74c3c" />, label: 'Scandal' },
  crisis: { color: '#e74c3c', icon: <IconAlertTriangle size={14} color="#e74c3c" />, label: 'Crisis' },
  award: { color: '#f39c12', icon: <IconStar size={14} color="#f39c12" />, label: 'Award' },
  collab: { color: '#9b59b6', icon: <IconMusic size={14} color="#9b59b6" />, label: 'Collab' },
  interview: { color: '#1abc9c', icon: <IconActivity size={14} color="#1abc9c" />, label: 'Press' },
  personal: { color: '#95a5a6', icon: <IconActivity size={14} color="#95a5a6" />, label: 'Personal' },
  positive: { color: '#2ecc71', icon: <IconStar size={14} color="#2ecc71" />, label: 'Good News' },
  internal: { color: '#f39c12', icon: <IconAlertTriangle size={14} color="#f39c12" />, label: 'Internal' },
  tour: { color: '#3498db', icon: <IconActivity size={14} color="#3498db" />, label: 'Tour' },
  deal: { color: '#2ecc71', icon: <IconTrendingUp size={14} color="#2ecc71" />, label: 'Deal' },
  news: { color: 'var(--text-muted)', icon: <IconActivity size={14} color="var(--text-muted)" />, label: 'Industry' },
  warning: { color: '#f39c12', icon: <IconAlertTriangle size={14} color="#f39c12" />, label: 'Alert' },
};

function timeAgo(feedWeek, currentWeek) {
  const diff = currentWeek - feedWeek;
  if (diff <= 0) return 'Just now';
  if (diff === 1) return '1 week ago';
  if (diff < 4) return `${diff} weeks ago`;
  if (diff < 52) return `${Math.floor(diff / 4)} months ago`;
  return `${Math.floor(diff / 52)} years ago`;
}

export default function SocialFeed({ game }) {
  const feed = game.socialFeed || [];

  return (
    <div className="page">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)', fontSize: 20, letterSpacing: '0.05em' }}>
          Industry Feed
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
          Live buzz from the music world
        </p>
      </div>

      {feed.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          <IconActivity size={40} color="var(--gold-dim)" style={{ margin: '0 auto 12px', display: 'block' }} />
          <p>No news yet. Advance a week to see the industry in action.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {feed.map((item, i) => {
          const cfg = typeConfig[item.type] || typeConfig.news;
          return (
            <div
              key={item.id || i}
              style={{
                padding: '14px 0',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              {/* Timeline dot */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: `${cfg.color}15`,
                  border: `1px solid ${cfg.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {cfg.icon}
                </div>
                {i < feed.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 4 }} />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: cfg.color,
                  }}>
                    {cfg.label}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {timeAgo(item.week, game.week)}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>
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
