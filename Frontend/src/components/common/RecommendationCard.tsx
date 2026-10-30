import type { Lawyer, Recommendation } from '../../types';
import { formatFee } from '../../utils/formatters';
import { RatingStars } from './RatingStars';
import { StatusBadge } from './StatusBadge';
import { Link } from 'react-router-dom';

export function RecommendationCard({ lawyer, rec }: { lawyer: Lawyer; rec: Recommendation }) {
  return (
    <article className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>{lawyer.fullName}</h3>
        <span className="badge">{rec.matchPercentage}% match</span>
      </div>
      <p className="muted">{lawyer.specialization} · {lawyer.location} · {formatFee(lawyer.consultationFee)}</p>
      <RatingStars value={rec.rating} />
      <div className="stack">
        <Metric label="Legal domain relevance" value={rec.legalDomainRelevance} />
        <Metric label="Relevant experience" value={rec.relevantExperienceScore} />
        <Metric label="Location compatibility" value={rec.locationCompatibility} />
        <Metric label="Fee compatibility" value={rec.feeCompatibility} />
      </div>
      <p><StatusBadge status={rec.availability} /></p>
      <p>{rec.explanation}</p>
      <Link className="btn btn-primary btn-sm" to={`/app/lawyers/${lawyer.id}`}>View lawyer</Link>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <small>{label}</small>
        <small>{value}%</small>
      </div>
      <div className="progress"><span style={{ width: `${value}%` }} /></div>
    </div>
  );
}
