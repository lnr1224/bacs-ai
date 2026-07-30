import React from 'react';

export default function BusinessFactCard({ title, facts, evidence, onConfirm }: any) {
  return (
    <div className="fact-card">
      <h4 className="fact-title">{title.toUpperCase()}</h4>
      {facts.length === 0 && <div className="empty">No facts collected</div>}
      <ul className="fact-list">
        {facts.map((f:any) => (
          <li key={f.id} className="fact-item">
            <div className="fact-key">{f.fieldKey}</div>
            <div className="fact-value">{JSON.stringify(f.value)}</div>
            <div className="fact-meta">Status: <strong>{f.status}</strong> — Priority: {f.priority || 'Supporting'}</div>
            {f.status === 'Imported' && (
              <div className="fact-actions">
                <button className="btn btn-primary" onClick={() => onConfirm(f.id)}>Confirm</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
