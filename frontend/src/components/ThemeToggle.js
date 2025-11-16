import React from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ dark, setDark }) {
  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={dark}
        onChange={e => setDark(e.target.checked)}
      />
      <span className="toggle-label">Dark</span>
    </label>
  );
}
