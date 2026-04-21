import React from 'react';
import { IconCheck, IconX, IconAlertTriangle, IconInfo } from './Icons';

const icons = {
  success: <IconCheck size={16} color="#2ecc71" />,
  danger: <IconX size={16} color="#e74c3c" />,
  warn: <IconAlertTriangle size={16} color="#f39c12" />,
  info: <IconInfo size={16} color="#c9a84c" />,
};

export default function Toasts({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {icons[t.type] || icons.info}
          <span style={{ fontSize: 14 }}>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
