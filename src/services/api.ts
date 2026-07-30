export async function fetchQuestions(stage='idea'){
  const res = await fetch(`/api/interview/questions?stage=${encodeURIComponent(stage)}`);
  if (!res.ok) throw new Error('failed');
  return res.json();
}

export async function submitAnswer(payload:any){
  const res = await fetch(`/api/interview/answer`, { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  if (!res.ok) throw new Error('failed');
  return res.json();
}

export async function fetchEvidenceByBusiness(businessId='biz_seed_1'){
  const res = await fetch(`/api/evidence/business/${encodeURIComponent(businessId)}`);
  if (!res.ok) throw new Error('failed');
  return res.json();
}

export async function fetchBacsReport(businessId='biz_seed_1'){
  const res = await fetch(`/api/bacs/report/${encodeURIComponent(businessId)}`);
  if (!res.ok) throw new Error('failed');
  return res.json();
}

export async function confirmEvidence(id:string){
  const res = await fetch(`/api/evidence/${encodeURIComponent(id)}/confirm`, { method: 'POST' });
  if (!res.ok) throw new Error('failed');
  return res.json();
}
