import { FormEvent, useState } from 'react';
import { aiService } from '../../services/aiService';
import type { AiAnalysisResult } from '../../types';
import { TextAreaField, Button } from '../../components/forms/Fields';
import { LoadingSpinner, PageHeader } from '../../components/common/Feedback';
import { validateFile } from '../../utils/validators';
import { ALLOWED_DOCUMENT_TYPES, MAX_DOCUMENT_SIZE_MB } from '../../utils/constants';

export function AiAssistancePage() {
  const [problem, setProblem] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiAnalysisResult | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <PageHeader
        title="AI legal assistance"
        subtitle="This page prepares a structured brief. It does not provide legal advice or replace a lawyer."
      />
      <div className="banner banner-warn">
        Demo mode: the result is a mock response from aiService.ts. Connect this service to Spring Boot later.
      </div>
      <form className="card stack" onSubmit={onSubmit}>
        <TextAreaField
          label="Describe your legal problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Share facts, dates, and what you hope to understand. Do not include unnecessary personal identifiers."
        />
        <label className="field">
          <span>Upload a legal document (optional)</span>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        {error ? <div className="banner">{error}</div> : null}
        <Button type="submit" disabled={loading}>{loading ? 'Analysing…' : 'Submit for analysis'}</Button>
      </form>
      {loading ? <LoadingSpinner label="Preparing a structured demo analysis…" /> : null}
      {result ? (
        <article className="card stack">
          <h2>Structured result</h2>
          <p><strong>Probable legal domain:</strong> {result.probableLegalDomain}</p>
          <div>
            <strong>Important information</strong>
            <ul>{result.importantInformation.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <p><strong>Case summary:</strong> {result.caseSummary}</p>
          <div>
            <strong>Key points</strong>
            <ul>{result.keyPoints.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <p><strong>Recommendation:</strong> {result.recommendation}</p>
          <p className="disclaimer">{result.disclaimer}</p>
        </article>
      ) : null}
    </div>
  );
}
