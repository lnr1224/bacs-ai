import React, { useEffect, useState } from 'react';
import { fetchQuestions, submitAnswer } from '../services/api';

export default function Interview() {
  const [stage] = useState('idea');
  const [questions, setQuestions] = useState<any[]>([]);
  const [businessId] = useState('biz_seed_1');

  useEffect(()=>{ load(); }, []);
  async function load(){
    const qs = await fetchQuestions(stage);
    setQuestions(qs);
  }

  async function handleSubmit(q:any, value:any, iDontKnow=false){
    const payload = {
      businessId,
      questionId: q.id,
      fieldKey: q.fieldKey,
      answer: value,
      answerType: iDontKnow ? 'i_dont_know' : 'value',
      meta: { requiredFor: q.requiredFor || [], priority: q.priority }
    };
    await submitAnswer(payload);
    // refresh questions/evidence state
    await load();
    alert('Answer recorded');
  }

  return (
    <div className="interview container">
      <h2>Guided Interview — Stage: Idea</h2>
      <p className="hint">Every question explains why it matters. Use "I don't know" when unsure.</p>
      <div className="questions">
        {questions.map(q=> (
          <div key={q.id} className="question-card">
            <div className="q-header">
              <div className="q-id">{q.id}</div>
              <div className="q-title">{q.meta?.plainEnglish || q.id}</div>
            </div>
            <div className="q-meta">
              <div><strong>Why we ask:</strong> {q.meta?.whyBacsAsks}</div>
              <div><strong>Definition:</strong> {q.meta?.definition}</div>
              <div><strong>Good example:</strong> {q.meta?.goodExample}</div>
            </div>
            <div className="q-input">
              {q.type === 'number' && (
                <input type="number" defaultValue="" placeholder="Enter number" id={`in-${q.id}`} />
              )}
              {q.type === 'guided_text' && (
                <input type="text" placeholder="Short guided answer" id={`in-${q.id}`} />
              )}
              {q.type === 'checkboxes' && q.options && (
                <div>
                  {q.options.map((opt:string, idx:number)=> (
                    <label key={idx}><input type="checkbox" value={opt} id={`in-${q.id}-${idx}`} /> {opt}</label>
                  ))}
                </div>
              )}
            </div>
            <div className="q-actions">
              <button className="btn" onClick={async ()=>{
                const el = document.getElementById(`in-${q.id}`) as HTMLInputElement | null;
                const val = el ? el.value : null;
                await handleSubmit(q, val, false);
              }}>Save</button>
              <button className="btn btn-ghost" onClick={async ()=>{ await handleSubmit(q, null, true); }}>I don't know</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
