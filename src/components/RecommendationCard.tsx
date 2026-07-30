import React from 'react';

export default function RecommendationCard({ rec, evidence }: any) {
  const used = (rec.evidenceUsed || []).map((id:string) => evidence.find((e:any)=>e.id===id)).filter(Boolean);
  return (
    <div className="rec-card">
      <h4>{rec.title}</h4>
      <p className="rec-why"><strong>Why:</strong> {rec.why}</p>
      <p className="rec-next"><strong>Next action:</strong> {rec.nextAction}</p>
      <p className="rec-impact"><strong>Expected improvement:</strong> {rec.expectedImprovement}</p>
      <div className="rec-evidence">
        <strong>Evidence used:</strong>
        <ul>
          {used.length ? used.map((u:any)=> <li key={u.id}>{u.fieldKey} — {u.status}</li>) : <li>None</li>}
        </ul>
      </div>
    </div>
  );
}
