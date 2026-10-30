import { FormEvent, useState } from 'react';
import { aiService } from '../../services/aiService';
import type { AiAnalysisResult, Recommendation, Lawyer } from '../../types';
import { TextAreaField, Button } from '../../components/forms/Fields';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { RecommendationCard } from '../../components/common/RecommendationCard';
import { lawyerService } from '../../services/lawyerService';
import { validateFile } from '../../utils/validators';
import { ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_SIZE_MB } from '../../utils/constants';

export function AiAssistancePage() {
  const [problem, setProblem] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiAnalysisResult | null>(null);
  const [recs, setRecs] = useState<{ lawyer: Lawyer; rec: Recommendation }[]>([]);
  const [recsLoading, setRecsLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setRecs([]);
    if (problem.trim().length < 20) {
      setError('Please describe the issue in at least 20 characters.');
      return;
    }
    if (file) {
      const fileError = validateFile(file, ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_SIZE_MB);
      if (fileError) {
        setError(fileError);
        return;
      }
    }
    setLoading(true);
    setResult(null);
    try {
      const analysis = await aiService.analyzeProblem(problem, file);
      setResult(analysis);

      // Fetch domain-specific lawyer recommendations
      setRecsLoading(true);
      try {
        const [recItems, lawyerItems] = await Promise.all([
          aiService.getRecommendations(analysis.probableLegalDomain),
          lawyerService.list(),
        ]);
        const paired = recItems
          .map((rec) => {
            const lawyer = lawyerItems.find((l) => l.id === rec.lawyerId);
            return lawyer ? { lawyer, rec } : null;
          })
          .filter((item): item is { lawyer: Lawyer; rec: Recommendation } => Boolean(item));
        setRecs(paired);
      } catch {
        // Recommendations are best-effort
      } finally {
        setRecsLoading(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Analysis failed. Please try again shortly.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <PageHeader
        title="AI legal assistance"
        subtitle="This page prepares a structured legal brief. It does not provide formal legal advice or replace a licensed lawyer."
      />
      <form className="card stack" onSubmit={onSubmit}>
        <TextAreaField
          label="Describe your legal problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Share facts, dates, agreements, and specific issues. Do not include unnecessary confidential personal identifiers."
        />
        <label className="field">
          <span>Upload a legal document (optional)</span>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        {error ? <div className="banner banner-error">{error}</div> : null}
        <Button type="submit" disabled={loading}>{loading ? 'Analysing…' : 'Submit for analysis'}</Button>
      </form>
      {loading ? <LoadingSpinner label="Analysing your legal case…" /> : null}
      {result ? (
        <article className="card stack">
          <h2>Structured result</h2>
          <p><strong>Probable legal domain:</strong> <span className="badge">{result.probableLegalDomain}</span></p>
          <div>
            <strong>Important information</strong>
            <ul>{result.importantInformation.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
          </div>
          <p><strong>Case summary:</strong> {result.caseSummary}</p>
          <div>
            <strong>Key points</strong>
            <ul>{result.keyPoints.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
          </div>
          <div className="banner" style={{ background: 'var(--color-surface, #f8fafc)', borderLeft: '4px solid var(--color-primary, #2563eb)' }}>
            <strong>Recommendation:</strong> {result.recommendation}
          </div>
          <p className="disclaimer" style={{ fontSize: '0.85rem', color: '#64748b' }}>{result.disclaimer}</p>
        </article>
      ) : null}
      {recsLoading ? <LoadingSpinner label="Finding matching lawyers for your domain…" /> : null}
      {recs.length > 0 ? (
        <div className="stack">
          <h2>Recommended lawyers for your case</h2>
          <p className="muted">Ranked by domain expertise, experience, and fee compatibility.</p>
          <div className="grid-2">
            {recs.map(({ lawyer, rec }) => (
              <RecommendationCard key={lawyer.id} lawyer={lawyer} rec={rec} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
