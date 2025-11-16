import React from 'react';
import './TableResponse.css';

export default function TableResponse({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const keys = Array.from(data.reduce((set, row) => {
    Object.keys(row).forEach(k => set.add(k));
    return set;
  }, new Set()));

  return (
    <div className="table-wrap">
      <table className="response-table">
        <thead>
          <tr>
            {keys.map(k => <th key={k}>{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {keys.map(k => <td key={k}>{row[k] ?? ''}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
