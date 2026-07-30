import React, { useEffect, useState } from 'react';
import { fetchBacsReport, fetchEvidenceByBusiness, confirmEvidence } from '../services/api';
import BusinessFactCard from '../components/BusinessFactCard';
import RecommendationCard from '../components/RecommendationCard';

export default function ExecutiveReport() {
  const [businessId, setBusinessId] = useState('biz_seed_1');
  const [report, setReport] = useState<any>(null);
  const [evidence, setEvidence] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, [businessId]);

  async function load() {
    setLoading(true);
    try {
      const r = await fetchBacsReport(businessId);
      setReport(r);
      const ev = await fetchEvidenceByBusiness(businessId);
      setEvidence(ev);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading…</div>;
  if (!report) return <div className="empty">No report available — try seed business id 'biz_seed_1'</div>;

  return (
    <div className="exec-report container">
      <section className="lead">
        <h2>Executive Diagnostic</h2>
        <p className="lead-sentence">{report.halted ? report.haltReason : `Based on ${report.evidenceSummary?.verified || 0} verified facts, BACS computed the following evidence strengths.`}</p>
      </section>

      <section className="facts-grid">
        <h3>Business Facts</h3>
        <div className="cards">
          {['customer','market','competition','financial','validation','operations','other'].map(groupKey => (
            <BusinessFactCard key={groupKey} title={groupKey} facts={report.groups?.[groupKey] || []} evidence={evidence} onConfirm={async (id)=>{ await confirmEvidence(id); await load(); }} />
          ))}
        </div>
      </section>

      <section className="bacs-variables">
        <h3>BACS Diagnostic</h3>
        <div className="vars">
          {report.variables?.map((v:any) => (
            <div className="var-card" key={v.variable}>
              <div className="var-title">{v.variable}</div>
              <div className="var-strength">{v.label} — {v.percent}%</div>
              <div className="var-reason">{v.reason}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="recommendations">
        <h3>Strategic Priorities</h3>
        {report.recommendations?.length ? (
          report.recommendations.map((r:any, idx:number) => <RecommendationCard key={idx} rec={r} evidence={evidence} />)
        ) : (
          <div>No recommendations — excellent evidence coverage.</div>
        )}
      </section>

      <section className="completion">
        <h3>Completion</h3>
        <div className="completion-bar">
          <div className="completion-fill" style={{ width: `${report.completionPercent}%` }} />
        </div>
        <div className="completion-text">{report.completionPercent}% complete</div>
      </section>
    </div>
  );
}
